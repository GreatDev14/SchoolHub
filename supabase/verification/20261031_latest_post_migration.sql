-- School Hub post-migration verification
-- READ-ONLY. Run only in a disposable development project.
-- Structural checks do not prove runtime authorization.

-- 17 required School Hub tables
with required(table_name) as (values
 ('schools'),('profiles'),('school_roles'),('platform_admins'),('school_registrations'),
 ('classes'),('class_memberships'),('assignments'),('assignment_submissions'),
 ('announcements'),('resources'),('timetable_entries'),('calendar_events'),
 ('discussion_topics'),('discussion_replies'),('content_reports'),('notifications'))
select case when count(*)=0 then 'PASS' else 'FAIL' end as result,
       'required_public_tables' as check_name,
       coalesce(string_agg(table_name,'; ' order by table_name),'all required tables exist') as details
from required r where to_regclass('public.'||quote_ident(r.table_name)) is null;

-- RLS: missing tables are failures, not omitted passes
with required(table_name) as (values
 ('schools'),('profiles'),('school_roles'),('platform_admins'),('school_registrations'),
 ('classes'),('class_memberships'),('assignments'),('assignment_submissions'),
 ('announcements'),('resources'),('timetable_entries'),('calendar_events'),
 ('discussion_topics'),('discussion_replies'),('content_reports'),('notifications')),
checks as (
 select r.table_name,
        to_regclass('public.'||quote_ident(r.table_name)) as oid,
        exists(select 1 from pg_class c where c.oid=to_regclass('public.'||quote_ident(r.table_name)) and c.relkind in ('r','p')) as is_table,
        exists(select 1 from pg_class c where c.oid=to_regclass('public.'||quote_ident(r.table_name)) and c.relkind in ('r','p') and c.relrowsecurity) as rls
 from required r
)
select case when bool_and(oid is not null and is_table and rls) then 'PASS' else 'FAIL' end as result,
       'required_tables_rls_enabled' as check_name,
       coalesce(string_agg(case when oid is null then table_name||'=MISSING'
                                when not is_table then table_name||'=NOT_A_TABLE'
                                when not rls then table_name||'=RLS_DISABLED'
                                else null end,'; ' order by table_name),'all required tables exist and have RLS enabled') as details
from checks;

-- Calendar publication columns and backfill
select case when to_regclass('public.calendar_events') is null then 'FAIL'
            when exists(select 1 from information_schema.columns where table_schema='public' and table_name='calendar_events' and column_name='is_published')
             and exists(select 1 from information_schema.columns where table_schema='public' and table_name='calendar_events' and column_name='published_at')
            then 'PASS' else 'FAIL' end as result,
       'calendar_publication_columns' as check_name,
       'public.calendar_events must contain is_published and published_at' as details;

do $$
declare v_count bigint;
begin
  if to_regclass('public.calendar_events') is null then
    raise notice 'FAIL | calendar_published_timestamp_backfill | public.calendar_events is missing';
  elsif not exists(select 1 from information_schema.columns where table_schema='public' and table_name='calendar_events' and column_name='is_published')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='calendar_events' and column_name='published_at') then
    raise notice 'FAIL | calendar_published_timestamp_backfill | publication column is missing';
  else
    execute 'select count(*) from public.calendar_events where is_published=true and published_at is null' into v_count;
    raise notice '% | calendar_published_timestamp_backfill | published events with null timestamp=%',
                 case when v_count=0 then 'PASS' else 'FAIL' end,v_count;
  end if;
end $$;

-- Every applicable calendar SELECT/ALL policy
select case when to_regclass('public.calendar_events') is null then 'FAIL' else 'MANUAL REVIEW REQUIRED' end as result,
       'calendar_select_all_policy_inventory' as check_name,
       coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' order by p.policyname),
                case when to_regclass('public.calendar_events') is null then 'public.calendar_events is missing' else 'no SELECT/ALL policy found' end) as details
from pg_policies p
where p.schemaname='public' and p.tablename='calendar_events' and p.permissive='PERMISSIVE' and p.cmd in ('SELECT','ALL');

select case when to_regclass('public.calendar_events') is null then 'FAIL'
            when exists(select 1 from pg_policies p where p.schemaname='public' and p.tablename='calendar_events'
                        and p.permissive='PERMISSIVE' and p.cmd in ('SELECT','ALL')
                        and (p.qual is null or btrim(p.qual)='' or lower(btrim(p.qual))='true'))
            then 'FAIL' else 'PASS' end as result,
       'calendar_no_unqualified_permissive_policy' as check_name,
       'NULL/TRUE permissive SELECT or ALL is prohibited; complex expressions still require authenticated Student/Admin testing.' as details;

