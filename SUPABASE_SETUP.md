# Supabase Database Setup Guide

## 1. Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project:
   - Project name: `bathhouse-studio`
   - Database password: (save this securely!)
   - Region: Choose closest to your users

## 2. Get Database Credentials

1. In Supabase dashboard, go to Settings → Database
2. Copy the "Connection string" (URI)
3. It will look like:

   ```env
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

## 3. Environment Variables

### For Local Development

Keep using SQLite in `.env`:

```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./bathhouse.db"
```

### For Vercel Production

Add these environment variables in Vercel dashboard:

```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="your-supabase-connection-string"
```

## 4. Deploy Database Schema

### Option A: Using Prisma Migrate (Recommended)

```bash
# Set production environment variables temporarily
export DATABASE_PROVIDER="postgresql"
export DATABASE_URL="your-supabase-connection-string"

# Push schema to Supabase
npm run db:push

# Generate Prisma client
npm run db:generate
```

### Option B: Using Supabase SQL Editor

1. Generate SQL from Prisma:

   ```bash
   npx prisma migrate dev --create-only --name init
   ```

2. Copy the SQL from `prisma/migrations/*/migration.sql`
3. Run in Supabase SQL Editor

## 5. Migrate Data to Supabase

Run this script after setting up the database:

```bash
# Set production database URL
export DATABASE_URL="your-supabase-connection-string"
export DATABASE_PROVIDER="postgresql"

# Run migration
npm run db:seed
```

## 6. Vercel Deployment

1. Push your branch to GitHub
2. In Vercel:
   - Import project or create preview deployment
   - Add environment variables:

     ```env
     DATABASE_PROVIDER=postgresql
     DATABASE_URL=your-supabase-connection-string
     ```

3. Deploy!

## 7. Connection Pooling (Optional but Recommended)

For better performance, use Supabase's connection pooler:

1. In Supabase dashboard, go to Settings → Database
2. Find "Connection Pooling" section
3. Use the "Connection pooling" connection string
4. Add `?pgbouncer=true` to the URL:

   ```env
   postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true
   ```

## Troubleshooting

### "Too many connections" error

- Use the connection pooling URL
- Reduce `max` connections in Prisma schema

### Schema sync issues

- Run `npm run db:push` to sync schema
- Check Supabase logs for errors

### Data not persisting

- Verify DATABASE_URL in Vercel env vars
- Check Supabase dashboard for data

## Security Notes

1. **Never commit** database credentials to Git
2. Use Vercel environment variables for production
3. Enable Row Level Security (RLS) in Supabase for added security
4. Regularly backup your database using Supabase's backup feature
