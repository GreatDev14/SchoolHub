-- School Hub post-migration verification
-- READ-ONLY; run only in a disposable development project.
-- Structural results cannot prove runtime authorization.

WITH required(table_name) AS (VALUES
 ('schools'),('profiles'),('school_roles'),('platform_admins'),('school_registrations'),
 ('classes'),('class_memberships'),('assignments'),('assignment_submissions'),
 ('announcements'),('resources'),('timetable_entries'),('calendar_events'),
 ('discussion_topics'),('discussion_replies'),('content_reports'),('notifications'))
SELECT CASE WHEN count(*)=0 THEN 'PASS' ELSE 'FAIL' END AS result,
       'required_public_tables' AS check_name,
       coalesce(string_agg(r.table_name,'; ' ORDER BY r.table_name),'all 17 required tables exist') AS details
FROM required r
WHERE to_regclass('public.'||quote_ident(r.table_name)) IS NULL;

WITH required(table_name) AS (VALUES
 ('schools'),('profiles'),('school_roles'),('platform_admins'),('school_registrations'),
 ('classes'),('class_memberships'),('assignments'),('assignment_submissions'),
 ('announcements'),('resources'),('timetable_entries'),('calendar_events'),
 ('discussion_topics'),('discussion_replies'),('content_reports'),('notifications')),
checks AS (
 SELECT r.table_name,c.relkind,c.relrowsecurity,
        c.oid IS NOT NULL AS object_exists
 FROM required r
 LEFT JOIN pg_class c ON c.oid=to_regclass('public.'||quote_ident(r.table_name))
)
SELECT CASE WHEN bool_and(object_exists AND relkind IN ('r','p') AND relrowsecurity)
            THEN 'PASS' ELSE 'FAIL' END AS result,
       'required_tables_rls_enabled' AS check_name,
       coalesce(string_agg(CASE
         WHEN NOT object_exists THEN table_name||'=MISSING'
         WHEN relkind='p' AND NOT relrowsecurity THEN table_name||'=PARTITIONED_RLS_DISABLED'
         WHEN relkind='r' AND NOT relrowsecurity THEN table_name||'=TABLE_RLS_DISABLED'
         WHEN relkind NOT IN ('r','p') THEN table_name||'=NOT_TABLE_OR_PARTITIONED_TABLE'
         ELSE NULL END,'; ' ORDER BY table_name),
         'all required tables exist with RLS enabled') AS details
FROM checks;

-- Calendar publication metadata and every applicable permissive SELECT/ALL policy
SELECT CASE WHEN to_regclass('public.calendar_events') IS NULL THEN 'FAIL'
            WHEN EXISTS (SELECT 1 FROM information_schema.columns
                         WHERE table_schema='public' AND table_name='calendar_events'
                           AND column_name='is_published')
             AND EXISTS (SELECT 1 FROM information_schema.columns
                         WHERE table_schema='public' AND table_name='calendar_events'
                           AND column_name='published_at')
            THEN 'PASS' ELSE 'FAIL' END AS result,
       'calendar_publication_columns' AS check_name,
       'requires is_published and published_at' AS details;

DO $$
DECLARE v_count bigint;
BEGIN
 IF to_regclass('public.calendar_events') IS NULL THEN
  raise notice 'FAIL | calendar_backfill | public.calendar_events is missing'; RETURN;
 END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='calendar_events' AND column_name='is_published')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='calendar_events' AND column_name='published_at') THEN
  raise notice 'FAIL | calendar_backfill | required publication column missing'; RETURN;
 END IF;
 EXECUTE 'SELECT count(*) FROM public.calendar_events WHERE is_published=true AND published_at IS NULL' INTO v_count;
 raise notice '% | calendar_backfill | published_events_with_null_timestamp=%',CASE WHEN v_count=0 THEN 'PASS' ELSE 'FAIL' END,v_count;
END $$;

SELECT CASE WHEN to_regclass('public.calendar_events') IS NULL THEN 'FAIL'
            ELSE 'MANUAL REVIEW REQUIRED' END AS result,
       'calendar_select_all_policy_inventory' AS check_name,
       coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' ORDER BY p.policyname),
         CASE WHEN to_regclass('public.calendar_events') IS NULL THEN 'public.calendar_events is missing' ELSE 'no permissive SELECT/ALL policy found' END) AS details
