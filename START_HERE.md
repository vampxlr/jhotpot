# 🚀 START HERE - Vercel Deployment

Your Restaurant App is ready for deployment! Follow these quick steps.

## ⚡ Super Quick Deploy (5 Minutes)

### Step 1: Get Database (2 min)
Go to [neon.tech](https://neon.tech) → Sign up (free) → Create project → Copy connection string

### Step 2: Deploy to Vercel (2 min)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click Deploy (don't configure yet, just deploy)

### Step 3: Add Environment Variables (1 min)
In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://your-neon-connection-string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=run-this-command-in-terminal: openssl rand -base64 32
```

### Step 4: Redeploy
Go to Deployments tab → Click "Redeploy"

### Step 5: Seed Database
```bash
npm i -g vercel
vercel link
vercel env pull .env.local
npm run db:seed
```

## ✅ Done! Visit your app at https://your-app.vercel.app

---

## 📚 Full Documentation

Need more details? Check these guides:

| Guide | When to Use |
|-------|-------------|
| **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** | Fast 5-min setup with examples |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Detailed step-by-step guide |
| **[ENV_SETUP.md](./ENV_SETUP.md)** | Setting up environment variables |
| **[VERCEL_CHECKLIST.md](./VERCEL_CHECKLIST.md)** | Complete verification checklist |
| **[MIGRATIONS.md](./MIGRATIONS.md)** | Database and migration issues |

---

## 🔧 Commands You'll Need

```bash
# Check if ready for deployment
npm run check-deploy

# Test build locally
npm run build

# Seed database (after deployment)
npm run db:seed

# View database
npm run db:studio
```

---

## ❓ Common Questions

**Q: Do I need to change provider in schema.prisma back and forth?**
A: No! Keep it as `postgresql`. Use `DATABASE_URL="file:./dev.db"` locally and it'll work fine.

**Q: What if I don't have Google OAuth?**
A: That's fine! Just don't add those env variables. Email/password auth will work.

**Q: How do I seed the production database?**
A: See Step 5 above, or check QUICK_DEPLOY.md Section 6.

**Q: My build is failing!**
A: Check that DATABASE_URL, NEXTAUTH_URL, and NEXTAUTH_SECRET are all set in Vercel.

**Q: How much will this cost?**
A: Free! Neon has free PostgreSQL, Vercel has free hosting.

---

## 🆘 Need Help?

1. Run `npm run check-deploy` to verify configuration
2. Check the troubleshooting section in DEPLOYMENT.md
3. Visit the health check: `https://your-app.vercel.app/api/health`
4. Review Vercel logs in the dashboard

---

## 🎯 What's Been Configured

✅ PostgreSQL ready (switch from SQLite)
✅ Automatic database migrations
✅ Build scripts optimized
✅ Environment variables documented
✅ Health check endpoint added
✅ Google OAuth made optional
✅ Security best practices applied
✅ Comprehensive documentation

---

## 🌟 After Deployment

Test these features:
- [ ] Can browse menu
- [ ] Can sign up with email
- [ ] Can add to cart
- [ ] Can place order
- [ ] Admin login works (superadmin@jhotpot.com / admin123)
- [ ] All 4 themes work
- [ ] Mobile responsive

---

**Ready? Let's deploy!** 🚀

```bash
# First, verify everything is ready
npm run check-deploy

# Then follow the steps above!
```

