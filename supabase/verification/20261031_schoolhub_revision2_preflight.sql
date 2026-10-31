-- School Hub Revision 2 preflight. Read-only checks where possible.
-- Resolve every row or abort condition manually before migration.

select count(*) as ius_school_count,
       bool_and(name='International Unity School') as name_is_expected
from public.schools where code='SHS-IUS-2026';

select c.name,c.section,c.class_code,c.is_active,c.accepting_registrations
from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026'
order by c.name,c.section;

select count(*) as ius_class_count
from public.classes c join public.schools s on s.id=c.school_id
where s.code='SHS-IUS-2026';

select class_code,count(*) from public.classes
where class_code is not null group by class_code having count(*)>1;
select count(*) as classes_with_null_or_blank_code
from public.classes where class_code is null or btrim(class_code)='';

select id,name,audience,class_id,is_published
from public.announcements
where audience not in ('school','class');

select id,title,starts_at,ends_at
from public.calendar_events
where ends_at is not null and ends_at<starts_at;

select p.id,p.school_id,u.email,u.email_confirmed_at
from public.profiles p join auth.users u on u.id=p.id
where p.school_id is distinct from null and u.email_confirmed_at is null;

select lower(school_name),lower(official_email),requested_by,count(*)
from public.school_registrations where status='pending'
group by 1,2,3 having count(*)>1;
select requested_by,count(*)
from public.school_registrations where status='pending'
group by requested_by having count(*)>1;

select school_id,lower(name),coalesce(lower(section),''),count(*)
from public.classes
group by 1,2,3 having count(*)>1;

select a.id,a.school_id,a.class_id,c.school_id as class_school
from public.assignments a left join public.classes c on c.id=a.class_id
where a.class_id is not null and c.school_id is distinct from a.school_id;

select s.id,s.school_id,a.school_id as assignment_school
from public.assignment_submissions s join public.assignments a on a.id=s.assignment_id
where s.school_id is distinct from a.school_id;

select cm.user_id,cm.class_id,c.school_id as class_school,cm.school_id
from public.class_memberships cm join public.classes c on c.id=cm.class_id
where cm.school_id is distinct from c.school_id;

select table_name,column_name,data_type,udt_name
from information_schema.columns
where table_schema='public'
  and table_name in ('schools','profiles','school_roles','classes','announcements','assignment_submissions','notifications')
order by table_name,column_name;

select event_object_table,trigger_name,event_manipulation
from information_schema.triggers where trigger_schema='public'
order by event_object_table,trigger_name,event_manipulation;

select schemaname,tablename,policyname,cmd,roles
from pg_policies where schemaname='public'
order by tablename,policyname;
