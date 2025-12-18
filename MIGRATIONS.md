# Database Migrations Guide

This document explains how to handle database migrations for development and production.

## Overview

This project uses Prisma ORM with:
- **SQLite** for local development (simple, no setup needed)
- **PostgreSQL** for production on Vercel (required for serverless)

## Local Development (SQLite)

### First Time Setup

```bash
# 1. Create .env file
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="local-dev-secret"

# 2. Push schema to SQLite database
npm run db:push

# 3. Seed the database
npm run db:seed

# 4. Start development
npm run dev
```

### Making Schema Changes

When you modify `prisma/schema.prisma`:

```bash
# Push changes to database (no migration files)
npm run db:push

# View database in GUI
npm run db:studio
```

**Note**: For local development, `db:push` is sufficient. You don't need migrations for SQLite.

## Production Deployment (PostgreSQL)

### Initial Deployment

1. **Set up PostgreSQL database** (see DEPLOYMENT.md)

2. **Add DATABASE_URL to Vercel**:
   ```
   postgresql://user:pass@host.region.provider.com:5432/db?sslmode=require
   ```

3. **Deploy to Vercel**:
   - Vercel will automatically run `prisma migrate deploy` during build
   - This is configured in the `build` script in `package.json`

4. **Seed the database**:
   ```bash
   # Via Vercel CLI
   vercel env pull .env.local
   npm run db:seed
   ```

### Creating Migrations for Production

If you need to create migration files (for complex schema changes):

```bash
# Option 1: Create migration locally (requires temp PostgreSQL URL)
DATABASE_URL="postgresql://localhost:5432/tempdb" npx prisma migrate dev --name your_migration_name

# Option 2: Let Vercel handle it
# Just push your schema changes, Vercel will run migrations during build
```

### Applying Migrations in Production

Migrations are automatically applied during Vercel deployment via:
```json
"build": "prisma generate && prisma migrate deploy && next build"
```

## Migration Commands Reference

```bash
# Generate Prisma Client (auto-runs on npm install)
npx prisma generate

# Push schema changes without migrations (dev only)
npx prisma db push

# Create a new migration file
npx prisma migrate dev --name migration_name

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Common Scenarios

### Scenario 1: Adding a New Model

1. Add model to `prisma/schema.prisma`
2. Local dev: Run `npm run db:push`
3. Production: Push code, Vercel handles migration automatically

### Scenario 2: Modifying Existing Fields

1. Update field in `prisma/schema.prisma`
2. Local dev: Run `npm run db:push`
3. Production: Push code, deployment will handle migration

### Scenario 3: Database Needs Reset (Development)

```bash
# WARNING: This deletes all data
npx prisma migrate reset
npm run db:seed
```

### Scenario 4: Production Database Needs Seeding

```bash
# Via Vercel CLI
vercel link
vercel env pull .env.local
npm run db:seed

# Or via API endpoint (see QUICK_DEPLOY.md)
```

## Schema Provider Configuration

The `prisma/schema.prisma` uses PostgreSQL provider:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**For local SQLite development**:
- Use `DATABASE_URL="file:./dev.db"` in your `.env`
- Prisma will detect SQLite format and handle it appropriately

**For production PostgreSQL**:
- Use full PostgreSQL connection string
- Must include `?sslmode=require`

## Troubleshooting

### Error: "Prisma schema validation failed"

**Issue**: Wrong provider or URL format

**Solution**:
```bash
# Check your DATABASE_URL format
echo $DATABASE_URL

# For SQLite: file:./dev.db
# For PostgreSQL: postgresql://user:pass@host:5432/db
```

### Error: "Migration failed to apply"

**Issue**: Schema conflicts with existing data

**Solution**:
```bash
# Check migration status
npx prisma migrate status

# For development, reset if needed
npx prisma migrate reset

# For production, manually fix data conflicts
```

### Error: "Can't reach database server"

**Issue**: Database not accessible

**Solution**:
- Verify DATABASE_URL is correct
- Check if database service is running
- Ensure network/firewall allows connection
- Verify SSL mode for production databases

### Error: "Table already exists"

**Issue**: Migration already applied or manual table creation

**Solution**:
```bash
# Mark migrations as applied without running them
npx prisma migrate resolve --applied "migration_name"
```

## Best Practices

1. **Always test schema changes locally first**
   ```bash
   npm run db:push  # Test changes
   npm run db:seed  # Verify seed script still works
   ```

2. **Use descriptive migration names**
   ```bash
   npx prisma migrate dev --name add_user_roles
   npx prisma migrate dev --name add_order_status_field
   ```

3. **Keep migrations small and focused**
   - One feature per migration
   - Easier to debug and rollback if needed

4. **Test migrations on staging before production**
   - Use Vercel preview deployments
   - Verify data integrity after migration

5. **Backup production database before major changes**
   ```bash
   # For Neon/Supabase/Railway, use their backup features
   # Or use pg_dump
   pg_dump $DATABASE_URL > backup.sql
   ```

6. **Never edit migration files after they're applied**
   - Create a new migration instead
   - Editing can cause checksum mismatches

## Migration Strategy

### Development Flow
```
1. Edit schema.prisma
2. Run db:push (no migration files needed for dev)
3. Test changes locally
4. Commit schema.prisma to Git
```

### Production Flow
```
1. Push code to GitHub
2. Vercel detects changes
3. Runs: prisma generate && prisma migrate deploy
4. Migrations applied automatically
5. Next.js build completes
6. New version deployed
```

## Database URLs by Environment

### Local Development
```env
DATABASE_URL="file:./dev.db"
```

### Vercel Production (Neon)
```env
DATABASE_URL="postgresql://user:pass@host.region.neon.tech:5432/db?sslmode=require"
```

### Vercel Production (Supabase)
```env
DATABASE_URL="postgresql://postgres:pass@db.project.supabase.co:5432/postgres?pgbouncer=true"
```

### Vercel Production (Railway)
```env
DATABASE_URL="postgresql://postgres:pass@containers-us-west-123.railway.app:5432/railway?sslmode=require"
```

## Additional Resources

- [Prisma Migrate Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Vercel + Prisma Guide](https://vercel.com/guides/using-prisma-with-vercel)
- [PostgreSQL on Vercel](https://vercel.com/docs/storage/vercel-postgres)

---

**Questions?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