select 'MANUAL REVIEW REQUIRED' as result,
       'calendar_policy_security_requires_runtime_testing' as check_name,
       'Policy expressions containing auth.uid(), role helpers, or membership checks cannot be certified secure by text review alone.' as details;

-- School identity
DO $$
declare v_code_count bigint:=0; v_exact_count bigint:=0;
begin
  if to_regclass('public.schools') is null then
    raise notice 'FAIL | ius_school_identity | public.schools is missing';
    return;
  end if;
  execute 'select count(*) from public.schools where code=''SHS-IUS-2026''' into v_code_count;
  execute 'select count(*) from public.schools where code=''SHS-IUS-2026'' and name=''International Unity School''' into v_exact_count;
  raise notice '% | ius_school_identity | code_records=%; exact_name_code_records=%',
               case when v_code_count=1 and v_exact_count=1 then 'PASS' else 'FAIL' end,
               v_code_count,v_exact_count;
  raise notice '% | ius_duplicate_school_code | duplicate_code_records=%',
               case when v_code_count<=1 then 'PASS' else 'FAIL' end,
               greatest(v_code_count-1,0);
end $$;

-- IUS class verification. Values are copied from the original migration seed loop.
DO $$
declare
  v_missing bigint:=0; v_wrong_code bigint:=0; v_wrong_level bigint:=0;
  v_unexpected bigint:=0; v_duplicate_identity bigint:=0; v_actual bigint:=0;
  v_null_codes bigint:=0; v_level_exists boolean;
