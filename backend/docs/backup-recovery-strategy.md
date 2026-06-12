# CS Studio - Database Backup & Recovery Strategy

## Overview
This document outlines the backup and recovery strategy for CS Studio's production database infrastructure. The platform uses Supabase (PostgreSQL) as its primary database with a legacy MongoDB instance for discussions, notifications, and ratings.

## Backup Types

### 1. Continuous Backup (Automatic)
- **Supabase Point-in-Time Recovery (PITR)**: Enabled on Pro plan and above. Provides continuous archiving of WAL logs with ability to restore to any point within the retention period (7 days on Pro, 28 days on Team plan).
- **No action required**: PITR is managed by Supabase infrastructure.

### 2. Daily Backups (Automatic)
- **Supabase Daily Backups**: Automatic daily snapshots retained for 7 days (Pro plan).
- **Backup window**: Configurable in Supabase dashboard (Database > Backups).
- **Includes**: All tables, schemas, indexes, and configurations.

### 3. Manual / On-Demand Backups

#### Database Schema + Data (Recommended for migrations)
```bash
# Full database dump (excluding auth schema - managed by Supabase)
pg_dump \
  --host=$SUPABASE_DB_HOST \
  --port=5432 \
  --username=$SUPABASE_DB_USER \
  --dbname=$SUPABASE_DB_NAME \
  --schema=public \
  --format=custom \
  --file=cs-studio-backup-$(date +%Y%m%d).dump

# Restore from custom format dump
pg_restore \
  --host=$SUPABASE_DB_HOST \
  --port=5432 \
  --username=$SUPABASE_DB_USER \
  --dbname=$SUPABASE_DB_NAME \
  --clean \
  --if-exists \
  cs-studio-backup-20240101.dump
```

#### Schema Only (Version-controlled)
```bash
pg_dump \
  --host=$SUPABASE_DB_HOST \
  --port=5432 \
  --username=$SUPABASE_DB_USER \
  --dbname=$SUPABASE_DB_NAME \
  --schema=public \
  --schema-only \
  --no-owner \
  > schema-backup-$(date +%Y%m%d).sql
```

## Automated Backup Script

Create a GitHub Actions workflow or cron job for automated backups:

```yaml
# .github/workflows/database-backup.yml
name: Database Backup
on:
  schedule:
    - cron: '0 3 * * *'  # Daily at 3 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install pg_dump
        run: sudo apt-get install -y postgresql-client
      
      - name: Create database dump
        run: |
          pg_dump \
            --host="${{ secrets.SUPABASE_DB_HOST }}" \
            --port="5432" \
            --username="${{ secrets.SUPABASE_DB_USER }}" \
            --dbname="${{ secrets.SUPABASE_DB_NAME }}" \
            --schema=public \
            --format=custom \
            --file=backup.dump
      
      - name: Upload to cloud storage
        uses: actions/upload-artifact@v4
        with:
          name: database-backup-${{ github.run_id }}
          path: backup.dump
          retention-days: 30
```

## Recovery Procedures

### Scenario A: Accidental Data Deletion
1. Identify the approximate time of the incident.
2. Use Supabase Dashboard: Database > Backups > Restore.
3. Select the PITR target time (before the incident).
4. Confirm restore (creates a new database instance).
5. Export the affected rows and import to production.

### Scenario B: Schema Corruption
1. Restore from the most recent daily backup.
2. If daily backup is insufficient, use PITR to the last known good state.
3. Run schema migration scripts to catch up to current version.

### Scenario C: Full Disaster Recovery
1. Provision a new Supabase project.
2. Restore the latest `.dump` file using pg_restore.
3. Update environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
4. Verify data integrity with test queries.
5. Deploy application pointing to the new database.

## Verification Checklist

Run these checks after any restore:

```sql
-- 1. Check row counts match expected
SELECT 'users' as tbl, count(*) from public.users
UNION ALL
SELECT 'courses', count(*) from public.courses
UNION ALL
SELECT 'problems', count(*) from public.problems
UNION ALL
SELECT 'progress', count(*) from public.progress;

-- 2. Verify RLS policies are intact
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
ORDER BY tablename;

-- 3. Check indexes exist
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename;

-- 4. Verify triggers exist
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

## Retention Policy

| Backup Type | Retention | Storage Location |
|---|---|---|
| Supabase PITR (Pro) | 7 days | Supabase managed |
| Supabase Daily | 7 days | Supabase managed |
| Manual pg_dump | 30 days | GitHub Actions artifacts |
| Schema dumps | Permanent | Git repository |

## Monitoring & Alerts

- Monitor Supabase dashboard for backup failures.
- Set up UptimeRobot or similar to monitor `/api/health` endpoint.
- Configure Sentry alerts for database connection errors.
- Add database monitoring query to the health check endpoint:

```javascript
// Add to health check response
const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
```

## Legacy MongoDB

For the MongoDB instance (discussions, notifications, ratings):

```bash
# Backup
mongodump --uri="$MONGODB_URI" --out=./mongodb-backup-$(date +%Y%m%d)

# Restore
mongorestore --uri="$MONGODB_URI" ./mongodb-backup-20240101
```

## Recommendations

1. **Test restores quarterly** - Practice recovery in a staging environment.
2. **Automate schema migrations** - All schema changes should be SQL files in `backend/supabase/`.
3. **Enable PITR immediately** on the Supabase project (requires Pro plan).
4. **Document credentials** in the team password manager, not in code.
5. **Set up monitoring alerts** for database connection pool exhaustion.
