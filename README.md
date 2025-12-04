# 🍛 Jhotpot - Bangladeshi Food Ordering & Catering Platform

A modern, fullstack web application for Bangladeshi food ordering and catering services. Built with Next.js 14, TypeScript, Prisma, and SQLite/PostgreSQL.

## ✨ Features

### Three Core Sections

1. **Jhotpot Kitchen** - Regular restaurant menu with instant ordering
   - Browse authentic Bangladeshi dishes
   - Real-time cart management
   - Filters: Veg/Non-Veg, Spicy, Popular, Categories
   - Cash on Delivery (COD) payment

2. **Lunch Loop** - Corporate lunch catering quotes
   - Custom quote requests for offices
   - Sample package displays
   - Budget estimation tools

3. **Catering Hub** - Event catering services
   - Weddings, parties, corporate events
   - Custom menu building
   - Venue-based planning

### Key Features

- 🎨 **4 Beautiful Themes**: Dark, Light, Green, Crimson (with smooth transitions)
- 🛒 **3 Independent Carts**: Separate carts for each section
- 🔐 **Authentication**: Google OAuth + Email/Password with NextAuth
- 📱 **Mobile-First Design**: Optimized for all devices
- 🎭 **Micro-Interactions**: Hover effects, cart animations, confetti
- 👨‍💼 **Admin Dashboard**: Manage orders, menu, quotes
- 📊 **Order Tracking**: Real-time order status updates
- 💾 **Persistent State**: Cart & theme preferences saved locally

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Restaurant App"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and update the values:

```env
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this"

# Google OAuth (Optional - get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Initialize the database**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── menu/            # Menu CRUD
│   │   ├── orders/          # Order management
│   │   └── quotes/          # Quote requests
│   ├── restaurant/          # Restaurant menu page
│   ├── lunch-loop/          # Corporate catering page
│   ├── catering-hub/        # Event catering page
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── profile/             # User profile
│   └── admin/               # Admin dashboard
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── Navbar.tsx
│   ├── ThemeSwitcher.tsx
│   └── MenuItemCard.tsx
├── lib/                     # Utilities
│   ├── prisma.ts            # Prisma client
│   ├── auth.ts              # NextAuth config
│   ├── theme.ts             # Theme definitions
│   └── utils.ts             # Helper functions
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── store/                   # Zustand stores
│   ├── useCartStore.ts      # Cart state management
│   └── useThemeStore.ts     # Theme state management
└── types/                   # TypeScript types
```

## 🗄️ Database Schema

### Key Models

- **User** - Customer accounts with addresses
- **AdminUser** - Admin/Super Admin accounts
- **MenuItem** - Food items with categories
- **Order** - Customer orders with items
- **QuoteRequest** - Catering quote requests
- **Address** - Delivery addresses
- **Settings** - System configuration

## 🎨 Theme System

4 pre-built themes with CSS variables:
- **Dark** - Modern dark theme (default)
- **Light** - Clean light theme
- **Green** - Nature-inspired green theme
- **Crimson** - Bold crimson theme

Switch themes using the theme switcher in the navbar. Themes persist across sessions.

## 👤 Default Accounts

After seeding, you can login with:

**Super Admin:**
- Email: `superadmin@jhotpot.com`
- Password: `admin123`

**Admin:**
- Email: `admin@jhotpot.com`
- Password: `admin123`

## 📊 Admin Features

- View dashboard statistics
- Manage menu items (CRUD)
- Update order statuses
- Review quote requests
- View all customers
- Manage admin users (Super Admin only)

## 🛒 Cart System

Three independent carts:
1. **Restaurant Cart** - For instant orders (goes to checkout)
2. **Lunch Loop Cart** - For quote estimation only
3. **Catering Hub Cart** - For quote estimation only

Carts persist in localStorage and sync with server after login.

## 🔐 Authentication

- **NextAuth** with multiple providers
- Google OAuth (configure in .env)
- Email/Password with bcrypt
- Protected routes with middleware
- Session-based authentication

## 🚢 Deployment

### Database Migration (Development → Production)

The app uses SQLite for development. For production:

1. **Update `.env` with PostgreSQL URL:**
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

2. **Run migration:**
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
```

No code changes needed - Prisma handles the database switch automatically!

### Recommended Hosting

- **Frontend**: Vercel, Netlify, Railway
- **Database**: Neon, Supabase, Railway PostgreSQL

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (SQLite/PostgreSQL)
- **Auth**: NextAuth.js
- **State**: Zustand
- **UI Components**: Custom (ShadCN-inspired)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🎯 Future Enhancements

- [ ] SMS/Email OTP verification
- [ ] Online payment integration (bKash, Nagad)
- [ ] Real-time order tracking
- [ ] Customer reviews and ratings
- [ ] Loyalty points system
- [ ] Push notifications
- [ ] Multi-language support (Bengali/English)

## 📝 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for the Bangladeshi food community**

