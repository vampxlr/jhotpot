# 🚀 Deploying Jhotpot to Vercel

This guide will walk you through deploying your Restaurant App to Vercel with a PostgreSQL database.

## Prerequisites

- A GitHub/GitLab/Bitbucket account
- A Vercel account (free at [vercel.com](https://vercel.com))
- A PostgreSQL database (see Database Setup below)

## Step 1: Database Setup

Choose one of these PostgreSQL hosting providers:

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Copy the `DATABASE_URL` connection string

### Option B: Neon (Free Tier Available)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (ensure it includes `?sslmode=require`)

### Option C: Supabase (Free Tier Available)
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string (use "Connection Pooling" for better performance)

### Option D: Railway (Free Tier Available)
1. Sign up at [railway.app](https://railway.app)
2. Create a new Postgres database
3. Copy the `DATABASE_URL` from the connection tab

## Step 2: Push Your Code to Git

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js settings
4. Click "Deploy"

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

## Step 4: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string | From Step 1 |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel domain |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | Keep this secret! |

### Optional Variables (for Google OAuth):

| Variable | Value | Notes |
|----------|-------|-------|
| `GOOGLE_CLIENT_ID` | Your Google Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret | Keep this secret! |

**Important:** Make sure to add these for all environments (Production, Preview, Development)

## Step 5: Set Up the Database

After deployment, you need to initialize your database:

### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run Prisma commands
npx prisma migrate deploy  # Apply migrations
npx prisma db seed         # Seed the database
```

### Option B: Via GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Option C: Via Vercel Project Settings

You can also add a `vercel.json` with build commands, but the default setup should work fine.

## Step 6: Configure Google OAuth (Optional)

If you're using Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: "Web application"
6. Authorized redirect URIs:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google  (for local dev)
   ```
7. Copy the Client ID and Client Secret
8. Add them to Vercel Environment Variables

## Step 7: Verify Deployment

1. Visit your Vercel URL
2. Test the following:
   - ✅ Homepage loads
   - ✅ Can browse menu
   - ✅ Can add items to cart
   - ✅ Can sign up/login
   - ✅ Can place an order
   - ✅ Admin login works (`superadmin@jhotpot.com` / `admin123`)

## Troubleshooting

### Build Errors

**Error: "Prisma Client could not be generated"**
```bash
# Solution: Ensure postinstall script is in package.json
"postinstall": "prisma generate"
```

**Error: "Database connection failed"**
- Verify your `DATABASE_URL` is correct
- Ensure it includes `?sslmode=require` for secure connections
- Check if your database provider's IP is whitelisted (if applicable)

### Runtime Errors

**Error: "NEXTAUTH_URL is not defined"**
- Add `NEXTAUTH_URL` to Vercel environment variables
- Redeploy after adding

**Error: "Table does not exist"**
- Run `npx prisma migrate deploy` to create tables
- Or run `npx prisma db push` (for quick setup without migrations)

### Database Seeding

If you need to seed the database again:

```bash
# Via Vercel CLI
vercel env pull .env.local
npx prisma db seed

# Or create a temporary API route
# Create app/api/seed/route.ts and call it once, then delete
```

## Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Database is seeded with initial data
- [ ] Can create an account
- [ ] Can place an order
- [ ] Admin dashboard is accessible
- [ ] Google OAuth is working (if configured)
- [ ] All 4 themes load correctly
- [ ] Cart persists correctly
- [ ] Email notifications work (if configured)

## Updating Your Deployment

Any push to your main branch will automatically trigger a new deployment.

For manual deployments:
```bash
vercel --prod
```

## Custom Domain (Optional)

1. Go to Vercel Project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain
5. Update Google OAuth redirect URIs (if using)

## Performance Optimization

### Enable Edge Runtime (Optional)
For faster response times, you can enable Edge runtime for API routes:

```typescript
// In your API routes
export const runtime = 'edge';
```

### Enable Incremental Static Regeneration
Update your pages to use ISR for better performance:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

## Monitoring

Vercel provides built-in:
- **Analytics**: Track page views and performance
- **Logs**: View real-time logs
- **Speed Insights**: Monitor Core Web Vitals

Enable these in your Vercel dashboard for free!

## Cost Estimation

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Edge Network

### Database Costs:
- **Vercel Postgres**: $0.50/month (after free tier)
- **Neon**: Free tier includes 0.5GB storage
- **Supabase**: Free tier includes 500MB database
- **Railway**: $5/month after free trial

## Support

If you encounter issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Next.js Documentation](https://nextjs.org/docs)
3. Check [Prisma Documentation](https://www.prisma.io/docs)

---

**🎉 Your restaurant app is now live!**

Share your deployed URL with customers and start taking orders!