begin
  if to_regclass('public.schools') is null then
    raise notice 'FAIL | ius_classes | public.schools is missing'; return;
  end if;
  if to_regclass('public.classes') is null then
    raise notice 'FAIL | ius_classes | public.classes is missing'; return;
  end if;

  if not exists(select 1 from information_schema.columns where table_schema='public' and table_name='schools' and column_name='id')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='schools' and column_name='code') then
    raise notice 'FAIL | ius_school_columns | public.schools.id or public.schools.code is missing'; return;
  end if;

  if not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='school_id')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='name')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='section')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='class_code')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='level') then
    raise notice 'FAIL | ius_required_class_columns | one or more of public.classes.school_id, name, section, class_code or level is missing';
    return;
  end if;
  v_level_exists:=true;

  execute $q$
  with expected(name,section,level,class_code) as (values
    ('Primary 1',null::text,'Primary','IUS-P1-2026'),('Primary 2',null,'Primary','IUS-P2-2026'),
    ('Primary 3',null,'Primary','IUS-P3-2026'),('Primary 4',null,'Primary','IUS-P4-2026'),
    ('Primary 5',null,'Primary','IUS-P5-2026'),('Primary 6',null,'Primary','IUS-P6-2026'),
    ('JSS 1',null,'Secondary','IUS-JSS1-2026'),('JSS 2',null,'Secondary','IUS-JSS2-2026'),
    ('JSS 3',null,'Secondary','IUS-JSS3-2026'),('SS 1','Dynamo','Secondary','IUS-SS1-DYN-2026'),
    ('SS 1','Horizon','Secondary','IUS-SS1-HOR-2026'),('SS 2',null,'Secondary','IUS-SS2-2026'),
    ('SS 3',null,'Secondary','IUS-SS3-2026'))
  select count(*) from expected e where not exists (
    select 1 from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026' and lower(c.name)=lower(e.name)
      and coalesce(lower(c.section),'')=coalesce(lower(e.section),'')
  )$q$ into v_missing;

  execute $q$
  with expected(name,section,class_code) as (values
    ('Primary 1',null::text,'IUS-P1-2026'),('Primary 2',null,'IUS-P2-2026'),
    ('Primary 3',null,'IUS-P3-2026'),('Primary 4',null,'IUS-P4-2026'),
    ('Primary 5',null,'IUS-P5-2026'),('Primary 6',null,'IUS-P6-2026'),
    ('JSS 1',null,'IUS-JSS1-2026'),('JSS 2',null,'IUS-JSS2-2026'),('JSS 3',null,'IUS-JSS3-2026'),
    ('SS 1','Dynamo','IUS-SS1-DYN-2026'),('SS 1','Horizon','IUS-SS1-HOR-2026'),
    ('SS 2',null,'IUS-SS2-2026'),('SS 3',null,'IUS-SS3-2026'))
  select count(*) from public.classes c join public.schools s on s.id=c.school_id
  join expected e on lower(c.name)=lower(e.name) and coalesce(lower(c.section),'')=coalesce(lower(e.section),'')
  where s.code='SHS-IUS-2026' and c.class_code is distinct from e.class_code$q$ into v_wrong_code;

  if v_level_exists then
    execute $q$
    with expected(name,section,level) as (values
      ('Primary 1',null::text,'Primary'),('Primary 2',null,'Primary'),('Primary 3',null,'Primary'),
      ('Primary 4',null,'Primary'),('Primary 5',null,'Primary'),('Primary 6',null,'Primary'),
      ('JSS 1',null,'Secondary'),('JSS 2',null,'Secondary'),('JSS 3',null,'Secondary'),
      ('SS 1','Dynamo','Secondary'),('SS 1','Horizon','Secondary'),('SS 2',null,'Secondary'),('SS 3',null,'Secondary'))
    select count(*) from public.classes c join public.schools s on s.id=c.school_id
    join expected e on lower(c.name)=lower(e.name) and coalesce(lower(c.section),'')=coalesce(lower(e.section),'')
    where s.code='SHS-IUS-2026' and c.level is distinct from e.level$q$ into v_wrong_level;
  else
    v_wrong_level:=1;
  end if;

  execute $q$
  with expected(name,section) as (values
    ('Primary 1',null::text),('Primary 2',null),('Primary 3',null),('Primary 4',null),('Primary 5',null),('Primary 6',null),
    ('JSS 1',null),('JSS 2',null),('JSS 3',null),('SS 1','Dynamo'),('SS 1','Horizon'),('SS 2',null),('SS 3',null))
  select count(*) from public.classes c join public.schools s on s.id=c.school_id
  where s.code='SHS-IUS-2026' and not exists (
    select 1 from expected e where lower(c.name)=lower(e.name)
      and coalesce(lower(c.section),'')=coalesce(lower(e.section),'')
  )$q$ into v_unexpected;

  execute $q$select count(*) from (
    select lower(c.name),lower(coalesce(c.section,'')),count(*)
    from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026'
    group by 1,2 having count(*)>1
  ) q$q$ into v_duplicate_identity;

  execute $q$select count(*) from public.classes c join public.schools s on s.id=c.school_id
              where s.code='SHS-IUS-2026'$q$ into v_actual;
  execute $q$select count(*) from public.classes c join public.schools s on s.id=c.school_id
              where s.code='SHS-IUS-2026' and c.class_code is null$q$ into v_null_codes;

  raise notice '% | ius_missing_records | missing=%',case when v_missing=0 then 'PASS' else 'FAIL' end,v_missing;
  raise notice '% | ius_wrong_class_codes | wrong=%',case when v_wrong_code=0 then 'PASS' else 'FAIL' end,v_wrong_code;
  raise notice '% | ius_wrong_levels | wrong=%',case when v_level_exists and v_wrong_level=0 then 'PASS' else 'FAIL' end,v_wrong_level;
  raise notice '% | ius_unexpected_records | unexpected=%',case when v_unexpected=0 then 'PASS' else 'FAIL' end,v_unexpected;
  raise notice '% | ius_duplicate_identity_records | duplicate_groups=%',case when v_duplicate_identity=0 then 'PASS' else 'FAIL' end,v_duplicate_identity;
  raise notice '% | ius_null_class_codes | null_codes=%',case when v_null_codes=0 then 'PASS' else 'FAIL' end,v_null_codes;
  raise notice '% | ius_final_exact_verification | actual=%; missing=%; wrong_codes=%; wrong_levels=%; unexpected=%; duplicate_identities=%; null_codes=%',
               case when v_actual=13 and v_missing=0 and v_wrong_code=0 and v_level_exists and v_wrong_level=0
                              and v_unexpected=0 and v_duplicate_identity=0 and v_null_codes=0
                         then 'PASS' else 'FAIL' end,
               v_actual,v_missing,v_wrong_code,v_wrong_level,v_unexpected,v_duplicate_identity,v_null_codes;
end $$;