FROM pg_policies p
WHERE p.schemaname='public' AND p.tablename='calendar_events'
  AND p.permissive='PERMISSIVE' AND p.cmd IN ('SELECT','ALL');

SELECT CASE WHEN to_regclass('public.calendar_events') IS NULL THEN 'FAIL'
            WHEN EXISTS (SELECT 1 FROM pg_policies p
                         WHERE p.schemaname='public' AND p.tablename='calendar_events'
                           AND p.permissive='PERMISSIVE' AND p.cmd IN ('SELECT','ALL')
                           AND (p.qual IS NULL OR btrim(p.qual)='' OR lower(btrim(p.qual))='true')) THEN 'FAIL'
            ELSE 'MANUAL REVIEW REQUIRED' END AS result,
       'calendar_unrestricted_policy_review' AS check_name,
       'NULL/TRUE permissive SELECT/ALL is broad. Permissive policies combine by OR; helper-function conditions require authenticated Student/Admin testing.' AS details;

-- School identity
DO $$
DECLARE v_code_count bigint; v_exact_count bigint;
BEGIN
 IF to_regclass('public.schools') IS NULL THEN raise notice 'FAIL | ius_school_identity | public.schools is missing'; RETURN; END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='schools' AND column_name='code')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='schools' AND column_name='name') THEN
  raise notice 'FAIL | ius_school_identity | required public.schools.name or code column missing'; RETURN;
 END IF;
 EXECUTE 'SELECT count(*) FROM public.schools WHERE code=''SHS-IUS-2026''' INTO v_code_count;
 EXECUTE 'SELECT count(*) FROM public.schools WHERE code=''SHS-IUS-2026'' AND name=''International Unity School''' INTO v_exact_count;
 raise notice '% | ius_school_identity | code_records=%; exact_name_code_records=%',CASE WHEN v_code_count=1 AND v_exact_count=1 THEN 'PASS' ELSE 'FAIL' END,v_code_count,v_exact_count;
 raise notice '% | ius_duplicate_school_code | extra_duplicate_records=%',CASE WHEN v_code_count<=1 THEN 'PASS' ELSE 'FAIL' END,greatest(v_code_count-1,0);
END $$;

-- Strict IUS seed verification: exact migration identities are listed explicitly
DO $$
DECLARE
 v_actual bigint:=0; v_missing bigint:=0; v_duplicates bigint:=0;
 v_wrong_code bigint:=0; v_wrong_level bigint:=0; v_unexpected bigint:=0; v_null_code bigint:=0;
