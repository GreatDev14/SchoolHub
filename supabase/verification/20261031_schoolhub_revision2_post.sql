-- School Hub Revision 2 post-migration verification.
-- Run only in staging before approval of any real users or schools.

do $$
declare v_table text; begin
foreach v_table in array array[
 'schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships',
 'assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events',
 'discussion_topics','discussion_replies','content_reports','notifications'] loop
 if not exists (
   select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
   where n.nspname='public' and c.relname=v_table and c.relrowsecurity and c.relkind='r'
 ) then raise exception 'RLS missing on %',v_table; end if;
end loop;
end $$;

-- Preserve and verify International Unity School without changing existing lifecycle.
select count(*) as ius_count from public.schools where code='SHS-IUS-2026';
select name,status,lifecycle_status from public.schools where code='SHS-IUS-2026';
select count(*) as ius_class_count,
       count(*) filter (where class_code='IUS-SS1-DYN-2026') as ss1_dynamo,
       count(*) filter (where class_code='IUS-SS1-HOR-2026') as ss1_horizon
from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026';

do $$
declare v_expected integer; begin
  select count(*) into v_expected
  from public.classes c join public.schools s on s.id=c.school_id
  where s.code='SHS-IUS-2026'
    and (
      (c.name='Primary 1' and c.section is null) or
      (c.name='Primary 2' and c.section is null) or
      (c.name='Primary 3' and c.section is null) or
      (c.name='Primary 4' and c.section is null) or
      (c.name='Primary 5' and c.section is null) or
      (c.name='Primary 6' and c.section is null) or
      (c.name='JSS 1' and c.section is null) or
      (c.name='JSS 2' and c.section is null) or
      (c.name='JSS 3' and c.section is null) or
      (c.name='SS 1' and c.section='Dynamo') or
      (c.name='SS 1' and c.section='Horizon') or
      (c.name='SS 2' and c.section is null) or
      (c.name='SS 3' and c.section is null)
    );
  if v_expected < 13 then raise exception 'Fewer than 13 expected International Unity School classes exist: %',v_expected; end if;
end $$;

select c.name,c.section,c.class_code,c.is_active,c.accepting_registrations
from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026'
order by c.name,c.section;

-- Duplicate class and registration safety.
select school_id,lower(name),coalesce(lower(section),''),count(*)
from public.classes group by 1,2,3 having count(*)>1;
select class_code,count(*) from public.classes
where class_code is not null group by class_code having count(*)>1;
select lower(school_name),lower(official_email),requested_by,count(*)
from public.school_registrations where status='pending'
group by 1,2,3 having count(*)>1;

-- Required protection triggers.
select c.relname,t.tgname
from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and not t.tgisinternal
  and t.tgname in (
   'profiles_guard_changes','submissions_guard_changes','submissions_guard_cross_school',
   'notifications_guard_update','notifications_guard_school_integrity','replies_guard_integrity',
   'topics_guard_changes','memberships_guard_school_integrity','roles_guard_school_integrity'
  ) order by c.relname,t.tgname;

-- Privileged function execution audit.
select p.proname,pg_get_function_identity_arguments(p.oid) arguments,
 has_function_privilege('PUBLIC',p.oid,'EXECUTE') public_execute,
 has_function_privilege('anon',p.oid,'EXECUTE') anon_execute,
 has_function_privilege('authenticated',p.oid,'EXECUTE') authenticated_execute
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in (
 'approve_school_registration','reject_school_registration','assign_school_admin','set_school_status',
 'platform_school_statistics','create_managed_class','update_managed_class','regenerate_class_code',
 'set_managed_class_status','assign_managed_class_teacher','create_notification','generate_school_code','generate_class_code'
) order by p.proname;

-- Direct anonymous permissions must be empty.
select grantee,table_name,privilege_type
from information_schema.role_table_grants
where table_schema='public' and grantee='anon'
order by table_name,privilege_type;

-- Public anonymous function privileges are checked separately.
select p.proname,pg_get_function_identity_arguments(p.oid) arguments
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and has_function_privilege('anon',p.oid,'EXECUTE')
order by p.proname;

-- Cross-school integrity queries.
select a.id from public.assignments a join public.classes c on c.id=a.class_id
where a.class_id is not null and c.school_id<>a.school_id;
select s.id from public.assignment_submissions s join public.assignments a on a.id=s.assignment_id
where s.school_id<>a.school_id;
select cm.user_id,cm.class_id from public.class_memberships cm join public.classes c on c.id=cm.class_id
where cm.school_id<>c.school_id;
