-- School Hub platform foundation and secure multi-school migration
-- This migration is intentionally safe to re-run. Do not execute it until reviewed.

create extension if not exists pgcrypto;

do $$ begin
  create type public.school_role_type as enum ('student', 'teacher', 'school_admin', 'class_representative');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.school_status_type as enum ('pending', 'approved', 'active', 'suspended', 'deactivated', 'rejected');
exception when duplicate_object then null;
end $$;

-- School lifecycle is separate from the registration approval lifecycle.
do $$ begin
  create type public.school_lifecycle_type as enum ('pending', 'active', 'suspended', 'deactivated');
exception when duplicate_object then null;
end $$;

create table if not exists public.schools (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  name text not null,
  code text not null unique,
  official_email text,
  address text,
  logo_url text,
  status public.school_status_type not null default 'pending',
  settings jsonb not null default '{}'::jsonb,
  lifecycle_status public.school_lifecycle_type not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.schools add column if not exists official_email text;
alter table public.schools add column if not exists status public.school_status_type not null default 'pending';
alter table public.schools add column if not exists logo_url text;
alter table public.schools add column if not exists address text;
alter table public.schools add column if not exists settings jsonb not null default '{}'::jsonb;
alter table public.schools add column if not exists lifecycle_status public.school_lifecycle_type not null default 'pending';
alter table public.schools add column if not exists created_at timestamptz not null default now();
alter table public.schools add column if not exists updated_at timestamptz not null default now();

update public.schools
set lifecycle_status = case status::text
  when 'active' then 'active'::public.school_lifecycle_type
  when 'suspended' then 'suspended'::public.school_lifecycle_type
  when 'deactivated' then 'deactivated'::public.school_lifecycle_type
  else 'pending'::public.school_lifecycle_type
end
where lifecycle_status='pending' and status::text in ('active','suspended','deactivated');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete cascade,
  full_name text not null,
  email text not null,
  avatar_url text,
  status text not null default 'active' check (status in ('active', 'pending', 'suspended', 'deactivated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists school_id uuid references public.schools(id) on delete cascade;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists status text not null default 'active';
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

create table if not exists public.school_roles (
  school_id uuid not null references public.schools(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('student', 'teacher', 'school_admin', 'class_representative', 'admin')),
  status text not null default 'active' check (status in ('active', 'pending', 'suspended', 'rejected')),
  created_at timestamptz not null default now(),
  primary key (school_id, user_id, role)
);

alter table public.school_roles add column if not exists status text not null default 'active';
alter table public.school_roles alter column role type text using role::text;
do $$ begin
  alter table public.school_roles add constraint school_roles_role_check check (role in ('student','teacher','school_admin','class_representative','admin'));
exception when duplicate_object then null;
end $$;

-- Platform owner privilege is intentionally separate from all school roles.
create table if not exists public.platform_admins (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  granted_at timestamptz not null default now(),
  granted_by uuid references public.profiles(id),
  notes text
);

create table if not exists public.school_registrations (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_name text not null,
  official_email text not null,
  address text,
  logo_url text,
  requested_by uuid not null references public.profiles(id),
  requested_admin_name text not null,
  requested_admin_email text not null,
  proposed_code text not null unique,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  school_id uuid references public.schools(id),
  created_at timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1 from public.school_registrations where status='pending'
    group by lower(school_name) having count(*)>1
  ) then raise exception 'Duplicate pending school registration names must be resolved before migration'; end if;
  if exists (
    select 1 from public.school_registrations where status='pending'
    group by lower(official_email) having count(*)>1
  ) then raise exception 'Duplicate pending school registration emails must be resolved before migration'; end if;
  if exists (
    select 1 from public.school_registrations where status='pending'
    group by requested_by having count(*)>1
  ) then raise exception 'Duplicate pending registrations for one requester must be resolved before migration'; end if;
end $$;
create unique index if not exists school_registrations_pending_name_uq
  on public.school_registrations (lower(school_name)) where status='pending';
create unique index if not exists school_registrations_pending_email_uq
  on public.school_registrations (lower(official_email)) where status='pending';
create unique index if not exists school_registrations_pending_owner_uq
  on public.school_registrations (requested_by) where status='pending';

create table if not exists public.classes (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null,
  section text,
  level text,
  class_code text not null unique,
  teacher_id uuid references public.profiles(id),
  accepting_registrations boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.classes add column if not exists class_code text;
alter table public.classes add column if not exists teacher_id uuid references public.profiles(id);
alter table public.classes add column if not exists accepting_registrations boolean not null default true;
alter table public.classes add column if not exists is_active boolean not null default true;
alter table public.classes add column if not exists level text;
-- Existing class_code values are preserved. Preflight.sql must detect duplicates and NULL values.
do $$
declare
  v_duplicate_code text;
  v_null_count integer;
begin
  select class_code into v_duplicate_code
  from public.classes
  where class_code is not null
  group by class_code having count(*)>1 limit 1;
  if v_duplicate_code is not null then
    raise exception 'Duplicate class registration code detected: %; resolve it in preflight before migration',v_duplicate_code;
  end if;
  select count(*) into v_null_count from public.classes where class_code is null;
  if v_null_count>0 then
    raise exception '% existing classes have NULL class codes; resolve them explicitly in preflight',v_null_count;
  end if;
end $$;
do $$
begin
  if exists (
    select 1 from public.classes
    group by school_id,lower(name),coalesce(lower(section),'') having count(*)>1
  ) then raise exception 'Duplicate classes by school/name/section must be resolved before migration'; end if;
end $$;
alter table public.classes alter column class_code set not null;
do $$ begin
  alter table public.classes add constraint classes_class_code_not_blank_check
    check (btrim(class_code)<>'');
exception when duplicate_object then null;
end $$;
create unique index if not exists classes_class_code_uq on public.classes(class_code) where class_code is not null;
create unique index if not exists classes_school_name_section_uq
  on public.classes (school_id, lower(name), coalesce(lower(section), ''));

create table if not exists public.class_memberships (
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  role text not null default 'student' check (role in ('student', 'teacher', 'class_representative')),
  created_at timestamptz not null default now(),
  primary key (class_id, user_id)
);

alter table public.class_memberships alter column role type text using role::text;
do $$ begin
  alter table public.class_memberships add constraint class_memberships_role_check check (role in ('student','teacher','class_representative'));
exception when duplicate_object then null;
end $$;

create table if not exists public.assignments (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  creator_id uuid not null references public.profiles(id),
  title text not null,
  description text,
  due_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  attachment_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.assignment_submissions (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  content text,
  attachment_url text,
  status text not null default 'submitted' check (status in ('draft', 'submitted', 'reviewed', 'returned')),
  score numeric,
  feedback text,
  submitted_at timestamptz not null default now(),
  unique (assignment_id, student_id)
);

create table if not exists public.announcements (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  title text not null,
  body text not null,
  audience text not null default 'school' check (audience in ('school','class')),
  is_published boolean not null default true,
  published_at timestamptz
);

alter table public.announcements add column if not exists is_published boolean not null default true;
alter table public.announcements add column if not exists published_at timestamptz;
update public.announcements set published_at=pg_catalog.now() where is_published=true and published_at is null;
do $$ begin
  alter table public.announcements
    add constraint announcements_audience_check check (audience in ('school','class'));
exception when duplicate_object then null;
end $$;


do $$ begin
  alter table public.assignment_submissions add constraint assignment_submissions_score_range
    check (score is null or (score >= 0 and score <= 100));
exception when duplicate_object then null;
when undefined_column then null;
end $$;

create table if not exists public.resources (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  uploader_id uuid not null references public.profiles(id),
  title text not null,
  description text,
  storage_path text,
  external_url text,
  content_type text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.timetable_entries (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  subject text not null,
  teacher_id uuid references public.profiles(id),
  day_of_week smallint not null check (day_of_week between 1 and 7),
  starts_at time not null,
  ends_at time not null,
  check (starts_at < ends_at)
);

create table if not exists public.calendar_events (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid references public.classes(id) on delete cascade,
  creator_id uuid not null references public.profiles(id),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  event_type text not null default 'event',
  is_published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.calendar_events add column if not exists is_published boolean not null default true;
alter table public.calendar_events add column if not exists published_at timestamptz;
update public.calendar_events set published_at=pg_catalog.now() where is_published=true and published_at is null;
do $$ begin
  alter table public.calendar_events
    add constraint calendar_events_end_after_start_check
    check (ends_at is null or ends_at>=starts_at);
exception when duplicate_object then null;
end $$;

create table if not exists public.discussion_topics (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  title text not null,
  body text not null,
  is_locked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.discussion_replies (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  topic_id uuid not null references public.discussion_topics(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.content_reports (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id),
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'actioned', 'dismissed')),
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Secure role helpers. SECURITY DEFINER functions never trust browser-supplied roles.
create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path='' as $$
  select exists (select 1 from public.platform_admins where user_id = auth.uid())
$$;

create or replace function public.current_school_id()
returns uuid language sql stable security definer set search_path='' as $$
  select school_id from public.profiles where id = auth.uid()
$$;

create or replace function public.is_school_admin(target_school uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select public.is_platform_admin() or exists (
    select 1 from public.school_roles sr
    join public.profiles p on p.id = sr.user_id
    where sr.user_id = auth.uid() and sr.school_id = target_school
      and sr.role in ('school_admin','admin') and sr.status = 'active'
      and p.school_id = target_school
  )
$$;

create or replace function public.has_active_school_role(target_school uuid, role_name text)
returns boolean language sql stable security definer set search_path='' as $$
  select exists (
    select 1 from public.school_roles
    where user_id = auth.uid() and school_id = target_school
      and role::text = role_name and status = 'active'
  )
$$;

create or replace function public.can_manage_class(target_school uuid, target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select public.is_school_admin(target_school) or (
    exists (
      select 1 from public.school_roles sr
      where sr.user_id = auth.uid() and sr.school_id = target_school
        and sr.role = 'teacher' and sr.status = 'active'
    ) and exists (
      select 1 from public.classes c
      where c.id = target_class and c.school_id = target_school
        and (c.teacher_id = auth.uid() or exists (
          select 1 from public.class_memberships cm
          where cm.class_id = target_class and cm.user_id = auth.uid()
            and cm.school_id = target_school and cm.role = 'teacher'
        ))
    )
  )
$$;

create or replace function public.can_manage_class_content(target_school uuid, target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select public.is_school_admin(target_school) or (
    exists (
      select 1 from public.school_roles sr
      where sr.user_id = auth.uid() and sr.school_id = target_school
        and sr.role = 'teacher' and sr.status = 'active'
    ) and exists (
      select 1 from public.classes c
      where c.id = target_class and c.school_id = target_school and (
        c.teacher_id = auth.uid() or exists (
          select 1 from public.class_memberships cm
          where cm.class_id = target_class and cm.user_id = auth.uid()
            and cm.school_id = target_school and cm.role = 'teacher'
        )
      )
    )
  )
$$;

create or replace function public.is_class_member(target_school uuid, target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select exists (
    select 1 from public.class_memberships cm
    where cm.user_id = auth.uid() and cm.school_id = target_school
      and cm.class_id = target_class
  )
$$;

create or replace function public.is_class_student(target_school uuid, target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select exists (
    select 1 from public.class_memberships cm
    where cm.user_id = auth.uid() and cm.school_id = target_school
      and cm.class_id = target_class
      and cm.role::text in ('student', 'class_representative')
  )
$$;

create or replace function public.can_moderate_class_discussions(target_school uuid, target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select public.is_school_admin(target_school) or public.can_manage_class_content(target_school,target_class) or exists (
    select 1 from public.class_memberships cm
    where cm.user_id=auth.uid() and cm.school_id=target_school
      and cm.class_id=target_class and cm.role::text='class_representative'
  )
$$;

-- Secure generated codes. RNG is server-side; prefixes avoid easy guessing.
create or replace function public.generate_school_code(school_name text)
returns text language plpgsql security definer set search_path='' as $$
declare
  base text;
  candidate text;
begin
  if not public.is_platform_admin() then raise exception 'Only a platform administrator may generate school codes'; end if;
  if school_name is null or length(trim(school_name)) < 3 then raise exception 'A valid school name is required'; end if;
  base := upper(regexp_replace(trim(school_name), '[^a-zA-Z0-9]+', '', 'g'));
  base := substring(base from 1 for 12);
  loop
    candidate := 'SHS-' || base || '-' || upper(substring(replace(pg_catalog.gen_random_uuid()::text, '-', '') from 1 for 6));
    if not exists (select 1 from public.schools where code = candidate) then return candidate; end if;
  end loop;
end;
$$;

create or replace function public.generate_class_code(target_school uuid, class_name text, class_section text default null)
returns text language plpgsql security definer set search_path='' as $$
declare
  school_code text;
  name_part text;
  section_part text;
  candidate text;
begin
  if target_school is null or not public.is_school_admin(target_school) then
    raise exception 'Not authorized to generate a class code for this school';
  end if;
  if class_name is null or length(trim(class_name)) < 1 then raise exception 'A valid class name is required'; end if;
  select code into school_code from public.schools where id = target_school;
  if school_code is null then raise exception 'School does not exist'; end if;
  name_part := upper(regexp_replace(trim(class_name), '[^a-zA-Z0-9]+', '-', 'g'));
  section_part := case when class_section is null or length(trim(class_section)) = 0 then '' else '-' || upper(regexp_replace(trim(class_section), '[^a-zA-Z0-9]+', '-', 'g')) end;
  loop
    candidate := school_code || '-CLASS-' || name_part || section_part || '-' || upper(substring(replace(pg_catalog.gen_random_uuid()::text, '-', '') from 1 for 8));
    if not exists (select 1 from public.classes where class_code = candidate) then return candidate; end if;
  end loop;
end;
$$;

create or replace function public.create_managed_class(target_school uuid, class_name text, class_section text default null, class_level text default null)
returns uuid language plpgsql security definer set search_path='' as $$
declare
  new_code text;
  new_id uuid;
begin
  if target_school is null or not public.is_school_admin(target_school) then raise exception 'Not authorized'; end if;
  if class_name is null or length(trim(class_name)) < 1 then raise exception 'Class name is required'; end if;
  if exists (select 1 from public.classes where school_id = target_school and lower(name) = lower(trim(class_name)) and coalesce(lower(section), '') = coalesce(lower(nullif(trim(class_section), '')), '')) then
    raise exception 'A class with this name and section already exists';
  end if;
  new_code := public.generate_class_code(target_school, class_name, class_section);
  insert into public.classes(school_id, name, section, level, class_code)
  values (target_school, trim(class_name), nullif(trim(class_section), ''), nullif(trim(class_level), ''), new_code)
  returning id into new_id;
  return new_id;
end;
$$;

create or replace function public.regenerate_class_code(target_class uuid)
returns text language plpgsql security definer set search_path='' as $$
declare
  c public.classes%rowtype;
  new_code text;
begin
  select * into c from public.classes where id = target_class;
  if c.id is null then raise exception 'Class does not exist'; end if;
  if not public.is_school_admin(c.school_id) then raise exception 'Not authorized'; end if;
  new_code := public.generate_class_code(c.school_id, c.name, c.section);
  update public.classes set class_code = new_code where id = target_class;
  return new_code;
end;
$$;

create or replace function public.assign_managed_class_teacher(target_class uuid, target_teacher uuid)
returns void language plpgsql security definer set search_path='' as $$
declare c public.classes%rowtype;
begin
  if target_class is null or target_teacher is null then raise exception 'Class and teacher are required'; end if;
  select * into c from public.classes where id=target_class;
  if c.id is null then raise exception 'Class does not exist'; end if;
  if not public.is_school_admin(c.school_id) then raise exception 'Only the School Admin may assign a class teacher'; end if;
  if not exists (select 1 from public.profiles p where p.id=target_teacher and p.school_id=c.school_id) then raise exception 'Teacher does not belong to this school'; end if;
  if not exists (select 1 from public.school_roles sr where sr.school_id=c.school_id and sr.user_id=target_teacher and sr.role='teacher' and sr.status='active') then raise exception 'Teacher must be approved for this school'; end if;
  update public.classes set teacher_id=target_teacher where id=target_class;
  insert into public.class_memberships(class_id,user_id,school_id,role)
  values(target_class,target_teacher,c.school_id,'teacher')
  on conflict(class_id,user_id) do update set role='teacher',school_id=excluded.school_id;
end;
$$;

create or replace function public.approve_school_registration(registration_id uuid)
returns uuid language plpgsql security definer set search_path='' as $$
declare
  r public.school_registrations%rowtype;
  new_school_id uuid;
  school_admin_id uuid;
begin
  if not public.is_platform_admin() then raise exception 'Only a platform administrator may approve schools'; end if;
  select * into r from public.school_registrations where id = registration_id for update;
  if r.id is null or r.status <> 'pending' then raise exception 'Registration is unavailable or was already rejected/approved'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(lower(r.school_name)));
  if exists (
    select 1 from public.schools
    where lower(name)=lower(r.school_name)
       or lower(coalesce(official_email,''))=lower(r.official_email)
       or code=r.proposed_code
  ) then raise exception 'Duplicate school registration'; end if;
  if r.requested_by is null then raise exception 'Registration requester is missing'; end if;
  select p.id into school_admin_id
  from public.profiles p
  join auth.users au on au.id=p.id
  where p.id=r.requested_by
    and lower(p.email)=lower(r.requested_admin_email)
    and lower(au.email)=lower(r.requested_admin_email)
    and au.email_confirmed_at is not null;
  if school_admin_id is null then
    raise exception 'The requested initial administrator account does not exist, is unverified, or does not match the requester';
  end if;
  if exists (select 1 from public.profiles p where p.id=school_admin_id and p.school_id is not null) then
    raise exception 'The initial administrator already belongs to an active or existing school';
  end if;
  if exists (select 1 from public.school_roles sr where sr.user_id=school_admin_id and sr.status='active') then
    raise exception 'The requester already holds an incompatible active school role';
  end if;
  insert into public.schools(name, code, official_email, address, logo_url, status, lifecycle_status)
  values(r.school_name, r.proposed_code, r.official_email, r.address, r.logo_url, 'pending', 'pending')
  returning id into new_school_id;
  update public.profiles set school_id = new_school_id, status = 'active' where id = school_admin_id;
  insert into public.school_roles(school_id, user_id, role, status)
  values(new_school_id, school_admin_id, 'school_admin', 'active')
  on conflict (school_id,user_id,role) do update set status='active';
  update public.schools set status='active', lifecycle_status='active', updated_at=pg_catalog.now() where id=new_school_id;
  update public.school_registrations set status = 'approved', reviewed_by = auth.uid(), reviewed_at = now(), school_id = new_school_id where id = registration_id;
  return new_school_id;
end;
$$;

create or replace function public.reject_school_registration(registration_id uuid, reason text default null)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.is_platform_admin() then raise exception 'Only a platform administrator may reject schools'; end if;
  update public.school_registrations set status='rejected', reviewed_by=auth.uid(), reviewed_at=now()
  where id=registration_id and status='pending';
  if not found then raise exception 'Registration is unavailable'; end if;
end;
$$;

create or replace function public.assign_school_admin(target_school uuid, target_user uuid)
returns void language plpgsql security definer set search_path='' as $$
declare
  old_admin_count integer;
begin
  if not public.is_platform_admin() then
    raise exception 'Only a platform administrator may assign school administrators';
  end if;
  if target_school is null or target_user is null then
    raise exception 'School and user are required';
  end if;
  if not exists (select 1 from public.schools where id=target_school) then
    raise exception 'Target school does not exist';
  end if;
  if not exists (select 1 from public.profiles p where p.id=target_user) then
    raise exception 'Target user profile does not exist';
  end if;
  if not exists (
    select 1 from public.profiles p
    where p.id=target_user
      and (p.school_id is null or p.school_id=target_school)
  ) then
    raise exception 'The target user already belongs to another school';
  end if;
  if not exists (
    select 1 from auth.users au
    where au.id=target_user and au.email_confirmed_at is not null
  ) then
    raise exception 'The target administrator must have a verified email';
  end if;

  select count(*) into old_admin_count
  from public.school_roles
  where school_id=target_school and role='school_admin' and status='active';

  -- Reassignment is atomic. Remove only the School Admin privilege; preserve other roles,
  -- class memberships, the previous administrator's school_id, and all unrelated profile data.
  delete from public.school_roles
  where school_id=target_school and role='school_admin' and status='active';

  update public.profiles
  set school_id=target_school, status='active'
  where id=target_user;

  insert into public.school_roles(school_id,user_id,role,status)
  values(target_school,target_user,'school_admin','active')
  on conflict (school_id,user_id,role)
  do update set status='active';

  if old_admin_count=0 and not exists (
    select 1 from public.school_roles sr join public.profiles p on p.id=sr.user_id
    where sr.school_id=target_school and sr.role='school_admin' and sr.status='active'
      and p.school_id=target_school
  ) then
    raise exception 'School reassignment must leave one valid School Admin';
  end if;
end;
$$;

create or replace function public.approve_teacher(target_school uuid, target_user uuid)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.is_school_admin(target_school) then raise exception 'Only school administrators or platform administrators may approve teachers'; end if;
  if not exists (select 1 from public.school_roles where school_id=target_school and user_id=target_user and role='teacher') then raise exception 'No teacher request found for this school'; end if;
  update public.school_roles set status='active' where school_id=target_school and user_id=target_user and role='teacher';
  update public.profiles set status='active' where id=target_user and school_id=target_school;
end;
$$;

create or replace function public.assign_class_representative(target_school uuid, target_class uuid, target_user uuid)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.is_school_admin(target_school) then raise exception 'Only a school administrator may assign a class representative'; end if;
  if not exists (select 1 from public.class_memberships where school_id=target_school and class_id=target_class and user_id=target_user and role='student') then
    raise exception 'The user must be a student in this class';
  end if;
  update public.class_memberships set role='class_representative'
  where school_id=target_school and class_id=target_class and user_id=target_user;
  insert into public.school_roles(school_id,user_id,role,status)
  values(target_school,target_user,'class_representative','active') on conflict (school_id,user_id,role) do update set status='active';
end;
$$;

create or replace function public.submit_school_registration(
  p_school_name text,
  p_official_email text,
  p_school_address text default null,
  p_logo_url text default null,
  p_requested_admin_name text default null
)
returns uuid language plpgsql security definer set search_path='' as $$
declare
  v_profile public.profiles%rowtype;
  v_new_id uuid;
  v_admin_email text;
  v_generated_code text;
  v_requester_name text;
  v_candidate_code text;
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  if not exists (select 1 from auth.users au where au.id=auth.uid() and au.email_confirmed_at is not null) then
    raise exception 'Verified email is required before submitting a school registration';
  end if;
  select * into v_profile from public.profiles p where p.id=auth.uid();
  if not found then raise exception 'Profile must exist before registering a school'; end if;
  if v_profile.school_id is not null and not public.is_platform_admin() then
    raise exception 'Prospective school owners must not belong to another active school';
  end if;
  if p_school_name is null or length(trim(p_school_name)) < 3 then raise exception 'A valid school name is required'; end if;
  if p_official_email is null or p_official_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then raise exception 'A valid official email is required'; end if;
  v_admin_email := v_profile.email;
  v_requester_name := coalesce(nullif(trim(p_requested_admin_name), ''),v_profile.full_name);
  if v_requester_name is null or length(trim(v_requester_name)) < 2 then raise exception 'Initial administrator name is required'; end if;
  if exists (select 1 from auth.users au where au.id=auth.uid() and lower(au.email)=lower(v_admin_email) and au.email_confirmed_at is not null) then null; else raise exception 'The profile email must match the verified Supabase Auth email'; end if;
  if exists (select 1 from public.school_registrations sr where sr.requested_by=auth.uid() and sr.status='pending') then raise exception 'You already have a pending school registration'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(lower(trim(p_school_name))));
  if exists (select 1 from public.schools s where lower(s.name)=lower(trim(p_school_name)) or lower(s.official_email)=lower(trim(p_official_email))) then raise exception 'A school with this name or email already exists'; end if;
  if exists (select 1 from public.school_registrations sr where sr.status='pending' and lower(sr.school_name)=lower(trim(p_school_name))) then raise exception 'This school registration is already pending approval'; end if;
  loop
    v_candidate_code := 'SHS-' || upper(substring(regexp_replace(trim(p_school_name), '[^a-Za-z0-9]+', '', 'g') from 1 for 12)) || '-' || upper(substring(replace(pg_catalog.gen_random_uuid()::text, '-', '') from 1 for 8));
    exit when not exists (select 1 from public.schools s where s.code=v_candidate_code)
      and not exists (select 1 from public.school_registrations sr where sr.proposed_code=v_candidate_code);
  end loop;
  v_generated_code := v_candidate_code;
  insert into public.school_registrations(school_name,official_email,address,logo_url,requested_by,requested_admin_name,requested_admin_email,proposed_code)
  values(trim(p_school_name),lower(trim(p_official_email)),nullif(trim(p_school_address),''),nullif(trim(p_logo_url),''),auth.uid(),v_requester_name,lower(v_admin_email),v_generated_code)
  returning id into v_new_id;
  return v_new_id;
end;
$$;

-- Registration must validate school and class codes before creating profile records.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path='' as $$
declare
  school_row public.schools%rowtype;
  class_row public.classes%rowtype;
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  requested_role text := lower(trim(coalesce(meta->>'requested_role', 'student')));
  supplied_school_code text := upper(trim(coalesce(meta->>'school_code', '')));
  supplied_class_code text := upper(trim(coalesce(meta->>'class_code', '')));
  full_name text := nullif(trim(coalesce(meta->>'full_name', '')), '');
begin
  if new.email is null or new.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'A valid email address is required';
  end if;
  if full_name is null then full_name := split_part(new.email, '@', 1); end if;

  if requested_role = 'school_owner' then
    if exists (
      select 1 from public.profiles p
      where p.id=new.id and p.school_id is not null
    ) then
      raise exception 'An existing profile cannot be overwritten by school-owner registration';
    end if;
    insert into public.profiles(id,school_id,full_name,email,status)
    values(new.id,null,full_name,new.email,'active')
    on conflict(id) do update set full_name=excluded.full_name,email=excluded.email;
    return new;
  end if;

  if requested_role not in ('student','teacher') then
    raise exception 'Only student, teacher, and prospective school owner self-registration is permitted';
  end if;
  if supplied_school_code = '' then raise exception 'School code is required'; end if;
  select * into school_row from public.schools
  where upper(code)=supplied_school_code
    and status='active' and lifecycle_status='active'
  limit 1;
  if school_row.id is null then raise exception 'School code is invalid or the school is not active'; end if;

  if exists (
    select 1 from public.profiles p
    where p.id=new.id and p.school_id is not null and p.school_id<>school_row.id
  ) then
    raise exception 'Existing profile belongs to a different school';
  end if;

  insert into public.profiles(id,school_id,full_name,email,status)
  values(new.id,school_row.id,full_name,new.email,
         case when requested_role='teacher' then 'pending' else 'active' end)
  on conflict(id) do update set
    full_name=excluded.full_name,
    email=excluded.email,
    school_id=coalesce(public.profiles.school_id,excluded.school_id);

  if requested_role='teacher' then
    insert into public.school_roles(school_id,user_id,role,status)
    values(school_row.id,new.id,'teacher','pending') on conflict do nothing;
    return new;
  end if;

  if requested_role <> 'student' then raise exception 'Only student and teacher self-registration is permitted'; end if;
  if supplied_class_code = '' then raise exception 'Class code is required for student registration'; end if;
  select * into class_row from public.classes
  where school_id=school_row.id and upper(class_code)=supplied_class_code
    and is_active=true and accepting_registrations=true limit 1;
  if class_row.id is null then raise exception 'Class code is invalid, inactive, or does not belong to this school'; end if;
  insert into public.school_roles(school_id,user_id,role,status)
  values(school_row.id,new.id,'student','active') on conflict do nothing;
  insert into public.class_memberships(class_id,user_id,school_id,role)
  values(class_row.id,new.id,school_row.id,'student') on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Preserve International Unity School. Create it only when it is genuinely absent;
-- never rename, reactivate, suspend, or otherwise overwrite an existing record.
do $$
declare
  v_count integer;
begin
  select count(*) into v_count from public.schools where code='SHS-IUS-2026';
  if v_count>1 then raise exception 'SHS-IUS-2026 exists more than once'; end if;
  if v_count=0 then
    insert into public.schools(name,code,official_email,address,status,lifecycle_status)
    values('International Unity School','SHS-IUS-2026',null,'Nigeria','pending','pending');
  elsif not exists (
    select 1 from public.schools
    where code='SHS-IUS-2026' and name='International Unity School'
  ) then
    raise exception 'The SHS-IUS-2026 record has an unexpected school name; no data was changed';
  end if;
end $$;

do $$
declare
  v_school_id uuid;
  v_class record;
begin
  select id into v_school_id from public.schools where code='SHS-IUS-2026';
  if v_school_id is null then return; end if;
  for v_class in
    select * from (values
      ('Primary 1',null::text,'Primary','IUS-P1-2026'),('Primary 2',null,'Primary','IUS-P2-2026'),
      ('Primary 3',null,'Primary','IUS-P3-2026'),('Primary 4',null,'Primary','IUS-P4-2026'),
      ('Primary 5',null,'Primary','IUS-P5-2026'),('Primary 6',null,'Primary','IUS-P6-2026'),
      ('JSS 1',null,'Secondary','IUS-JSS1-2026'),('JSS 2',null,'Secondary','IUS-JSS2-2026'),
      ('JSS 3',null,'Secondary','IUS-JSS3-2026'),('SS 1','Dynamo','Secondary','IUS-SS1-DYN-2026'),
      ('SS 1','Horizon','Secondary','IUS-SS1-HOR-2026'),('SS 2',null,'Secondary','IUS-SS2-2026'),
      ('SS 3',null,'Secondary','IUS-SS3-2026')
    ) as c(name,section,level,code)
  loop
    if not exists (
      select 1 from public.classes c
      where c.school_id=v_school_id and lower(c.name)=lower(v_class.name)
        and coalesce(lower(c.section),'')=coalesce(lower(v_class.section),'')
    ) then
      insert into public.classes(school_id,name,section,level,class_code,is_active,accepting_registrations)
      values(v_school_id,v_class.name,v_class.section,v_class.level,v_class.code,true,true);
    end if;
  end loop;
end $$;

-- Database triggers protect privileged columns even if an RLS policy is later broadened.
create or replace function public.guard_profile_changes()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if current_user in ('postgres','service_role','supabase_admin') then return new; end if;
  if new.school_id is distinct from old.school_id then raise exception 'You cannot change your school membership'; end if;
  if new.status is distinct from old.status then raise exception 'You cannot change your account status'; end if;
  if lower(new.email) is distinct from lower(old.email) then raise exception 'You cannot change your account email'; end if;
  if new.id is distinct from old.id then raise exception 'You cannot change profile identity'; end if;
  return new;
end; $$;
drop trigger if exists profiles_guard_changes on public.profiles;
create trigger profiles_guard_changes before update on public.profiles
for each row execute function public.guard_profile_changes();

create or replace function public.guard_assignment_submission_changes()
returns trigger language plpgsql security invoker set search_path='' as $$
declare
  a public.assignments%rowtype;
begin
  if current_user in ('postgres','service_role','supabase_admin') then return new; end if;
  if new.id is distinct from old.id or new.assignment_id is distinct from old.assignment_id
     or new.student_id is distinct from old.student_id or new.school_id is distinct from old.school_id then
    raise exception 'Submission identity and school ownership cannot be changed';
  end if;
  select * into a from public.assignments where id=new.assignment_id;
  if not found or a.school_id<>new.school_id then raise exception 'Submission is not valid for this assignment'; end if;
  if new.student_id=auth.uid() then
    if a.status<> 'published' then raise exception 'Assignments must be published before students may edit submissions'; end if;
    if new.score is distinct from old.score or new.feedback is distinct from old.feedback then
      raise exception 'Students cannot modify grades or teacher feedback';
    end if;
    if not (
      new.status in ('draft','submitted') and
      ((old.status='draft' and new.status='submitted') or
       (old.status='submitted' and new.status='draft') or
       (old.status=new.status))
    ) then raise exception 'Invalid student submission status transition'; end if;
  elsif public.can_manage_class_content(a.school_id,a.class_id) then
    if new.content is distinct from old.content or new.attachment_url is distinct from old.attachment_url
       or new.submitted_at is distinct from old.submitted_at then
      raise exception 'Protected submission content cannot be changed while grading';
    end if;
    if new.score is not null and (new.score < 0 or new.score > 100) then
      raise exception 'Submission score must be between 0 and 100';
    end if;
    if not (
      (old.status='draft' and new.status='submitted') or
      (old.status='submitted' and new.status in ('reviewed','returned')) or
      (old.status='reviewed' and new.status='returned') or
      (old.status='returned' and new.status='submitted') or
      (old.status=new.status)
    ) then raise exception 'Invalid submission status transition'; end if;
  else
    raise exception 'Not authorized to update this submission';
  end if;
  return new;
end; $$;
drop trigger if exists submissions_guard_changes on public.assignment_submissions;
create trigger submissions_guard_changes before update on public.assignment_submissions
for each row execute function public.guard_assignment_submission_changes();

create or replace function public.guard_assignment_cross_school()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.class_id is not null and not exists (
    select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id
  ) then raise exception 'Assignment class does not belong to the assignment school'; end if;
  if not exists (select 1 from public.profiles p where p.id=new.creator_id and p.school_id=new.school_id) then
    raise exception 'Assignment creator does not belong to the assignment school';
  end if;
  return new;
end; $$;
drop trigger if exists assignments_guard_cross_school on public.assignments;
create trigger assignments_guard_cross_school before insert or update on public.assignments
for each row execute function public.guard_assignment_cross_school();

create or replace function public.guard_submission_cross_school()
returns trigger language plpgsql security invoker set search_path='' as $$
declare a public.assignments%rowtype; begin
  select * into a from public.assignments where id=new.assignment_id;
  if not found or a.school_id<>new.school_id then raise exception 'Submission school does not match its assignment'; end if;
  if a.class_id is null then
    if not exists (select 1 from public.class_memberships cm
                   where cm.school_id=new.school_id and cm.user_id=new.student_id
                     and cm.role in ('student','class_representative')) then
      raise exception 'Student has no valid class membership for this school-wide assignment';
    end if;
  elsif not exists (select 1 from public.class_memberships cm
                    where cm.class_id=a.class_id and cm.user_id=new.student_id
                      and cm.school_id=new.school_id and cm.role in ('student','class_representative')) then
    raise exception 'Student is not a member of the assignment class';
  end if;
  if tg_op='INSERT' and new.student_id=auth.uid() then
    if a.status<> 'published' then raise exception 'Only published assignments may receive student submissions'; end if;
    if new.score is not null or new.feedback is not null then
      raise exception 'Students cannot submit grades or teacher feedback';
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists submissions_guard_cross_school on public.assignment_submissions;
create trigger submissions_guard_cross_school before insert or update on public.assignment_submissions
for each row execute function public.guard_submission_cross_school();

create or replace function public.guard_membership_school_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then
    raise exception 'Class does not belong to the membership school';
  end if;
  if not exists (select 1 from public.profiles p where p.id=new.user_id and p.school_id=new.school_id) then
    raise exception 'User does not belong to the membership school';
  end if;
  return new;
end; $$;
drop trigger if exists memberships_guard_school_integrity on public.class_memberships;
create trigger memberships_guard_school_integrity before insert or update on public.class_memberships
for each row execute function public.guard_membership_school_integrity();

create or replace function public.guard_role_school_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if not exists (select 1 from public.profiles p where p.id=new.user_id and p.school_id=new.school_id) then
    raise exception 'Role user does not belong to the role school';
  end if;
  return new;
end; $$;
drop trigger if exists roles_guard_school_integrity on public.school_roles;
create trigger roles_guard_school_integrity before insert or update on public.school_roles
for each row execute function public.guard_role_school_integrity();

-- Cross-school integrity guards for content tables.
create or replace function public.guard_content_school_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_table_name='announcements' then
    if new.audience not in ('school','class') then raise exception 'Invalid announcement audience'; end if;
    if new.audience='school' and new.class_id is not null then raise exception 'School-wide announcements cannot specify a class'; end if;
    if new.audience='class' and new.class_id is null then raise exception 'Class announcements require a class'; end if;
    if not exists (select 1 from public.profiles p where p.id=new.author_id and p.school_id=new.school_id) then raise exception 'Announcement author does not belong to the announcement school'; end if;
    if new.class_id is not null and not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then raise exception 'Announcement class does not belong to the announcement school'; end if;
  elsif tg_table_name='resources' then
    if not exists (select 1 from public.profiles p where p.id=new.uploader_id and p.school_id=new.school_id) then raise exception 'Resource uploader does not belong to the resource school'; end if;
    if new.class_id is not null and not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then raise exception 'Resource class does not belong to the resource school'; end if;
  elsif tg_table_name='calendar_events' then
    if not exists (select 1 from public.profiles p where p.id=new.creator_id and p.school_id=new.school_id) then raise exception 'Calendar creator does not belong to the event school'; end if;
    if new.class_id is not null and not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then raise exception 'Calendar class does not belong to the event school'; end if;
  elsif tg_table_name='timetable_entries' then
    if not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then raise exception 'Timetable class does not belong to the timetable school'; end if;
    if new.teacher_id is not null and not exists (
      select 1 from public.profiles p join public.school_roles sr on sr.user_id=p.id and sr.school_id=p.school_id
      where p.id=new.teacher_id and p.school_id=new.school_id
        and sr.role='teacher' and sr.status='active'
    ) then raise exception 'Timetable teacher must be approved and belong to the timetable school'; end if;
  elsif tg_table_name='discussion_topics' then
    if not exists (select 1 from public.profiles p where p.id=new.author_id and p.school_id=new.school_id) then raise exception 'Discussion author does not belong to the topic school'; end if;
    if not exists (select 1 from public.classes c where c.id=new.class_id and c.school_id=new.school_id) then raise exception 'Discussion class does not belong to the topic school'; end if;
  end if;
  return new;
end; $$;

drop trigger if exists announcements_guard_school_integrity on public.announcements;
create trigger announcements_guard_school_integrity before insert or update on public.announcements for each row execute function public.guard_content_school_integrity();
drop trigger if exists resources_guard_school_integrity on public.resources;
create trigger resources_guard_school_integrity before insert or update on public.resources for each row execute function public.guard_content_school_integrity();
drop trigger if exists calendar_guard_school_integrity on public.calendar_events;
create trigger calendar_guard_school_integrity before insert or update on public.calendar_events for each row execute function public.guard_content_school_integrity();
drop trigger if exists timetable_guard_school_integrity on public.timetable_entries;
create trigger timetable_guard_school_integrity before insert or update on public.timetable_entries for each row execute function public.guard_content_school_integrity();
drop trigger if exists topics_guard_school_integrity on public.discussion_topics;
create trigger topics_guard_school_integrity before insert or update on public.discussion_topics for each row execute function public.guard_content_school_integrity();

create or replace function public.guard_reply_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
declare t public.discussion_topics%rowtype;
begin
  select * into t from public.discussion_topics where id=new.topic_id;
  if not found or t.school_id<>new.school_id then raise exception 'Reply topic and school do not match'; end if;
  if not exists (select 1 from public.profiles p where p.id=new.author_id and p.school_id=new.school_id) then raise exception 'Reply author does not belong to the reply school'; end if;
  if tg_op='UPDATE' then
    if new.id is distinct from old.id or new.topic_id is distinct from old.topic_id or new.school_id is distinct from old.school_id or new.author_id is distinct from old.author_id or new.created_at is distinct from old.created_at then raise exception 'Reply identity and ownership cannot be changed'; end if;
    if new.author_id=auth.uid() and t.is_locked then raise exception 'Replies cannot be changed after the topic is locked'; end if;
    if new.author_id<>auth.uid() then
      if not public.can_moderate_class_discussions(t.school_id,t.class_id) then raise exception 'Not authorized to moderate this reply'; end if;
      if new.body is distinct from old.body then raise exception 'Moderators may delete inappropriate replies but cannot rewrite another user reply'; end if;
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists replies_guard_integrity on public.discussion_replies;
create trigger replies_guard_integrity before insert or update on public.discussion_replies for each row execute function public.guard_reply_integrity();

create or replace function public.guard_topic_changes()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='UPDATE' then
    if new.id is distinct from old.id or new.school_id is distinct from old.school_id or new.class_id is distinct from old.class_id or new.author_id is distinct from old.author_id or new.created_at is distinct from old.created_at then raise exception 'Topic identity cannot be changed'; end if;
    if new.author_id=auth.uid() then
      if old.is_locked then raise exception 'Authors cannot edit a locked discussion topic'; end if;
      if new.is_locked is distinct from old.is_locked then raise exception 'Only moderators can lock or unlock discussions'; end if;
    elsif public.can_moderate_class_discussions(new.school_id,new.class_id) then
      if new.title is distinct from old.title or new.body is distinct from old.body then raise exception 'Moderators cannot rewrite topic author content'; end if;
    else
      raise exception 'Not authorized to update this topic';
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists topics_guard_changes on public.discussion_topics;
create trigger topics_guard_changes before insert or update on public.discussion_topics for each row execute function public.guard_topic_changes();

create or replace function public.guard_content_report_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
declare target_school uuid;
begin
  if not exists (select 1 from public.profiles p where p.id=new.reporter_id and p.school_id=new.school_id) then raise exception 'Reporter does not belong to the report school'; end if;
  if new.reviewed_by is not null and not exists (select 1 from public.profiles p where p.id=new.reviewed_by and p.school_id=new.school_id) then raise exception 'Reviewer does not belong to the report school'; end if;
  if new.target_type='topic' then select school_id into target_school from public.discussion_topics where id=new.target_id;
  elsif new.target_type='reply' then select school_id into target_school from public.discussion_replies where id=new.target_id;
  elsif new.target_type='resource' then select school_id into target_school from public.resources where id=new.target_id;
  elsif new.target_type='announcement' then select school_id into target_school from public.announcements where id=new.target_id;
  else raise exception 'Unsupported content report target type'; end if;
  if target_school is null or target_school<>new.school_id then raise exception 'Reported content does not belong to the report school'; end if;
  if tg_op='UPDATE' then
    if new.id is distinct from old.id
      or new.school_id is distinct from old.school_id
      or new.reporter_id is distinct from old.reporter_id
      or new.target_type is distinct from old.target_type
      or new.target_id is distinct from old.target_id
      or new.reason is distinct from old.reason
      or new.created_at is distinct from old.created_at
    then raise exception 'Reporters cannot change protected report fields'; end if;
  end if;
  return new;
end; $$;
drop trigger if exists reports_guard_school_integrity on public.content_reports;
create trigger reports_guard_school_integrity before insert or update on public.content_reports for each row execute function public.guard_content_report_integrity();

create or replace function public.guard_notification_school_integrity()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if not exists (select 1 from public.profiles p where p.id=new.user_id and p.school_id=new.school_id) then
    raise exception 'Notification recipient does not belong to the notification school';
  end if;
  return new;
end; $$;
drop trigger if exists notifications_guard_school_integrity on public.notifications;
create trigger notifications_guard_school_integrity before insert or update on public.notifications
for each row execute function public.guard_notification_school_integrity();

create or replace function public.guard_notification_update()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='UPDATE' then
    if new.id is distinct from old.id
      or new.school_id is distinct from old.school_id
      or new.user_id is distinct from old.user_id
      or new.title is distinct from old.title
      or new.body is distinct from old.body
      or new.link is distinct from old.link
      or new.created_at is distinct from old.created_at
    then raise exception 'Only is_read may be changed on a notification'; end if;
  end if;
  return new;
end; $$;
drop trigger if exists notifications_guard_update on public.notifications;
create trigger notifications_guard_update before update on public.notifications
for each row execute function public.guard_notification_update();

create or replace function public.guard_school_activation()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.lifecycle_status='active' or new.status='active' then
    if new.lifecycle_status<> 'active' or new.status<> 'active' then
      raise exception 'A school may only accept registration when both approval status and lifecycle status are active';
    end if;
    if not exists (
      select 1 from public.school_roles sr join public.profiles p on p.id=sr.user_id
      where sr.school_id=new.id and sr.role='school_admin' and sr.status='active'
        and p.school_id=new.id and p.status='active'
    ) then raise exception 'A school cannot be activated without a valid active School Admin'; end if;
  end if;
  return new;
end; $$;
drop trigger if exists schools_sync_lifecycle on public.schools;
drop trigger if exists schools_guard_activation on public.schools;
create trigger schools_guard_activation before insert or update on public.schools for each row execute function public.guard_school_activation();

-- Enable RLS for every school-scoped table.
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.school_roles enable row level security;
alter table public.platform_admins enable row level security;
alter table public.school_registrations enable row level security;
alter table public.classes enable row level security;
alter table public.class_memberships enable row level security;
alter table public.assignments enable row level security;
alter table public.assignment_submissions enable row level security;
alter table public.announcements enable row level security;
alter table public.resources enable row level security;
alter table public.timetable_entries enable row level security;
alter table public.calendar_events enable row level security;
alter table public.discussion_topics enable row level security;
alter table public.discussion_replies enable row level security;
alter table public.content_reports enable row level security;
alter table public.notifications enable row level security;

-- Drop only policies owned by this migration before recreating them.
do $$
declare policy_record record;
begin
  for policy_record in
    select t.table_name,p.policy_name
    from (
      values
      ('schools',array['schools_select','schools_super_admin_insert','schools_super_admin_update','schools_super_admin_delete']),
      ('platform_admins',array['platform_admins_select','platform_admins_manage']),
      ('school_registrations',array['school_registrations_insert','school_registrations_select','school_registrations_update']),
      ('profiles',array['profiles_select','profiles_insert_self','profiles_update_own_or_admin','profiles_delete_admin']),
      ('school_roles',array['roles_select','roles_admin_insert','roles_admin_update','roles_admin_delete']),
      ('classes',array['classes_select','classes_admin_insert','classes_admin_update','classes_admin_delete']),
      ('class_memberships',array['memberships_select','memberships_admin_insert','memberships_admin_update','memberships_admin_delete']),
      ('assignments',array['assignments_select','assignments_staff_insert','assignments_staff_update','assignments_staff_delete']),
      ('assignment_submissions',array['submissions_select','submissions_student_insert','submissions_student_update','submissions_staff_update','submissions_student_delete','submissions_staff_delete']),
      ('announcements',array['announcements_select','announcements_staff_insert','announcements_staff_update','announcements_staff_delete']),
      ('resources',array['resources_select','resources_staff_insert','resources_staff_update','resources_staff_delete']),
      ('timetable_entries',array['timetable_select','timetable_admin_insert','timetable_admin_update','timetable_admin_delete']),
      ('calendar_events',array['calendar_select','calendar_staff_insert','calendar_staff_update','calendar_staff_delete']),
      ('discussion_topics',array['topics_select','topics_insert','topics_update','topics_delete']),
      ('discussion_replies',array['replies_select','replies_insert','replies_update','replies_delete']),
      ('content_reports',array['reports_select','reports_insert','reports_admin_update','reports_admin_delete']),
      ('notifications',array['notifications_select','notifications_insert_system_or_admin','notifications_update_own','notifications_delete_own'])
    ) as t(table_name, policy_names)
    cross join lateral unnest(t.policy_names) as p(policy_name)
  loop
    execute format('drop policy if exists %I on public.%I',policy_record.policy_name,policy_record.table_name);
  end loop;
end $$;

-- Platform and schools
create policy schools_select on public.schools for select using (
  public.is_platform_admin() or (lifecycle_status='active' and id=public.current_school_id())
);
create policy schools_super_admin_insert on public.schools for insert with check (public.is_platform_admin());
create policy schools_super_admin_update on public.schools for update using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy schools_super_admin_delete on public.schools for delete using (public.is_platform_admin());

create policy platform_admins_select on public.platform_admins for select using (public.is_platform_admin());
create policy platform_admins_manage on public.platform_admins for all using (public.is_platform_admin()) with check (public.is_platform_admin());

create policy school_registrations_insert on public.school_registrations for insert with check (auth.uid() is not null and requested_by=auth.uid());
create policy school_registrations_select on public.school_registrations for select using (public.is_platform_admin() or requested_by=auth.uid());
create policy school_registrations_update on public.school_registrations for update using (public.is_platform_admin()) with check (public.is_platform_admin());

-- Profiles and roles
create policy profiles_select on public.profiles for select using (
  public.is_platform_admin()
  or id=auth.uid()
  or public.is_school_admin(school_id)
  or (school_id=public.current_school_id())
);
create policy profiles_insert_self on public.profiles for insert with check (id=auth.uid());
create policy profiles_update_own_or_admin on public.profiles for update using (
  id=auth.uid() or public.is_school_admin(school_id) or public.is_platform_admin()
) with check (
  id=auth.uid() or public.is_school_admin(school_id) or public.is_platform_admin()
);
create policy profiles_delete_admin on public.profiles for delete using (public.is_school_admin(school_id) or public.is_platform_admin());

create policy roles_select on public.school_roles for select using (
  public.is_platform_admin() or user_id=auth.uid() or public.is_school_admin(school_id)
);
create policy roles_admin_insert on public.school_roles for insert with check (public.is_school_admin(school_id) or public.is_platform_admin());
create policy roles_admin_update on public.school_roles for update using (public.is_school_admin(school_id) or public.is_platform_admin()) with check (public.is_school_admin(school_id) or public.is_platform_admin());
create policy roles_admin_delete on public.school_roles for delete using (public.is_school_admin(school_id) or public.is_platform_admin());

-- Classes and memberships
create policy classes_select on public.classes for select using (
  school_id=public.current_school_id() or public.is_platform_admin()
);
create policy classes_admin_insert on public.classes for insert with check (public.is_school_admin(school_id));
create policy classes_admin_update on public.classes for update using (public.is_school_admin(school_id)) with check (public.is_school_admin(school_id));
create policy classes_admin_delete on public.classes for delete using (public.is_school_admin(school_id));

create policy memberships_select on public.class_memberships for select using (
  school_id=public.current_school_id() and (
    user_id=auth.uid() or public.is_school_admin(school_id)
    or public.can_manage_class(school_id,class_id)
  )
);
create policy memberships_admin_insert on public.class_memberships for insert with check (public.is_school_admin(school_id));
create policy memberships_admin_update on public.class_memberships for update using (public.is_school_admin(school_id)) with check (public.is_school_admin(school_id));
create policy memberships_admin_delete on public.class_memberships for delete using (public.is_school_admin(school_id));

-- Assignments and private submissions
create policy assignments_select on public.assignments for select using (
  school_id=public.current_school_id() and (
    public.is_school_admin(school_id) or
    (status='published' and class_id is null and exists (select 1 from public.class_memberships cm where cm.school_id=school_id and cm.user_id=auth.uid())) or
    (status='published' and exists (select 1 from public.class_memberships cm where cm.class_id=assignments.class_id and cm.user_id=auth.uid() and cm.school_id=school_id)) or
    public.can_manage_class_content(school_id,class_id)
  )
);
create policy assignments_staff_insert on public.assignments for insert with check (
  school_id=public.current_school_id() and creator_id=auth.uid() and (
    (class_id is null and public.is_school_admin(school_id))
    or public.can_manage_class_content(school_id,class_id)
  )
);
create policy assignments_staff_update on public.assignments for update using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or public.can_manage_class_content(school_id,class_id)
  )
) with check (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or public.can_manage_class_content(school_id,class_id)
  )
);
create policy assignments_staff_delete on public.assignments for delete using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or public.can_manage_class_content(school_id,class_id)
  )
);

create policy submissions_select on public.assignment_submissions for select using (
  school_id=public.current_school_id() and (
    student_id=auth.uid() or exists (
      select 1 from public.assignments a
      where a.id=assignment_submissions.assignment_id and public.can_manage_class_content(a.school_id,a.class_id)
    )
  )
);
create policy submissions_student_insert on public.assignment_submissions for insert with check (
  school_id=public.current_school_id() and student_id=auth.uid() and exists (
    select 1 from public.assignments a
    where a.id=assignment_submissions.assignment_id and a.school_id=school_id and a.status='published'
      and (
        (a.class_id is null and exists (select 1 from public.class_memberships cm where cm.school_id=school_id and cm.user_id=auth.uid() and cm.role in ('student','class_representative')))
        or public.is_class_student(school_id,a.class_id)
      )
  )
);
create policy submissions_student_update on public.assignment_submissions for update using (
  school_id=public.current_school_id() and student_id=auth.uid()
) with check (
  school_id=public.current_school_id() and student_id=auth.uid() and status in ('draft','submitted')
);
create policy submissions_staff_update on public.assignment_submissions for update using (
  school_id=public.current_school_id() and exists (
    select 1 from public.assignments a
    where a.id=assignment_submissions.assignment_id and public.can_manage_class_content(a.school_id,a.class_id)
  )
) with check (
  school_id=public.current_school_id() and exists (
    select 1 from public.assignments a
    where a.id=assignment_submissions.assignment_id and public.can_manage_class_content(a.school_id,a.class_id)
  )
);
create policy submissions_student_delete on public.assignment_submissions for delete using (
  school_id=public.current_school_id() and student_id=auth.uid() and status='draft'
);


-- Announcements and resources
create policy announcements_select on public.announcements for select using (
  school_id=public.current_school_id() and (
    public.is_school_admin(school_id) or
    public.can_manage_class_content(school_id,class_id) or
      (is_published=true and published_at<=pg_catalog.now() and
        ((audience='school' and class_id is null) or
         (audience='class' and class_id is not null and public.is_class_student(school_id,class_id))))
  )
);
create policy announcements_staff_insert on public.announcements for insert with check (
  school_id=public.current_school_id() and author_id=auth.uid() and
  ((audience='school' and class_id is null and public.is_school_admin(school_id)) or
   (audience='class' and class_id is not null and public.can_manage_class_content(school_id,class_id)))
);
create policy announcements_staff_update on public.announcements for update using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (author_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
) with check (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (author_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);
create policy announcements_staff_delete on public.announcements for delete using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (author_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);

create policy resources_select on public.resources for select using (
  school_id=public.current_school_id() and (
    public.is_school_admin(school_id) or
    public.can_manage_class_content(school_id,class_id) or
    (is_published=true and (class_id is null or public.is_class_student(school_id,class_id)))
  )
);
create policy resources_staff_insert on public.resources for insert with check (
  school_id=public.current_school_id() and uploader_id=auth.uid() and
  (class_id is null and public.is_school_admin(school_id) or public.can_manage_class_content(school_id,class_id))
);
create policy resources_staff_update on public.resources for update using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (uploader_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
) with check (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (uploader_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);
create policy resources_staff_delete on public.resources for delete using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (uploader_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);

-- Timetable and calendar
create policy timetable_select on public.timetable_entries for select using (
  school_id=public.current_school_id() and
  (public.is_school_admin(school_id) or public.is_class_student(school_id,class_id) or public.can_manage_class_content(school_id,class_id))
);
create policy timetable_admin_insert on public.timetable_entries for insert with check (public.is_school_admin(school_id));
create policy timetable_admin_update on public.timetable_entries for update using (public.is_school_admin(school_id)) with check (public.is_school_admin(school_id));
create policy timetable_admin_delete on public.timetable_entries for delete using (public.is_school_admin(school_id));

create policy calendar_select on public.calendar_events for select using (
  school_id=public.current_school_id() and
  (public.is_school_admin(school_id) or public.can_manage_class_content(school_id,class_id) or
   (is_published=true and published_at is not null and published_at<=pg_catalog.now() and
    (class_id is null or public.is_class_student(school_id,class_id))))
);
create policy calendar_staff_insert on public.calendar_events for insert with check (
  school_id=public.current_school_id() and creator_id=auth.uid() and
  (class_id is null and public.is_school_admin(school_id) or public.can_manage_class_content(school_id,class_id))
);
create policy calendar_staff_update on public.calendar_events for update using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (creator_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
) with check (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (creator_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);
create policy calendar_staff_delete on public.calendar_events for delete using (
  school_id=public.current_school_id() and (
    (class_id is null and public.is_school_admin(school_id)) or
    (creator_id=auth.uid() and public.can_manage_class_content(school_id,class_id))
  )
);

-- Discussions: participants and class representatives have moderation only in their class.
create policy topics_select on public.discussion_topics for select using (
  school_id=public.current_school_id() and
  (public.is_class_student(school_id,class_id) or public.can_manage_class_content(school_id,class_id))
);
create policy topics_insert on public.discussion_topics for insert with check (
  school_id=public.current_school_id() and author_id=auth.uid() and
  (public.is_class_student(school_id,class_id) or public.can_manage_class_content(school_id,class_id))
);
create policy topics_update on public.discussion_topics for update using (
  school_id=public.current_school_id() and
  (author_id=auth.uid() or public.can_moderate_class_discussions(school_id,class_id))
) with check (
  school_id=public.current_school_id() and
  (author_id=auth.uid() or public.can_moderate_class_discussions(school_id,class_id))
);
create policy topics_delete on public.discussion_topics for delete using (
  school_id=public.current_school_id() and
  (author_id=auth.uid() or public.can_moderate_class_discussions(school_id,class_id))
);

create policy replies_select on public.discussion_replies for select using (
  school_id=public.current_school_id() and exists (
    select 1 from public.discussion_topics t
    where t.id=discussion_replies.topic_id and
      (public.is_class_student(t.school_id,t.class_id) or public.can_manage_class_content(t.school_id,t.class_id))
  )
);
create policy replies_insert on public.discussion_replies for insert with check (
  school_id=public.current_school_id() and author_id=auth.uid() and exists (
    select 1 from public.discussion_topics t
    where t.id=discussion_replies.topic_id and t.school_id=school_id and not t.is_locked and
      (public.is_class_student(t.school_id,t.class_id) or public.can_manage_class_content(t.school_id,t.class_id))
  )
);
create policy replies_update on public.discussion_replies for update using (
  school_id=public.current_school_id() and (author_id=auth.uid() or exists (
    select 1 from public.discussion_topics t
    where t.id=discussion_replies.topic_id and public.can_moderate_class_discussions(t.school_id,t.class_id)
  ))
) with check (school_id=public.current_school_id());
create policy replies_delete on public.discussion_replies for delete using (
  school_id=public.current_school_id() and (author_id=auth.uid() or exists (
    select 1 from public.discussion_topics t
    where t.id=discussion_replies.topic_id and public.can_moderate_class_discussions(t.school_id,t.class_id)
  ))
);

-- Moderation reports
create policy reports_select on public.content_reports for select using (
  school_id=public.current_school_id() and
  (reporter_id=auth.uid() or public.is_school_admin(school_id))
);
create policy reports_insert on public.content_reports for insert with check (
  school_id=public.current_school_id() and reporter_id=auth.uid()
);
create policy reports_admin_update on public.content_reports for update using (
  public.is_school_admin(school_id)
) with check (public.is_school_admin(school_id));
create policy reports_admin_delete on public.content_reports for delete using (
  public.is_school_admin(school_id)
);

-- Private notifications
create policy notifications_select on public.notifications for select using (user_id=auth.uid());
create policy notifications_update_own on public.notifications for update using (user_id=auth.uid()) with check (user_id=auth.uid());
drop policy if exists notifications_delete_own on public.notifications;
create policy notifications_delete_own on public.notifications for delete using (user_id=auth.uid());

create or replace function public.create_notification(target_user uuid, target_school uuid, notification_title text, notification_body text default null, notification_link text default null)
returns uuid language plpgsql security definer set search_path='' as $$
declare
  notification_id uuid;
begin
  if target_user is null or target_school is null then raise exception 'Notification recipient and school are required'; end if;
  if not public.is_platform_admin() and not public.is_school_admin(target_school) then
    raise exception 'Only authorized school or platform administrators may create notifications';
  end if;
  if notification_title is null or btrim(notification_title)='' then raise exception 'Notification title is required'; end if;
  if not exists (select 1 from public.profiles p where p.id=target_user and p.school_id=target_school) then
    raise exception 'Notification recipient does not belong to the target school';
  end if;
  insert into public.notifications(school_id,user_id,title,body,link,is_read)
  values(target_school,target_user,btrim(notification_title),nullif(btrim(notification_body),''),nullif(btrim(notification_link),''),false)
  returning id into notification_id;
  return notification_id;
end;
$$;

-- School administration operations are also restricted to server-side functions.
create or replace function public.update_managed_class(target_class uuid, new_name text default null, new_section text default null, new_level text default null)
returns void language plpgsql security definer set search_path='' as $$
declare
  c public.classes%rowtype;
  resolved_name text;
  resolved_section text;
begin
  select * into c from public.classes where id=target_class;
  if c.id is null then raise exception 'Class does not exist'; end if;
  if not public.is_school_admin(c.school_id) then raise exception 'Not authorized'; end if;
  if new_name is not null and length(trim(new_name)) < 1 then raise exception 'Class name is required'; end if;
  resolved_name := coalesce(nullif(trim(new_name),''),c.name);
  resolved_section := case when new_section is null then c.section else nullif(trim(new_section),'') end;
  if exists (
    select 1 from public.classes x
    where x.id<>target_class and x.school_id=c.school_id
      and lower(x.name)=lower(resolved_name)
      and coalesce(lower(x.section),'')=coalesce(lower(resolved_section),'')
  ) then raise exception 'Another class already uses this name and section'; end if;
  update public.classes set
    name=coalesce(nullif(trim(new_name),''),name),
    section=case when new_section is null then section else nullif(trim(new_section),'') end,
    level=case when new_level is null then level else nullif(trim(new_level),'') end
  where id=target_class;
end; $$;

create or replace function public.set_managed_class_status(target_class uuid, active boolean, accepting boolean default null)
returns void language plpgsql security definer set search_path='' as $$
declare c public.classes%rowtype; begin
  select * into c from public.classes where id=target_class;
  if c.id is null then raise exception 'Class does not exist'; end if;
  if not public.is_school_admin(c.school_id) then raise exception 'Not authorized'; end if;
  update public.classes set is_active=active,
    accepting_registrations=case when not active then false when accepting is null then true else accepting end
  where id=target_class;
end; $$;

create or replace function public.set_school_status(target_school uuid, new_status public.school_lifecycle_type)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.is_platform_admin() then raise exception 'Only a platform administrator may change school status'; end if;
  if target_school is null then raise exception 'School is required'; end if;
  if new_status='active' and not exists (
    select 1 from public.school_roles sr join public.profiles p on p.id=sr.user_id
    where sr.school_id=target_school and sr.role='school_admin' and sr.status='active'
      and p.school_id=target_school and p.status='active'
  ) then raise exception 'An active school must have a valid active School Admin'; end if;
  update public.schools
  set lifecycle_status=new_status,
      status=case new_status::text
        when 'active' then 'active'::public.school_status_type
        when 'suspended' then 'suspended'::public.school_status_type
        when 'deactivated' then 'deactivated'::public.school_status_type
        else 'pending'::public.school_status_type
      end,
      updated_at=pg_catalog.now()
  where id=target_school;
end; $$;

create or replace function public.platform_school_statistics()
returns table(school_id uuid, school_name text, school_status public.school_lifecycle_type, student_count bigint, teacher_count bigint, class_count bigint)
language sql stable security definer set search_path='' as $$
  select s.id,s.name,s.lifecycle_status,
    (select count(*) from public.school_roles sr where sr.school_id=s.id and sr.role::text='student' and sr.status='active'),
    (select count(*) from public.school_roles sr where sr.school_id=s.id and sr.role::text='teacher' and sr.status='active'),
    (select count(*) from public.classes c where c.school_id=s.id)
  from public.schools s
  where public.is_platform_admin();
$$;

create or replace function public.list_school_classes_safe()
returns table(class_id uuid,class_name text,class_section text,class_level text,is_active boolean,student_count bigint)
language sql stable security definer set search_path='' as $$
  select c.id,c.name,c.section,c.level,c.is_active,
    (select count(*) from public.class_memberships cm where cm.class_id=c.id and cm.role='student')
  from public.classes c
  where c.school_id=public.current_school_id()
    and (public.is_school_admin(c.school_id) or public.is_class_member(c.school_id,c.id))
$$;

create or replace function public.list_managed_class_codes(target_school uuid)
returns table(class_id uuid,class_name text,class_section text,class_code text,is_active boolean)
language sql stable security definer set search_path='' as $$
  select c.id,c.name,c.section,c.class_code,c.is_active
  from public.classes c
  where public.is_school_admin(target_school) and c.school_id=target_school
$$;

-- Safe directory view: only public identity fields and no bypass of RLS.
drop view if exists public.school_directory_profiles;
create view public.school_directory_profiles with (security_invoker=true) as
  select p.id,p.school_id,p.full_name,p.avatar_url
  from public.profiles p;

create or replace function public.my_profile()
returns table(profile_id uuid, school_id uuid, full_name text, email text, avatar_url text, status text)
language sql stable security definer set search_path='' as $$
  select p.id,p.school_id,p.full_name,p.email,p.avatar_url,p.status
  from public.profiles p
  where p.id=auth.uid()
$$;

create or replace function public.school_admin_profile_directory(target_school uuid)
returns table(profile_id uuid, full_name text, email text, avatar_url text, status text)
language sql stable security definer set search_path='' as $$
  select p.id,p.full_name,p.email,p.avatar_url,p.status
  from public.profiles p
  where p.school_id=target_school
    and public.is_school_admin(target_school)
$$;

create or replace function public.platform_profile_directory()
returns table(profile_id uuid, school_id uuid, full_name text, email text, avatar_url text, status text)
language sql stable security definer set search_path='' as $$
  select p.id,p.school_id,p.full_name,p.email,p.avatar_url,p.status
  from public.profiles p
  where public.is_platform_admin()
$$;

-- Direct writes to protected privilege tables are disabled.
revoke all on public.platform_admins from public,anon,authenticated;
revoke all on public.school_roles from public,anon,authenticated;
-- Explicitly remove every custom-table privilege from Supabase default roles before granting only needed operations.
revoke all on public.schools from authenticated;
revoke all on public.profiles from authenticated;
revoke all on public.school_registrations from authenticated;
revoke all on public.classes from authenticated;
revoke all on public.class_memberships from authenticated;
revoke all on public.assignments from authenticated;
revoke all on public.assignment_submissions from authenticated;
revoke all on public.announcements from authenticated;
revoke all on public.resources from authenticated;
revoke all on public.timetable_entries from authenticated;
revoke all on public.calendar_events from authenticated;
revoke all on public.discussion_topics from authenticated;
revoke all on public.discussion_replies from authenticated;
revoke all on public.content_reports from authenticated;
revoke all on public.notifications from authenticated;
-- Explicitly remove table/column privileges that Supabase default grants may have provided.
revoke all on public.schools from public,anon;
revoke all on public.profiles from public,anon;
revoke all on public.school_registrations from public,anon;
revoke all on public.classes from public,anon;
revoke all on public.class_memberships from public,anon;
revoke all on public.assignments from public,anon;
revoke all on public.assignment_submissions from public,anon;
revoke all on public.announcements from public,anon;
revoke all on public.resources from public,anon;
revoke all on public.timetable_entries from public,anon;
revoke all on public.calendar_events from public,anon;
revoke all on public.discussion_topics from public,anon;
revoke all on public.discussion_replies from public,anon;
revoke all on public.content_reports from public,anon;
revoke all on public.notifications from public,anon;
revoke insert,update,delete on public.profiles from anon,authenticated;
revoke update on public.profiles from authenticated;
grant update(full_name,avatar_url) on public.profiles to authenticated;
revoke select on public.profiles from public,anon,authenticated;
grant select(id,school_id,full_name,avatar_url,created_at) on public.profiles to authenticated;
revoke insert,update,delete on public.classes from public,anon,authenticated;
revoke insert,update,delete on public.school_registrations from public,anon,authenticated;

-- Users may read only non-secret class information directly. Class codes require an admin-only function.
revoke select on public.classes from public,anon,authenticated;
grant select(id,school_id,name,section,level,teacher_id,accepting_registrations,is_active,created_at) on public.classes to authenticated;
grant select on public.school_roles to authenticated;
grant select(id,school_id,full_name,avatar_url) on public.school_directory_profiles to authenticated;
grant select on public.schools to authenticated;
grant select on public.class_memberships to authenticated;
grant select,insert,update,delete on public.assignments to authenticated;
grant select,insert,update,delete on public.assignment_submissions to authenticated;
grant select,insert,update,delete on public.announcements to authenticated;
grant select,insert,update,delete on public.resources to authenticated;
grant select,insert,update,delete on public.timetable_entries to authenticated;
grant select,insert,update,delete on public.calendar_events to authenticated;
grant select,insert,update,delete on public.discussion_topics to authenticated;
grant select,insert,update,delete on public.discussion_replies to authenticated;
grant select,insert,update,delete on public.content_reports to authenticated;
revoke insert,update,delete on public.notifications from authenticated;
grant select on public.notifications to authenticated;
grant update(is_read) on public.notifications to authenticated;
grant delete on public.notifications to authenticated;
revoke select on public.school_registrations from public,anon,authenticated;
grant select(id,school_name,official_email,address,logo_url,requested_by,requested_admin_name,requested_admin_email,proposed_code,status,reviewed_by,reviewed_at,school_id,created_at) on public.school_registrations to authenticated;

-- Privileged and trigger functions cannot be called directly unless explicitly granted below.
revoke all on function public.handle_new_user() from public,anon,authenticated;
revoke all on function public.create_notification(uuid,uuid,text,text,text) from public,anon;
revoke all on function public.approve_school_registration(uuid) from public,anon;
revoke all on function public.reject_school_registration(uuid,text) from public,anon;
revoke all on function public.assign_school_admin(uuid,uuid) from public,anon;
revoke all on function public.set_school_status(uuid,public.school_lifecycle_type) from public,anon,authenticated;
revoke all on function public.platform_school_statistics() from public,anon;
revoke all on function public.create_managed_class(uuid,text,text,text) from public,anon;
revoke all on function public.update_managed_class(uuid,text,text,text) from public,anon;
revoke all on function public.regenerate_class_code(uuid) from public,anon;
revoke all on function public.set_managed_class_status(uuid,boolean,boolean) from public,anon;
revoke all on function public.generate_school_code(text) from public,anon,authenticated;
revoke all on function public.generate_class_code(uuid,text,text) from public,anon,authenticated;
revoke all on function public.approve_teacher(uuid,uuid) from public,anon;
revoke all on function public.assign_class_representative(uuid,uuid,uuid) from public,anon;
revoke all on function public.assign_managed_class_teacher(uuid,uuid) from public,anon,authenticated;
revoke all on function public.submit_school_registration(text,text,text,text,text) from public,anon;
revoke all on function public.list_managed_class_codes(uuid) from public,anon;
revoke all on function public.list_school_classes_safe() from public,anon;

grant execute on function public.submit_school_registration(text,text,text,text,text) to authenticated;
grant execute on function public.create_notification(uuid,uuid,text,text,text) to authenticated;
grant execute on function public.create_managed_class(uuid,text,text,text) to authenticated;
grant execute on function public.regenerate_class_code(uuid) to authenticated;
grant execute on function public.approve_teacher(uuid,uuid) to authenticated;
grant execute on function public.assign_class_representative(uuid,uuid,uuid) to authenticated;
grant execute on function public.assign_managed_class_teacher(uuid,uuid) to authenticated;
grant execute on function public.approve_school_registration(uuid) to authenticated;
grant execute on function public.reject_school_registration(uuid,text) to authenticated;
grant execute on function public.assign_school_admin(uuid,uuid) to authenticated;
grant execute on function public.update_managed_class(uuid,text,text,text) to authenticated;
grant execute on function public.set_managed_class_status(uuid,boolean,boolean) to authenticated;
grant execute on function public.set_school_status(uuid,public.school_lifecycle_type) to authenticated;
grant execute on function public.platform_school_statistics() to authenticated;
grant execute on function public.list_managed_class_codes(uuid) to authenticated;
grant execute on function public.list_school_classes_safe() to authenticated;
grant execute on function public.my_profile() to authenticated;
grant execute on function public.school_admin_profile_directory(uuid) to authenticated;
grant execute on function public.platform_profile_directory() to authenticated;

-- RLS helper functions are callable by authenticated users but remain authorization-aware.
revoke execute on function public.is_platform_admin() from public,anon;
revoke execute on function public.current_school_id() from public,anon;
revoke execute on function public.is_school_admin(uuid) from public,anon;
revoke execute on function public.has_active_school_role(uuid,text) from public,anon;
revoke execute on function public.can_manage_class(uuid,uuid) from public,anon;
revoke execute on function public.can_manage_class_content(uuid,uuid) from public,anon;
revoke execute on function public.is_class_member(uuid,uuid) from public,anon;
revoke execute on function public.is_class_student(uuid,uuid) from public,anon;
revoke execute on function public.can_moderate_class_discussions(uuid,uuid) from public,anon;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.current_school_id() to authenticated;
grant execute on function public.is_school_admin(uuid) to authenticated;
grant execute on function public.has_active_school_role(uuid,text) to authenticated;
grant execute on function public.can_manage_class(uuid,uuid) to authenticated;
grant execute on function public.can_manage_class_content(uuid,uuid) to authenticated;
grant execute on function public.is_class_member(uuid,uuid) to authenticated;
grant execute on function public.is_class_student(uuid,uuid) to authenticated;
grant execute on function public.can_moderate_class_discussions(uuid,uuid) to authenticated;

revoke execute on function public.my_profile() from public,anon;
revoke execute on function public.school_admin_profile_directory(uuid) from public,anon;
revoke execute on function public.platform_profile_directory() from public,anon;
revoke execute on function public.list_managed_class_codes(uuid) from public,anon;
revoke execute on function public.list_managed_class_codes(uuid) from public,anon;
-- Final migration verification. These checks are diagnostic and fail closed for preservation-critical invariants.
do $$
declare
  v_table text;
  v_missing text;
  v_count integer;
begin
  foreach v_table in array array[
    'schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships',
    'assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events',
    'discussion_topics','discussion_replies','content_reports','notifications'
  ] loop
    if not exists (
      select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname=v_table and c.relrowsecurity
    ) then raise exception 'RLS is not enabled on public.%',v_table; end if;
  end loop;

  for v_missing in select unnest(array[
    'schools_select','profiles_select','roles_select','classes_select','memberships_select','assignments_select',
    'submissions_select','announcements_select','resources_select','timetable_select','calendar_select','topics_select',
    'replies_select','reports_select','notifications_select'
  ]) loop
    if not exists (select 1 from pg_policies p where p.schemaname='public' and p.policyname=v_missing) then
      raise exception 'Expected migration policy % is missing',v_missing;
    end if;
  end loop;

  if not exists (select 1 from public.schools where name='International Unity School' and code='SHS-IUS-2026') then
    raise exception 'International Unity School SHS-IUS-2026 preservation check failed';
  end if;

  select count(*) into v_count from public.schools where code='SHS-IUS-2026';
  if v_count<>1 then raise exception 'SHS-IUS-2026 is duplicated or missing'; end if;

  select count(*) into v_count
  from public.classes c join public.schools s on s.id=c.school_id
  where s.code='SHS-IUS-2026' and c.class_code is null;
  if v_count<>0 then raise exception 'An IUS class has no registration code'; end if;

  if not exists (
    select 1 from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026' and c.name='SS 1' and c.section='Dynamo'
      and c.class_code='IUS-SS1-DYN-2026'
  ) then raise exception 'SS1 Dynamo class or registration code changed'; end if;
  if not exists (
    select 1 from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026' and c.name='SS 1' and c.section='Horizon'
      and c.class_code='IUS-SS1-HOR-2026'
  ) then raise exception 'SS1 Horizon class or registration code changed'; end if;

  select count(*) into v_count
  from (
    select c.name,c.section
    from public.classes c join public.schools s on s.id=c.school_id
    where s.code='SHS-IUS-2026'
      and (
        (c.name='Primary 1' and c.section is null) or (c.name='Primary 2' and c.section is null)
        or (c.name='Primary 3' and c.section is null) or (c.name='Primary 4' and c.section is null)
        or (c.name='Primary 5' and c.section is null) or (c.name='Primary 6' and c.section is null)
        or (c.name='JSS 1' and c.section is null) or (c.name='JSS 2' and c.section is null)
        or (c.name='JSS 3' and c.section is null) or (c.name='SS 1' and c.section='Dynamo')
        or (c.name='SS 1' and c.section='Horizon') or (c.name='SS 2' and c.section is null)
        or (c.name='SS 3' and c.section is null)
      )
  ) expected_classes;
  if v_count<13 then raise exception 'Fewer than the 13 expected IUS classes remain: %',v_count; end if;

  select count(*) into v_count
  from (select school_id,lower(name),coalesce(lower(section),'') from public.classes group by school_id,lower(name),coalesce(lower(section),'') having count(*)>1) d;
  if v_count<>0 then raise exception 'Duplicate class name/section records exist'; end if;

  select count(*) into v_count from pg_policies p
  where p.schemaname='public' and p.tablename='profiles';
  if v_count=0 then raise exception 'No profiles RLS policies exist'; end if;

  if exists (
    select 1 from pg_proc pr join pg_namespace n on n.oid=pr.pronamespace
    where n.nspname='public' and pr.proname in (
      'approve_school_registration','reject_school_registration','assign_school_admin','set_school_status',
      'platform_school_statistics','create_managed_class','update_managed_class','regenerate_class_code',
      'set_managed_class_status','assign_managed_class_teacher'
    ) and has_function_privilege('PUBLIC', pr.oid, 'EXECUTE')
  ) then raise exception 'A privileged administration function remains executable by PUBLIC'; end if;

  raise notice 'School Hub migration verification completed';
end;
$$;
