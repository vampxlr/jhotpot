# ✅ Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed to Git
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] No sensitive data in the codebase
- [ ] `package.json` has correct build scripts
- [ ] Prisma schema uses PostgreSQL provider

### Environment Variables Prepared
- [ ] PostgreSQL database URL obtained
- [ ] `NEXTAUTH_SECRET` generated (use `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` ready (will be Vercel URL)
- [ ] (Optional) Google OAuth credentials obtained

### Repository Setup
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is accessible
- [ ] Main branch is up to date

## Deployment Checklist

### Vercel Setup
- [ ] Signed up for Vercel account
- [ ] Connected Git provider (GitHub/GitLab)
- [ ] Imported repository
- [ ] Project name configured

### Environment Variables Added
- [ ] `DATABASE_URL` added and verified
- [ ] `NEXTAUTH_URL` added with correct domain
- [ ] `NEXTAUTH_SECRET` added (32+ characters)
- [ ] (Optional) `GOOGLE_CLIENT_ID` added
- [ ] (Optional) `GOOGLE_CLIENT_SECRET` added
- [ ] All variables set for all environments (Production, Preview, Development)

### First Deployment
- [ ] Initial deployment triggered
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] Deployment URL accessible

## Post-Deployment Checklist

### Database Setup
- [ ] Database migrations applied
  - Via Vercel CLI: Run `npx prisma migrate deploy`
  - Or automatic via build script
- [ ] Database seeded with initial data
  - Admin accounts created
  - Menu items added
  - Settings configured
- [ ] Database connection verified via `/api/health`

### Authentication Testing
- [ ] Can access homepage
- [ ] Can navigate to sign-up page
- [ ] Can create new account with email/password
- [ ] Can log in with created account
- [ ] (If enabled) Can sign in with Google OAuth
- [ ] Session persists after page refresh
- [ ] Can log out successfully

### Feature Testing
- [ ] **Homepage**: Loads correctly with hero section
- [ ] **Restaurant Menu**: All items display
- [ ] **Lunch Loop**: Quote form works
- [ ] **Catering Hub**: Event form works
- [ ] **Cart**: Can add items to cart
- [ ] **Cart**: Cart persists in localStorage
- [ ] **Checkout**: Form validation works
- [ ] **Checkout**: Can place order
- [ ] **Order Confirmation**: Shows after successful order
- [ ] **Profile**: Shows user information
- [ ] **Theme Switcher**: All 4 themes work
- [ ] **Mobile Nav**: Responsive menu works

### Admin Testing
- [ ] Can access `/admin` route
- [ ] Admin login works (superadmin@jhotpot.com)
- [ ] Dashboard shows statistics
- [ ] Can view all orders
- [ ] Can update order status
- [ ] Can view quote requests
- [ ] Can manage menu items
- [ ] (Super Admin) Can manage admin users

### Performance & SEO
- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] Mobile responsiveness verified
- [ ] Meta tags present
- [ ] Favicon displays

### Security Checks
- [ ] Environment variables not exposed
- [ ] API routes protected where needed
- [ ] Admin routes require authentication
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Database uses SSL connection

## Optional Enhancements

### Analytics & Monitoring
- [ ] Vercel Analytics enabled
- [ ] Speed Insights configured
- [ ] Error tracking set up (Sentry, etc.)

### Domain & Branding
- [ ] Custom domain added
- [ ] DNS configured correctly
- [ ] SSL certificate issued
- [ ] Updated `NEXTAUTH_URL` with custom domain
- [ ] Updated Google OAuth redirect URIs

### Email & Notifications
- [ ] Email service configured (SendGrid, Resend, etc.)
- [ ] Order confirmation emails working
- [ ] Admin notification emails working

### Advanced Features
- [ ] SMS/OTP verification set up
- [ ] Payment gateway integrated
- [ ] Backup strategy implemented
- [ ] Monitoring dashboard configured

## Troubleshooting

### If Build Fails

```bash
# Check build logs in Vercel dashboard
# Common issues:
1. Missing environment variables
2. Prisma generation failed
3. TypeScript errors
4. Missing dependencies
```

**Solutions:**
- Verify all environment variables are set
- Run `npm run build` locally to test
- Check for TypeScript errors with `npm run lint`

### If Database Connection Fails

```bash
# Test connection locally
npx prisma db push
npx prisma studio
```

**Solutions:**
- Verify `DATABASE_URL` format
- Ensure `?sslmode=require` is present
- Check database provider status
- Verify IP whitelisting (if required)

### If Auth Doesn't Work

**Solutions:**
- Verify `NEXTAUTH_URL` matches deployed URL
- Check `NEXTAUTH_SECRET` is set and long enough
- For Google OAuth: verify redirect URIs
- Clear browser cookies and try again

### If Pages Are Blank/Empty

**Solutions:**
- Database needs seeding: Run `npm run db:seed`
- Check Vercel logs for errors
- Visit `/api/health` to check status
- Verify API routes are working

## Vercel CLI Quick Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Link to project
vercel link

# Pull environment variables
vercel env pull .env.local

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Open project
vercel open
```

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)
- **NextAuth Docs**: [next-auth.js.org](https://next-auth.js.org)

## Post-Launch Monitoring

### Daily Checks (First Week)
- [ ] Monitor error rate in Vercel dashboard
- [ ] Check for failed API requests
- [ ] Verify order flow works
- [ ] Monitor database performance

### Weekly Checks
- [ ] Review analytics data
- [ ] Check Core Web Vitals
- [ ] Monitor bandwidth usage
- [ ] Backup database
- [ ] Update dependencies if needed

### Monthly Checks
- [ ] Review and rotate secrets
- [ ] Update package dependencies
- [ ] Check for security updates
- [ ] Optimize database queries
- [ ] Review user feedback

---

## 🎉 Deployment Complete!

Once all items are checked, your restaurant app is fully deployed and ready for production!

**Share your app**: `https://your-app.vercel.app`

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) or [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

