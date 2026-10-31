-- School Hub read-only security verification
-- Run only after the migration has been deployed to a staging database.
-- This script does not execute or modify application data.

do $$
declare
  v_table text;
  v_policy text;
  v_missing integer;
begin
  foreach v_table in array array[
    'schools','profiles','school_roles','platform_admins','school_registrations','classes',
    'class_memberships','assignments','assignment_submissions','announcements','resources',
    'timetable_entries','calendar_events','discussion_topics','discussion_replies',
    'content_reports','notifications'
  ] loop
    if not exists (
      select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname=v_table and c.relrowsecurity and c.relkind='r'
    ) then raise exception 'FAIL: RLS is not enabled on public.%', v_table; end if;
  end loop;

  foreach v_policy in array array[
    'schools_select','platform_admins_select','school_registrations_select','profiles_select',
    'roles_select','classes_select','memberships_select','assignments_select','submissions_select',
    'announcements_select','resources_select','timetable_select','calendar_select','topics_select',
    'replies_select','reports_select','notifications_select'
  ] loop
    select count(*) into v_missing from pg_policies
    where schemaname='public' and policyname=v_policy;
    if v_missing=0 then raise exception 'FAIL: expected policy % is missing', v_policy; end if;
  end loop;

  if exists (
    select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public'
      and p.proname in (
        'approve_school_registration','reject_school_registration','assign_school_admin','set_school_status',
        'platform_school_statistics','create_managed_class','update_managed_class','regenerate_class_code',
        'set_managed_class_status','assign_managed_class_teacher'
      )
      and has_function_privilege('PUBLIC',p.oid,'EXECUTE')
  ) then raise exception 'FAIL: a privileged function is executable by PUBLIC'; end if;

  if exists (
    select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public'
      and p.proname in (
        'approve_school_registration','reject_school_registration','assign_school_admin','set_school_status',
        'platform_school_statistics','create_managed_class','update_managed_class','regenerate_class_code',
        'set_managed_class_status','assign_managed_class_teacher'
      )
      and has_function_privilege('anon',p.oid,'EXECUTE')
  ) then raise exception 'FAIL: a privileged function is executable by anon'; end if;

  if exists (
    select 1 from public.schools
    where lower(name)=lower('International Unity School') and code='SHS-IUS-2026'
  ) then null; else raise exception 'FAIL: International Unity School or SHS-IUS-2026 is missing'; end if;

  if (select count(*) from public.schools where code='SHS-IUS-2026') <> 1
  then raise exception 'FAIL: duplicate or missing SHS-IUS-2026 school code'; end if;

  if exists (
    select 1 from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026' and c.class_code in ('IUS-SS1-DYN-2026','IUS-SS1-HOR-2026')
    having count(*) filter (where c.class_code='IUS-SS1-DYN-2026') <> 1
       or count(*) filter (where c.class_code='IUS-SS1-HOR-2026') <> 1
  ) then raise exception 'FAIL: required IUS SS1 class codes are missing or duplicated'; end if;

  if exists (
    select 1 from public.school_registrations
    where status='pending'
    group by lower(school_name),lower(official_email),requested_by
    having count(*)>1
  ) then raise exception 'FAIL: duplicate pending school registrations exist'; end if;

  if exists (
    select 1 from public.classes
    group by school_id,lower(name),coalesce(lower(section),'') having count(*)>1
  ) then raise exception 'FAIL: duplicate classes exist for a school/name/section'; end if;

  if exists (
    select 1 from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace
    where n.nspname='public' and not t.tgisinternal
      and c.relname='profiles' and t.tgname='profiles_guard_changes'
  ) then null; else raise exception 'FAIL: profile protection trigger is missing'; end if;

  raise notice 'PASS: School Hub migration security and compatibility checks completed';
end $$;

-- Direct privilege audit. Any WRITE privilege granted to anon/public is a fail; review authenticated rows against least privilege.
select grantee, table_schema, table_name, privilege_type, is_grantable
from information_schema.role_table_grants
where table_schema='public'
  and grantee in ('anon','authenticated','PUBLIC')
order by table_name,grantee,privilege_type;

-- Function privilege audit.
select p.proname, pg_get_function_identity_arguments(p.oid) as arguments,
       has_function_privilege('PUBLIC',p.oid,'EXECUTE') as public_exec,
       has_function_privilege('anon',p.oid,'EXECUTE') as anon_exec,
       has_function_privilege('authenticated',p.oid,'EXECUTE') as authenticated_exec
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
order by p.proname,p.oid;

-- Trigger audit.
select n.nspname as schema_name,c.relname as table_name,t.tgname
from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and not t.tgisinternal
order by c.relname,t.tgname;
