# Environment Variables Setup

This file explains all environment variables needed for the Restaurant App.

## Local Development

Create a `.env` or `.env.local` file in the project root:

```env
# Database (SQLite for local development)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-for-local-dev"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Production (Vercel)

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Required Variables

1. **DATABASE_URL**
   - **Value**: PostgreSQL connection string
   - **Example**: `postgresql://username:password@host.region.neon.tech:5432/database?sslmode=require`
   - **Get from**: Neon, Supabase, Railway, or Vercel Postgres
   - **Note**: MUST use PostgreSQL, not SQLite

2. **NEXTAUTH_URL**
   - **Value**: Your deployed Vercel URL
   - **Example**: `https://your-app.vercel.app`
   - **Note**: Update this when using a custom domain

3. **NEXTAUTH_SECRET**
   - **Value**: A secure random string
   - **Generate with**: 
     ```bash
     openssl rand -base64 32
     ```
   - **Example**: `K7tT9xQ2mP4nR6vW8yB1cD3fG5hJ9kL0`
   - **Note**: Keep this secret and never commit to Git!

### Optional Variables (for Google OAuth)

4. **GOOGLE_CLIENT_ID**
   - **Value**: Your Google OAuth Client ID
   - **Get from**: [Google Cloud Console](https://console.cloud.google.com/)
   - **Example**: `123456789-abc123def456.apps.googleusercontent.com`

5. **GOOGLE_CLIENT_SECRET**
   - **Value**: Your Google OAuth Client Secret
   - **Get from**: Google Cloud Console
   - **Note**: Keep this secret!

## Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" or "Google Identity Services"
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client ID**
6. Choose **Web application**
7. Add authorized redirect URIs:
   - For production: `https://your-app.vercel.app/api/auth/callback/google`
   - For local dev: `http://localhost:3000/api/auth/callback/google`
8. Save and copy the Client ID and Client Secret
9. Add them to your `.env` (local) or Vercel Environment Variables (production)

## Database Setup

### For Local Development (SQLite)

```bash
# Use SQLite - no external setup needed
DATABASE_URL="file:./dev.db"

# Initialize database
npm run db:push
npm run db:seed
```

### For Production (PostgreSQL)

Choose one of these providers:

#### Option 1: Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add `?sslmode=require` at the end if not present

#### Option 2: Vercel Postgres
1. In Vercel Dashboard, go to Storage tab
2. Create a new Postgres database
3. Copy the `DATABASE_URL` from the .env tab
4. It will automatically be added to your project

#### Option 3: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the "Connection Pooling" connection string (better for serverless)

#### Option 4: Railway
1. Sign up at [railway.app](https://railway.app)
2. Create a new Postgres database
3. Copy the `DATABASE_URL` from Variables tab

## Vercel Environment Variables Configuration

When adding variables in Vercel:

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable with:
   - **Name**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

After adding all variables, trigger a new deployment:
- Either push a new commit to your repository
- Or go to Deployments tab and click "Redeploy"

## Security Best Practices

- ✅ Never commit `.env` files to Git
- ✅ Use different `NEXTAUTH_SECRET` for production and development
- ✅ Rotate secrets regularly
- ✅ Use environment-specific values
- ✅ Enable SSL for database connections (`?sslmode=require`)
- ✅ Keep production credentials secure

## Troubleshooting

### Error: "DATABASE_URL is not defined"
- Make sure you've added `DATABASE_URL` to Vercel environment variables
- Redeploy after adding variables

### Error: "Can't reach database server"
- Check if your database is running
- Verify the connection string is correct
- Ensure SSL mode is enabled for production databases

### Error: "Invalid NEXTAUTH_SECRET"
- Make sure `NEXTAUTH_SECRET` is set in production
- Generate a new one with `openssl rand -base64 32`
- Must be at least 32 characters

### Error: "OAuth callback mismatch"
- Verify redirect URIs in Google Cloud Console match your domain
- Make sure `NEXTAUTH_URL` is set correctly in Vercel

## Quick Setup Checklist

### Local Development
- [ ] Create `.env` file
- [ ] Set `DATABASE_URL="file:./dev.db"`
- [ ] Set `NEXTAUTH_URL="http://localhost:3000"`
- [ ] Set `NEXTAUTH_SECRET` to any string
- [ ] Run `npm run db:push`
- [ ] Run `npm run db:seed`
- [ ] Run `npm run dev`

### Vercel Production
- [ ] Set up PostgreSQL database
- [ ] Add `DATABASE_URL` to Vercel
- [ ] Add `NEXTAUTH_URL` to Vercel
- [ ] Generate and add `NEXTAUTH_SECRET` to Vercel
- [ ] (Optional) Set up Google OAuth and add credentials
- [ ] Deploy to Vercel
- [ ] Run database migrations
- [ ] Seed production database
- [ ] Test the deployment

---

Need help? Check the [DEPLOYMENT.md](./DEPLOYMENT.md) file for step-by-step deployment instructions!