-- Report IUS class records individually; no automatic data changes
DO $$
declare r record;
begin
  if to_regclass('public.schools') is null or to_regclass('public.classes') is null then
    raise notice 'FAIL | ius_individual_records | schools or classes table is missing';
  elsif not exists(select 1 from information_schema.columns where table_schema='public' and table_name='schools' and column_name='id')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='schools' and column_name='code') then
    raise notice 'FAIL | ius_individual_records | public.schools.id or code is missing';
  elsif not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='school_id')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='name')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='section')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='class_code')
     or not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='level') then
    raise notice 'FAIL | ius_individual_records | a required public.classes column is missing';
  else
    for r in execute $q$select c.name,c.section,c.level,c.class_code from public.classes c join public.schools s on s.id=c.school_id where s.code='SHS-IUS-2026' order by c.name,c.section,c.class_code$q$ loop
      raise notice 'MANUAL REVIEW REQUIRED | ius_individual_class | name=%; section=%; level=%; code=%',r.name,r.section,r.level,r.class_code;
    end loop;
  end if;
end $$;

-- Cross-school class-code collisions
DO $$
declare v_count bigint;
begin
  if to_regclass('public.classes') is null then raise notice 'FAIL | class_code_collisions | public.classes is missing';
  elsif not exists(select 1 from information_schema.columns where table_schema='public' and table_name='classes' and column_name='class_code') then
    raise notice 'FAIL | class_code_collisions | public.classes.class_code is missing';
  else
    execute 'select count(*) from (select class_code from public.classes where class_code is not null group by class_code having count(*)>1) q' into v_count;
    raise notice '% | class_code_collisions | duplicate_code_values=%',case when v_count=0 then 'PASS' else 'FAIL' end,v_count;
  end if;
end $$;

-- Notification privilege check. Missing-object handling is explicit.
DO $$
declare s boolean:=false;i boolean:=false;d boolean:=false;tu boolean:=false;ru boolean:=false;yu boolean:=false;
begin
  if to_regclass('public.notifications') is null then
    raise notice 'FAIL | notification_privileges | public.notifications is missing';
  else
    s:=has_table_privilege('authenticated','public.notifications','SELECT');
    i:=has_table_privilege('authenticated','public.notifications','INSERT');
    d:=has_table_privilege('authenticated','public.notifications','DELETE');
    tu:=has_table_privilege('authenticated','public.notifications','UPDATE');
    if exists(select 1 from information_schema.columns where table_schema='public' and table_name='notifications' and column_name='is_read') then
      ru:=has_column_privilege('authenticated','public.notifications','is_read','UPDATE');
    end if;
    if exists(select 1 from information_schema.columns where table_schema='public' and table_name='notifications' and column_name='user_id') then
      yu:=has_column_privilege('authenticated','public.notifications','user_id','UPDATE');
    end if;
    raise notice '% | notification_privileges | SELECT=%; INSERT=%; DELETE=%; table_UPDATE=%; UPDATE(is_read)=%; UPDATE(user_id)=%',
      case when s and i and d and not tu and ru and not yu then 'PASS' else 'FAIL' end,s,i,d,tu,ru,yu;
  end if;
end $$;

