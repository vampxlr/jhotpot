# ⚡ Quick Deploy to Vercel (5 Minutes)

The fastest way to get your restaurant app live!

## Prerequisites
- [ ] GitHub/GitLab account
- [ ] Vercel account (free)
- [ ] 5 minutes of your time

## Step 1: Get a PostgreSQL Database (2 minutes)

### Option A: Neon (Recommended - Free Forever)
1. Go to [neon.tech](https://neon.tech) and sign up
2. Click **Create Project**
3. Copy the **Connection String** (it looks like `postgresql://user:pass@host.neon.tech/dbname`)
4. Keep this tab open for Step 3

### Option B: Vercel Postgres
1. We'll set this up after deploying in Step 4

## Step 2: Push to GitHub (1 minute)

If not already done:

```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

## Step 3: Deploy to Vercel (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Click **Deploy** (yes, just deploy it!)

Your app will deploy but won't work yet - that's fine!

## Step 4: Add Environment Variables (2 minutes)

In your Vercel dashboard:

1. Go to your project → **Settings** → **Environment Variables**

2. Add these THREE required variables:

   **DATABASE_URL**
   ```
   postgresql://your-connection-string-from-step-1
   ```
   
   **NEXTAUTH_URL**
   ```
   https://your-app-name.vercel.app
   ```
   (Replace with your actual Vercel URL)
   
   **NEXTAUTH_SECRET**
   ```bash
   # Generate this by running in your terminal:
   openssl rand -base64 32
   ```
   (Copy the output and paste it here)

3. Make sure to select **All Environments** (Production, Preview, Development)

4. Click **Save**

## Step 5: Setup Database & Redeploy (1 minute)

### Option A: Via Terminal (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Pull environment variables locally
vercel env pull .env.local

# Deploy with migrations
vercel --prod
```

The build process will automatically run migrations!

### Option B: Via Vercel Dashboard

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. The build will run migrations automatically

## Step 6: Seed the Database

You need to seed the database with initial data (menu items, admin accounts).

### Quick Method - Create Seed API Route

1. Create `app/api/seed/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  // Security: Only allow in development or with secret key
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Run your seed logic here (copy from prisma/seed.ts)
    // For security, delete this file after first use!
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully!' 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Seeding failed', 
      details: error 
    }, { status: 500 });
  }
}
```

2. Add `SEED_SECRET` to Vercel environment variables (any random string)

3. Visit: `https://your-app.vercel.app/api/seed?secret=your-secret`

4. **Delete the seed route after use!**

### Alternative Method - Via Vercel CLI

```bash
vercel env pull .env.local
npm run db:seed
```

## Step 7: Test Your Deployment ✅

Visit your app and verify:

- ✅ Homepage loads
- ✅ Can browse menu
- ✅ Can sign up with email
- ✅ Can add items to cart
- ✅ Can place an order
- ✅ Admin login works (superadmin@jhotpot.com / admin123)

## 🎉 You're Live!

Your restaurant app is now deployed and ready to take orders!

### Next Steps (Optional)

1. **Add Google OAuth** (See ENV_SETUP.md)
2. **Add Custom Domain** (Vercel Settings → Domains)
3. **Enable Analytics** (Vercel Dashboard → Analytics)
4. **Set up Email Notifications** (Add email service)

## Troubleshooting

### Build Failed
- Check the build logs in Vercel
- Ensure all environment variables are set
- Make sure DATABASE_URL is valid

### Database Connection Error
- Verify DATABASE_URL in Vercel settings
- Ensure `?sslmode=require` is in the connection string
- Check if database provider IP is whitelisted

### Auth Not Working
- Verify NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set (at least 32 characters)
- Check browser console for errors

### Pages Load but No Data
- You need to seed the database (Step 6)
- Check Vercel logs for database errors

## Quick Commands Reference

```bash
# Link project to Vercel
vercel link

# Pull environment variables
vercel env pull .env.local

# Deploy to production
vercel --prod

# View logs
vercel logs

# Open project in browser
vercel open
```

## Need More Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Check [ENV_SETUP.md](./ENV_SETUP.md) for environment variable details
- Visit [Vercel Documentation](https://vercel.com/docs)

---

**Built with ❤️ for the Bangladeshi food community**

