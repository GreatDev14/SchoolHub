-- School Hub post-migration verification and privilege audit
-- Run in staging after migration and before Platform Admin bootstrap.

-- 1. Every relevant table has RLS enabled.
do $$
declare v_table text; begin
foreach v_table in array array[
'schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships',
'assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events',
'discussion_topics','discussion_replies','content_reports','notifications'] loop
if not exists (
 select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
 where n.nspname='public' and c.relname=v_table and c.relrowsecurity and c.relkind='r')
then raise exception 'RLS missing: %',v_table; end if;
end loop;
end $$;

-- 2. Migration-owned policies exist.
do $$
declare v_policy text; begin
foreach v_policy in array array[
'profiles_select','profiles_update_own_or_admin','roles_select','classes_select','memberships_select',
'assignment_submissions_select','assignments_select','submissions_select','announcements_select','resources_select',
'timetable_select','calendar_select','topics_select','replies_select','reports_select','notifications_select'
] loop
if not exists(select 1 from pg_policies where schemaname='public' and policyname=v_policy)
then raise exception 'Policy missing: %',v_policy; end if;
end loop;
end $$;

-- 3. Privileged functions have no public/anon EXECUTE.
select p.proname,pg_get_function_identity_arguments(p.oid) arguments,
 has_function_privilege('PUBLIC',p.oid,'EXECUTE') public_execute,
 has_function_privilege('anon',p.oid,'EXECUTE') anon_execute
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in (
'approve_school_registration','reject_school_registration','assign_school_admin','set_school_status',
'platform_school_statistics','create_managed_class','update_managed_class','regenerate_class_code',
'set_managed_class_status','assign_managed_class_teacher','generate_school_code','generate_class_code'
)
order by p.proname;

-- 4. No dangerous anon table privileges.
select grantee,table_name,privilege_type
from information_schema.role_table_grants
where table_schema='public' and grantee='anon'
order by table_name,privilege_type;

select grantee,table_name,privilege_type
from information_schema.role_table_grants
where table_schema='public' and grantee='authenticated'
order by table_name,privilege_type;

-- 5. IUS preservation and class preservation.
do $$
declare c record; begin
if (select count(*) from public.schools where code='SHS-IUS-2026')<>1
then raise exception 'SHS-IUS-2026 missing or duplicated'; end if;
if not exists(select 1 from public.schools where name='International Unity School' and code='SHS-IUS-2026')
then raise exception 'International Unity School changed'; end if;
for c in
select c.* from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026' and c.class_code is null
loop raise exception 'IUS class % has no code',c.name||coalesce(' '||c.section,''); end loop;
if not exists(select 1 from public.classes c join public.schools s on s.id=c.school_id where s.code='SHS-IUS-2026' and c.name='SS 1' and c.section='Dynamo' and c.class_code='IUS-SS1-DYN-2026') then raise exception 'SS1 Dynamo missing'; end if;
if not exists(select 1 from public.classes c join public.schools s on s.id=c.school_id where s.code='SHS-IUS-2026' and c.name='SS 1' and c.section='Horizon' and c.class_code='IUS-SS1-HOR-2026') then raise exception 'SS1 Horizon missing'; end if;
end $$;

-- 6. Duplicate registrations/classes and cross-school invalid rows.
select lower(school_name),lower(official_email),requested_by,count(*)
from public.school_registrations where status='pending'
group by 1,2,3 having count(*)>1;
select school_id,lower(name),coalesce(lower(section),''),count(*)
from public.classes group by 1,2,3 having count(*)>1;
select a.id from public.assignments a join public.classes c on c.id=a.class_id
where a.class_id is not null and c.school_id<>a.school_id;
select s.id from public.assignment_submissions s join public.assignments a on a.id=s.assignment_id
where s.school_id<>a.school_id;
select cm.user_id,cm.class_id from public.class_memberships cm join public.classes c on c.id=cm.class_id
where cm.school_id<>c.school_id;

-- 7. Protected triggers exist.
select tg.tgname,c.relname from pg_trigger tg join pg_class c on c.oid=tg.tgrelid
where c.relname in ('profiles','assignment_submissions','assignments','classes','class_memberships','school_roles',
'announcements','resources','calendar_events','timetable_entries','discussion_topics','discussion_replies','content_reports','notifications')
and not tg.tgisinternal order by c.relname,tg.tgname;

-- 8. Role escalation helpers exist and functions are owner-only where privileged.
select proname,prosecdef,proconfig
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and proname in ('handle_new_user','guard_profile_changes','guard_assignment_submission_changes','guard_reply_integrity','guard_topic_changes')
order by proname;