BEGIN
 IF to_regclass('public.schools') IS NULL THEN raise notice 'FAIL | ius_seed | public.schools is missing'; RETURN; END IF;
 IF to_regclass('public.classes') IS NULL THEN raise notice 'FAIL | ius_seed | public.classes is missing'; RETURN; END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='schools' AND column_name='id')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='schools' AND column_name='code') THEN
  raise notice 'FAIL | ius_seed | required public.schools id/code column missing'; RETURN;
 END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='school_id')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='name')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='section')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='class_code')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='level') THEN
  raise notice 'FAIL | ius_seed | required public.classes school_id/name/section/class_code/level column missing'; RETURN;
 END IF;

 WITH expected(name,section,level,class_code) AS (VALUES
  ('Primary 1',NULL::text,'Primary','IUS-P1-2026'),('Primary 2',NULL::text,'Primary','IUS-P2-2026'),
  ('Primary 3',NULL::text,'Primary','IUS-P3-2026'),('Primary 4',NULL::text,'Primary','IUS-P4-2026'),
  ('Primary 5',NULL::text,'Primary','IUS-P5-2026'),('Primary 6',NULL::text,'Primary','IUS-P6-2026'),
  ('JSS 1',NULL::text,'Secondary','IUS-JSS1-2026'),('JSS 2',NULL::text,'Secondary','IUS-JSS2-2026'),
  ('JSS 3',NULL::text,'Secondary','IUS-JSS3-2026'),('SS 1','Dynamo','Secondary','IUS-SS1-DYN-2026'),
  ('SS 1','Horizon','Secondary','IUS-SS1-HOR-2026'),('SS 2',NULL::text,'Secondary','IUS-SS2-2026'),
  ('SS 3',NULL::text,'Secondary','IUS-SS3-2026')),
 actual AS (SELECT c.* FROM public.classes c JOIN public.schools s ON s.id=c.school_id WHERE s.code='SHS-IUS-2026'),
 counted AS (SELECT e.*, count(a.id) AS identity_count,
   count(a.id) FILTER (WHERE a.class_code IS DISTINCT FROM e.class_code) AS wrong_codes,
   count(a.id) FILTER (WHERE a.level IS DISTINCT FROM e.level) AS wrong_levels
  FROM expected e LEFT JOIN actual a ON a.name=e.name AND a.section IS NOT DISTINCT FROM e.section GROUP BY e.name,e.section,e.level,e.class_code)
 SELECT count(*) FILTER (WHERE identity_count=0),
        sum(identity_count-1) FILTER (WHERE identity_count>1),
        sum(wrong_codes),sum(wrong_levels)
 INTO v_missing,v_duplicates,v_wrong_code,v_wrong_level FROM counted;
 v_duplicates:=coalesce(v_duplicates,0); v_wrong_code:=coalesce(v_wrong_code,0); v_wrong_level:=coalesce(v_wrong_level,0);

 SELECT count(*) INTO v_actual FROM public.classes c JOIN public.schools s ON s.id=c.school_id WHERE s.code='SHS-IUS-2026';
 SELECT count(*) INTO v_null_code FROM public.classes c JOIN public.schools s ON s.id=c.school_id WHERE s.code='SHS-IUS-2026' AND c.class_code IS NULL;
 WITH expected(name,section) AS (VALUES
  ('Primary 1',NULL::text),('Primary 2',NULL::text),('Primary 3',NULL::text),('Primary 4',NULL::text),('Primary 5',NULL::text),('Primary 6',NULL::text),
  ('JSS 1',NULL::text),('JSS 2',NULL::text),('JSS 3',NULL::text),('SS 1','Dynamo'),('SS 1','Horizon'),('SS 2',NULL::text),('SS 3',NULL::text))
 SELECT count(*) INTO v_unexpected FROM public.classes c JOIN public.schools s ON s.id=c.school_id WHERE s.code='SHS-IUS-2026'
  AND NOT EXISTS (SELECT 1 FROM expected e WHERE c.name=e.name AND c.section IS NOT DISTINCT FROM e.section);

 raise notice '% | ius_missing_identity | missing_identity_count=%',CASE WHEN v_missing=0 THEN 'PASS' ELSE 'FAIL' END,v_missing;
 raise notice '% | ius_duplicate_identity | duplicate_extra_records=%',CASE WHEN v_duplicates=0 THEN 'PASS' ELSE 'FAIL' END,v_duplicates;
 raise notice '% | ius_wrong_class_code | wrong_code_rows=%',CASE WHEN v_wrong_code=0 THEN 'PASS' ELSE 'FAIL' END,v_wrong_code;
 raise notice '% | ius_wrong_level | wrong_level_rows=%',CASE WHEN v_wrong_level=0 THEN 'PASS' ELSE 'FAIL' END,v_wrong_level;
 raise notice '% | ius_unexpected_records | unexpected=%',CASE WHEN v_unexpected=0 THEN 'PASS' ELSE 'FAIL' END,v_unexpected;
 raise notice '% | ius_null_class_codes | null_codes=%',CASE WHEN v_null_code=0 THEN 'PASS' ELSE 'FAIL' END,v_null_code;
 raise notice '% | ius_exact_record_count | actual=%',CASE WHEN v_actual=13 AND v_missing=0 AND v_duplicates=0 AND v_wrong_code=0 AND v_wrong_level=0 AND v_unexpected=0 AND v_null_code=0 THEN 'PASS' ELSE 'FAIL' END,v_actual;
END $$;


DO $$
DECLARE v_count bigint:=0;
BEGIN
 IF to_regclass('public.classes') IS NULL THEN raise notice 'FAIL | class_code_collisions | public.classes is missing'; RETURN; END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='classes' AND column_name='class_code') THEN
  raise notice 'FAIL | class_code_collisions | public.classes.class_code is missing'; RETURN;
 END IF;
 EXECUTE 'SELECT count(*) FROM (SELECT class_code FROM public.classes WHERE class_code IS NOT NULL GROUP BY class_code HAVING count(*)>1) q' INTO v_count;
 raise notice '% | class_code_collisions | duplicate_code_values=%',CASE WHEN v_count=0 THEN 'PASS' ELSE 'FAIL' END,v_count;
