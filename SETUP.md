# 🚀 Quick Setup Guide

Follow these steps to get your Jhotpot restaurant app up and running!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, Prisma, NextAuth, and more.

## Step 2: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database and tables
npx prisma db push

# Seed with sample data (Bangladeshi dishes + admin accounts)
npm run db:seed
```

**What gets seeded:**
- 15 Bangladeshi food items (Kacchi Biryani, Beef Tehari, Mishti Doi, etc.)
- Super Admin account: `superadmin@jhotpot.com` / `admin123`
- Regular Admin account: `admin@jhotpot.com` / `admin123`
- System settings (delivery charge, theme, etc.)

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎉 You're Ready!

### Try These Features:

1. **Browse Menu**: Go to http://localhost:3000/restaurant
2. **Add to Cart**: Click items and see cart animation
3. **Switch Themes**: Use theme switcher (4 themes available)
4. **Sign Up**: Create a new account at http://localhost:3000/auth/signup
5. **Place Order**: Add items, checkout, and see confetti! 🎊
6. **Corporate Quotes**: Visit http://localhost:3000/lunch-loop
7. **Event Catering**: Visit http://localhost:3000/catering-hub
8. **Admin Panel**: Login at http://localhost:3000/admin with admin credentials

## 🔐 Test Accounts

**Admin Access:**
```
Email: admin@jhotpot.com
Password: admin123
```

**Super Admin Access:**
```
Email: superadmin@jhotpot.com
Password: admin123
```

## 🎨 Themes

Switch between 4 beautiful themes:
- 🌑 Dark (default)
- ☀️ Light
- 🌿 Green
- 🔴 Crimson

## 📱 Mobile Testing

The app is mobile-first! Test it:
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select a mobile device

## 🛠️ Useful Commands

```bash
# View database in browser
npm run db:studio

# Reset database
npx prisma db push --force-reset
npm run db:seed

# Check for linting issues
npm run lint

# Build for production
npm run build
```

## 🐛 Troubleshooting

### "Prisma Client is not generated"
```bash
npx prisma generate
```

### "Database not found"
```bash
npx prisma db push
```

### "No menu items showing"
```bash
npm run db:seed
```

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

## 📊 Database GUI

Open Prisma Studio to view/edit database:
```bash
npm run db:studio
```

Access at: http://localhost:5555

## 🌐 Google OAuth (Optional)

To enable Google login:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Update `DATABASE_URL` to PostgreSQL (Neon/Supabase)
5. Deploy!

### Option 2: Railway

1. Connect GitHub repo
2. Add PostgreSQL plugin
3. Update environment variables
4. Deploy!

## 📝 Environment Variables

Required for production:
```env
DATABASE_URL="postgresql://..."  # Use Postgres in production
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-secure-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🎯 Next Steps

1. Customize the menu items
2. Update logo and branding
3. Add your Google OAuth credentials
4. Configure email notifications
5. Deploy to production!

## 💡 Tips

- Cart persists in localStorage
- Theme preference is saved
- Orders show in user profile
- Admin can update order status
- Quotes are for estimation only

## 🆘 Need Help?

Check the main [README.md](./README.md) for detailed documentation!

---

Happy coding! 🍛✨

