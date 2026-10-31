-- School Hub migration preflight compatibility checks
-- Do not execute the migration until every CHECK returns no failures.

-- Required tables and RLS
select c.relname as missing_table
from unnest(array['schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships','assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events','discussion_topics','discussion_replies','content_reports','notifications']::text[]) c(relname)
where not exists (
  select 1 from pg_class pc join pg_namespace pn on pn.oid=pc.relnamespace
  where pn.nspname='public' and pc.relname=c.relname and pc.relkind='r'
);

-- Preserve IUS and codes before migration
select * from public.schools where code='SHS-IUS-2026';
select c.name,c.section,c.class_code,c.is_active
from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026'
order by c.name,c.section;

-- Duplicate protected registration/class records that would block uniqueness
select lower(trim(school_name)) school_name_key, count(*)
from public.school_registrations where status='pending'
group by 1 having count(*)>1;
select lower(trim(official_email)) email_key,count(*)
from public.school_registrations where status='pending'
group by 1 having count(*)>1;
select requested_by,count(*) from public.school_registrations
where status='pending' group by requested_by having count(*)>1;
select school_id,lower(name),coalesce(lower(section),'') name_section,count(*)
from public.classes group by 1,2,3 having count(*)>1;

-- Duplicate/NULL class codes
select class_code,count(*) from public.classes
where class_code is not null group by class_code having count(*)>1;
select count(*) as null_class_codes from public.classes where class_code is null;

-- Status type compatibility
select table_name,column_name,data_type,udt_name
from information_schema.columns
where table_schema='public' and table_name in ('schools','profiles','school_roles')
  and column_name in ('status','lifecycle_status','role')
order by table_name,column_name;

-- Unexpected enum/text values that may prevent conversion
select status,count(*) from public.schools group by status;
select lifecycle_status,count(*) from public.schools where lifecycle_status is not null group by lifecycle_status;

-- Cross-school existing data violations
select a.id,a.school_id,a.class_id
from public.assignments a left join public.classes c on c.id=a.class_id
where a.class_id is not null and c.school_id is distinct from a.school_id;
select s.id,s.school_id,s.student_id,a.school_id assignment_school
from public.assignment_submissions s join public.assignments a on a.id=s.assignment_id
where s.school_id is distinct from a.school_id;
select cm.user_id,cm.school_id,cm.class_id,c.school_id class_school
from public.class_memberships cm join public.classes c on c.id=cm.class_id
where cm.school_id is distinct from c.school_id;

-- Existing trigger/policy inventory for manual compatibility review
select event_object_table trigger_table,trigger_name,event_manipulation
from information_schema.triggers where trigger_schema='public'
order by event_object_table,trigger_name;
select schemaname,tablename,policyname,cmd,roles
from pg_policies where schemaname='public'
order by tablename,policyname;