-- Full policy inventory for notification, assignment, calendar, and submissions
select 'MANUAL REVIEW REQUIRED' as result,'full_important_policy_inventory' as check_name,
       coalesce(string_agg(p.schemaname||'.'||p.tablename||'; policy='||p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' order by p.tablename,p.policyname),'no School Hub policies found') as details
from pg_policies p where p.schemaname='public'
and p.tablename in ('schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships','assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events','discussion_topics','discussion_replies','content_reports','notifications');

-- Notification/assignment/calendar expression inventories
select 'MANUAL REVIEW REQUIRED' as result,'notification_policy_expressions' as check_name,
       coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' order by p.policyname),'no notification policies found') as details
from pg_policies p where p.schemaname='public' and p.tablename='notifications';

select 'MANUAL REVIEW REQUIRED' as result,'assignment_policy_expressions' as check_name,
       coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' order by p.policyname),'no assignment policies found') as details
from pg_policies p where p.schemaname='public' and p.tablename='assignments';

select 'MANUAL REVIEW REQUIRED' as result,'assignment_submission_policy_expressions' as check_name,
       coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' order by p.policyname),'no submission policies found') as details
from pg_policies p where p.schemaname='public' and p.tablename='assignment_submissions';

select case when to_regclass('public.assignments') is null then 'FAIL'
            when not exists(select 1 from pg_policies p where p.schemaname='public' and p.tablename='assignments'
                            and p.permissive='PERMISSIVE' and p.cmd in ('SELECT','ALL')
                            and (p.qual is null or btrim(p.qual)='' or lower(btrim(p.qual))='true'))
            then 'PASS' else 'FAIL' end as result,'assignment_no_unqualified_select_all' as check_name,
       'Complex expressions are not certified safe by this structural check.' as details;

-- Activation function and trigger inspection
select case when exists(select 1 from pg_proc pr join pg_namespace n on n.oid=pr.pronamespace where n.nspname='public' and pr.proname='guard_school_activation')
              and exists(select 1 from pg_proc pr join pg_namespace n on n.oid=pr.pronamespace where n.nspname='public' and pr.proname='set_school_status')
            then 'MANUAL REVIEW REQUIRED' else 'FAIL' end as result,'school_activation_function_presence' as check_name,
       'Both function definitions require source review; presence proves neither authorization nor missing-ID behavior.' as details;

select 'MANUAL REVIEW REQUIRED' as result,'guard_school_activation_source' as check_name,
       coalesce((select pg_get_functiondef(pr.oid) from pg_proc pr join pg_namespace n on n.oid=pr.pronamespace where n.nspname='public' and pr.proname='guard_school_activation' limit 1),'FUNCTION MISSING') as details;
select 'MANUAL REVIEW REQUIRED' as result,'set_school_status_source' as check_name,
       coalesce((select pg_get_functiondef(pr.oid) from pg_proc pr join pg_namespace n on n.oid=pr.pronamespace where n.nspname='public' and pr.proname='set_school_status' limit 1),'FUNCTION MISSING') as details;

with trigger_info as (
 select t.tgname,t.tgenabled,p.proname
 from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_proc p on p.oid=t.tgfoid
 where c.oid=to_regclass('public.schools') and not t.tgisinternal and p.proname='guard_school_activation'
)
select case when count(*)=0 then 'FAIL'
            when count(*)=1 and bool_and(tgenabled='O') then 'PASS'
            when count(*)=1 and bool_and(tgenabled='A') then 'MANUAL REVIEW REQUIRED'
            when count(*)=1 and bool_and(tgenabled='D') then 'FAIL'
            when count(*)=1 and bool_and(tgenabled='R') then 'FAIL'
            else 'FAIL' end as result,'school_activation_trigger_status' as check_name,
       coalesce(string_agg(tgname||'; '||case tgenabled
         when 'O' then 'ORIGIN (normally enabled)'
         when 'A' then 'ALWAYS (enabled in normal and replica contexts)'
         when 'D' then 'DISABLED (not firing)'
         when 'R' then 'REPLICA_ONLY (not normally enabled for application operations)'
         else 'UNKNOWN' end,'; '),'trigger missing') as details
from trigger_info;

-- Expected policy names from the actual migration
with expected(table_name,policy_name) as (values
 ('schools','schools_select'),('schools','schools_super_admin_insert'),('schools','schools_super_admin_update'),('schools','schools_super_admin_delete'),
 ('platform_admins','platform_admins_select'),('platform_admins','platform_admins_manage'),
 ('school_registrations','school_registrations_insert'),('school_registrations','school_registrations_select'),('school_registrations','school_registrations_update'),
 ('profiles','profiles_select'),('profiles','profiles_insert_self'),('profiles','profiles_update_own_or_admin'),('profiles','profiles_delete_admin'),
 ('school_roles','roles_select'),('school_roles','roles_admin_insert'),('school_roles','roles_admin_update'),('school_roles','roles_admin_delete'),
 ('classes','classes_select'),('classes','classes_admin_insert'),('classes','classes_admin_update'),('classes','classes_admin_delete'),
 ('class_memberships','memberships_select'),('class_memberships','memberships_admin_insert'),('class_memberships','memberships_admin_update'),('class_memberships','memberships_admin_delete'),
 ('assignments','assignments_select'),('assignments','assignments_staff_insert'),('assignments','assignments_staff_update'),('assignments','assignments_staff_delete'),
 ('assignment_submissions','submissions_select'),('assignment_submissions','submissions_student_insert'),('assignment_submissions','submissions_student_update'),('assignment_submissions','submissions_staff_update'),('assignment_submissions','submissions_student_delete'),
 ('announcements','announcements_select'),('announcements','announcements_staff_insert'),('announcements','announcements_staff_update'),('announcements','announcements_staff_delete'),
 ('resources','resources_select'),('resources','resources_staff_insert'),('resources','resources_staff_update'),('resources','resources_staff_delete'),
 ('timetable_entries','timetable_select'),('timetable_entries','timetable_admin_insert'),('timetable_entries','timetable_admin_update'),('timetable_entries','timetable_admin_delete'),
 ('calendar_events','calendar_select'),('calendar_events','calendar_staff_insert'),('calendar_events','calendar_staff_update'),('calendar_events','calendar_staff_delete'),
 ('discussion_topics','topics_select'),('discussion_topics','topics_insert'),('discussion_topics','topics_update'),('discussion_topics','topics_delete'),
 ('discussion_replies','replies_select'),('discussion_replies','replies_insert'),('discussion_replies','replies_update'),('discussion_replies','replies_delete'),
 ('content_reports','reports_select'),('content_reports','reports_insert'),('content_reports','reports_admin_update'),('content_reports','reports_admin_delete'),
 ('notifications','notifications_select'),('notifications','notifications_update_own'),('notifications','notifications_delete_own'))
select case when count(*)=0 then 'PASS' else 'FAIL' end as result,'expected_policy_names' as check_name,
       coalesce(string_agg(e.table_name||'.'||e.policy_name,'; ' order by e.table_name,e.policy_name),'all expected policy names exist') as details
from expected e where not exists(select 1 from pg_policies p where p.schemaname='public' and p.tablename=e.table_name and p.policyname=e.policy_name);

-- Unexpected policies restricted to exactly the 17 School Hub tables
select 'MANUAL REVIEW REQUIRED' as result,'unexpected_school_hub_legacy_policies' as check_name,
       coalesce(string_agg(p.tablename||'.'||p.policyname||'; cmd='||p.cmd||'; roles='||array_to_string(p.roles,',')||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL'),' | ' order by p.tablename,p.policyname),'no unexpected policy names found on the 17 School Hub tables') as details
from pg_policies p where p.schemaname='public'
and p.tablename in ('schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships','assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events','discussion_topics','discussion_replies','content_reports','notifications')
and (p.tablename,p.policyname) not in (
 ('schools','schools_select'),('schools','schools_super_admin_insert'),('schools','schools_super_admin_update'),('schools','schools_super_admin_delete'),('platform_admins','platform_admins_select'),('platform_admins','platform_admins_manage'),
 ('school_registrations','school_registrations_insert'),('school_registrations','school_registrations_select'),('school_registrations','school_registrations_update'),('profiles','profiles_select'),('profiles','profiles_insert_self'),('profiles','profiles_update_own_or_admin'),('profiles','profiles_delete_admin'),
 ('school_roles','roles_select'),('school_roles','roles_admin_insert'),('school_roles','roles_admin_update'),('school_roles','roles_admin_delete'),('classes','classes_select'),('classes','classes_admin_insert'),('classes','classes_admin_update'),('classes','classes_admin_delete'),
 ('class_memberships','memberships_select'),('class_memberships','memberships_admin_insert'),('class_memberships','memberships_admin_update'),('class_memberships','memberships_admin_delete'),('assignments','assignments_select'),('assignments','assignments_staff_insert'),('assignments','assignments_staff_update'),('assignments','assignments_staff_delete'),
 ('assignment_submissions','submissions_select'),('assignment_submissions','submissions_student_insert'),('assignment_submissions','submissions_student_update'),('assignment_submissions','submissions_staff_update'),('assignment_submissions','submissions_student_delete'),
 ('announcements','announcements_select'),('announcements','announcements_staff_insert'),('announcements','announcements_staff_update'),('announcements','announcements_staff_delete'),('resources','resources_select'),('resources','resources_staff_insert'),('resources','resources_staff_update'),('resources','resources_staff_delete'),
 ('timetable_entries','timetable_select'),('timetable_entries','timetable_admin_insert'),('timetable_entries','timetable_admin_update'),('timetable_entries','timetable_admin_delete'),('calendar_events','calendar_select'),('calendar_events','calendar_staff_insert'),('calendar_events','calendar_staff_update'),('calendar_events','calendar_staff_delete'),
 ('discussion_topics','topics_select'),('discussion_topics','topics_insert'),('discussion_topics','topics_update'),('discussion_topics','topics_delete'),('discussion_replies','replies_select'),('discussion_replies','replies_insert'),('discussion_replies','replies_update'),('discussion_replies','replies_delete'),
 ('content_reports','reports_select'),('content_reports','reports_insert'),('content_reports','reports_admin_update'),('content_reports','reports_admin_delete'),('notifications','notifications_select'),('notifications','notifications_update_own'),('notifications','notifications_delete_own'));