END $$;

-- Notification privileges match the migration: no authenticated INSERT/table UPDATE/user_id UPDATE.
DO $$
DECLARE s boolean;i boolean;d boolean;tu boolean;ri boolean;yu boolean;
BEGIN
 IF to_regclass('public.notifications') IS NULL THEN raise notice 'FAIL | notification_privileges | public.notifications is missing'; RETURN; END IF;
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='notifications' AND column_name='user_id')
 OR NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='notifications' AND column_name='is_read') THEN
  raise notice 'FAIL | notification_privileges | required user_id/is_read column missing'; RETURN;
 END IF;
 s:=has_table_privilege('authenticated','public.notifications','SELECT');
 i:=has_table_privilege('authenticated','public.notifications','INSERT');
 d:=has_table_privilege('authenticated','public.notifications','DELETE');
 tu:=has_table_privilege('authenticated','public.notifications','UPDATE');
 ri:=has_column_privilege('authenticated','public.notifications','is_read','UPDATE');
 yu:=has_column_privilege('authenticated','public.notifications','user_id','UPDATE');
 raise notice '% | notification_privileges | SELECT=%; INSERT=%; DELETE=%; table_UPDATE=%; UPDATE(is_read)=%; UPDATE(user_id)=%',
  CASE WHEN s AND NOT i AND d AND NOT tu AND ri AND NOT yu THEN 'PASS' ELSE 'FAIL' END,
  s,i,d,tu,ri,yu;
END $$;

-- Policy expression inventories; permissive policies combine with OR
SELECT 'MANUAL REVIEW REQUIRED' AS result,'full_school_hub_policy_inventory' AS check_name,
 coalesce(string_agg(p.tablename||'.'||p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' ORDER BY p.tablename,p.policyname),'no School Hub policies found') AS details
FROM pg_policies p WHERE p.schemaname='public'
AND p.tablename IN ('schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships','assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events','discussion_topics','discussion_replies','content_reports','notifications');

SELECT 'MANUAL REVIEW REQUIRED' AS result,'notification_policy_expressions' AS check_name,
 coalesce(string_agg(p.policyname||'; roles='||array_to_string(p.roles,',')||'; cmd='||p.cmd||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' ORDER BY p.policyname),
  CASE WHEN to_regclass('public.notifications') IS NULL THEN 'public.notifications is missing' ELSE 'no notification policies found' END) AS details
FROM pg_policies p WHERE p.schemaname='public' AND p.tablename='notifications';

-- Expected policy names from the migration
WITH expected(table_name,policy_name) AS (VALUES
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
SELECT CASE WHEN count(*)=0 THEN 'PASS' ELSE 'FAIL' END AS result,'expected_policy_names' AS check_name,
 coalesce(string_agg(e.table_name||'.'||e.policy_name,'; ' ORDER BY e.table_name,e.policy_name),'all migration-owned policy names exist') AS details
FROM expected e
WHERE to_regclass('public.'||quote_ident(e.table_name)) IS NULL
 OR NOT EXISTS (SELECT 1 FROM pg_policies p WHERE p.schemaname='public' AND p.tablename=e.table_name AND p.policyname=e.policy_name);

-- Unexpected policies are inventory findings, not automatic unsafe findings
WITH expected(table_name,policy_name) AS (VALUES
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
SELECT 'MANUAL REVIEW REQUIRED' AS result,'unexpected_school_hub_policy_inventory' AS check_name,
 coalesce(string_agg(p.tablename||'.'||p.policyname||'; cmd='||p.cmd||'; roles='||array_to_string(p.roles,',')||'; permissive='||p.permissive||'; qual='||coalesce(p.qual,'NULL')||'; with_check='||coalesce(p.with_check,'NULL'),' | ' ORDER BY p.tablename,p.policyname),'no unexpected policy found') AS details
FROM pg_policies p
WHERE p.schemaname='public'
AND p.tablename IN ('schools','profiles','school_roles','platform_admins','school_registrations','classes','class_memberships','assignments','assignment_submissions','announcements','resources','timetable_entries','calendar_events','discussion_topics','discussion_replies','content_reports','notifications')
AND NOT EXISTS (SELECT 1 FROM expected e WHERE e.table_name=p.tablename AND e.policy_name=p.policyname);
