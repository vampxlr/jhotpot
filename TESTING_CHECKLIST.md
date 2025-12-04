# ✅ Testing Checklist

Use this checklist to verify all features are working correctly after setup.

## 🚀 Initial Setup
- [ ] Run `npm install` successfully
- [ ] Run `npx prisma generate` successfully
- [ ] Run `npx prisma db push` successfully
- [ ] Run `npm run db:seed` successfully (should see 15 menu items created)
- [ ] Run `npm run dev` and access http://localhost:3000

## 🏠 Landing Page
- [ ] Landing page loads with 3 main sections
- [ ] "Jhotpot Kitchen" card is visible
- [ ] "Lunch Loop" card is visible
- [ ] "Catering Hub" card is visible
- [ ] All cards have hover effects
- [ ] Theme switcher is visible in navbar
- [ ] Can switch between 4 themes (Dark/Light/Green/Crimson)
- [ ] Theme changes persist after page reload

## 🍛 Restaurant (Jhotpot Kitchen)
- [ ] Navigate to /restaurant
- [ ] See 15 Bangladeshi dishes displayed
- [ ] Menu items show images, names, prices
- [ ] "Popular", "Veg", "Spicy" badges visible on appropriate items
- [ ] Click "Filters" button to show filter options
- [ ] Filter by Popular - only popular items show
- [ ] Filter by Vegetarian - only veg items show
- [ ] Filter by Spicy - only spicy items show
- [ ] Filter by category (Biryani, Snacks, etc.)
- [ ] Clear filters works correctly
- [ ] Click "Add" button on any item
- [ ] Cart icon in navbar updates with count
- [ ] Toast notification appears: "[Item] added to cart!"
- [ ] Add button has bounce animation

## 🛒 Shopping Cart
- [ ] Click cart icon in navbar or navigate to /cart
- [ ] Previously added items are visible
- [ ] Can increase quantity with "+" button
- [ ] Can decrease quantity with "-" button
- [ ] Can't decrease below 1
- [ ] Can remove item with trash icon
- [ ] Subtotal calculates correctly
- [ ] Delivery charge shows (৳50)
- [ ] Total = Subtotal + Delivery charge
- [ ] "Continue Shopping" returns to /restaurant
- [ ] Cart persists after page reload

## 🔐 Authentication
### Sign Up
- [ ] Navigate to /auth/signup
- [ ] Can create account with name, email, password
- [ ] Password confirmation works
- [ ] Error shown if passwords don't match
- [ ] Error shown if email already exists
- [ ] Successfully redirects to sign in after signup

### Sign In
- [ ] Navigate to /auth/signin
- [ ] Can sign in with email and password
- [ ] Error shown for wrong credentials
- [ ] "Google Sign In" button is visible (may not work without credentials)
- [ ] Successfully redirects after login
- [ ] User name appears in navbar

## 💳 Checkout Flow
- [ ] Add items to cart
- [ ] Click "Proceed to Checkout" (must be signed in)
- [ ] Redirected to /checkout
- [ ] Form pre-fills name and email from account
- [ ] Can enter phone number
- [ ] Can enter complete address (street, area, city, postal code)
- [ ] Can add special instructions
- [ ] Order summary shows all items
- [ ] Total is correct
- [ ] Click "Place Order (Cash on Delivery)"
- [ ] Redirected to /order-confirmation/[id]
- [ ] Confetti animation plays! 🎉
- [ ] Order ID is displayed
- [ ] Cart is now empty

## 👤 User Profile
- [ ] Navigate to /profile
- [ ] See account details (name, email)
- [ ] See order history
- [ ] Previous orders show with status badges
- [ ] Order items are listed
- [ ] Order totals are correct
- [ ] Order timestamps are formatted

## 🏢 Lunch Loop (Corporate Catering)
- [ ] Navigate to /lunch-loop
- [ ] See 3 feature cards (Teams, Delivery, Pricing)
- [ ] See 3 sample packages (Basic, Standard, Premium)
- [ ] Fill out quote form:
  - [ ] Name
  - [ ] Company name
  - [ ] Email
  - [ ] Phone
  - [ ] Number of employees
  - [ ] Date picker works
  - [ ] Optional budget field
  - [ ] Preferences textarea
  - [ ] Notes textarea
- [ ] Click "Request Quote"
- [ ] Redirected to /quote-confirmation
- [ ] Success message displayed

## 🎉 Catering Hub (Event Catering)
- [ ] Navigate to /catering-hub
- [ ] See 4 event type cards (Weddings, Parties, Corporate, Ceremonies)
- [ ] Fill out quote form:
  - [ ] Name
  - [ ] Phone
  - [ ] Email
  - [ ] Event type dropdown works
  - [ ] Number of guests
  - [ ] Event date picker works
  - [ ] Optional budget
  - [ ] Venue/location
  - [ ] Menu preferences
  - [ ] Additional notes
- [ ] Click "Request Quote"
- [ ] Redirected to /quote-confirmation
- [ ] Success message displayed

## 📱 Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select iPhone or Android device
- [ ] Mobile bottom navigation is visible
- [ ] Bottom nav has 4 items (Home, Menu, Cart, Profile)
- [ ] Active page is highlighted in bottom nav
- [ ] Cart badge shows in bottom nav
- [ ] Landing page cards stack vertically
- [ ] Restaurant grid adjusts to 1-2 columns
- [ ] Forms are usable on mobile
- [ ] Navbar hides some elements on mobile
- [ ] Theme switcher works on mobile

## 🎨 Theme System
- [ ] Click theme switcher in navbar
- [ ] See 4 theme options (Dark, Light, Green, Crimson)
- [ ] Each theme shows color preview
- [ ] Click each theme
- [ ] Colors change smoothly
- [ ] Active theme shows checkmark
- [ ] Theme persists after closing dropdown
- [ ] Theme persists after page reload
- [ ] Theme applies to all pages

## 👨‍💼 Admin Dashboard
- [ ] Navigate to /admin
- [ ] Sign in with admin credentials:
  - Email: `admin@jhotpot.com`
  - Password: `admin123`
- [ ] Dashboard shows 4 stat cards
- [ ] Total Orders shows count
- [ ] Pending Orders shows count
- [ ] Quote Requests shows count
- [ ] Total Revenue shows amount in ৳
- [ ] See 3 quick action cards
- [ ] Links to Orders, Menu, Quotes work

## 🗄️ Database
- [ ] Run `npm run db:studio`
- [ ] Prisma Studio opens at http://localhost:5555
- [ ] Can see all tables (User, MenuItem, Order, etc.)
- [ ] MenuItem table has 15 rows
- [ ] AdminUser table has 2 rows (admin and superadmin)
- [ ] Settings table has configuration values
- [ ] Orders appear after placing orders
- [ ] QuoteRequest appears after submitting quotes

## 🔄 Data Persistence
- [ ] Add items to cart
- [ ] Close browser completely
- [ ] Open browser and navigate to site
- [ ] Cart still has items
- [ ] Switch theme to Green
- [ ] Close and reopen browser
- [ ] Theme is still Green
- [ ] Sign in
- [ ] Close and reopen browser
- [ ] Still signed in (session persists)

## ⚡ Performance & UX
- [ ] Pages load quickly
- [ ] Images load properly
- [ ] No console errors in DevTools
- [ ] Hover effects work smoothly
- [ ] Buttons have active states
- [ ] Forms validate before submission
- [ ] Loading states show during async operations
- [ ] Toast notifications appear and disappear
- [ ] Animations are smooth (60fps)
- [ ] No layout shift on page load

## 🐛 Error Handling
- [ ] Try signing in with wrong password → Error message shown
- [ ] Try creating account with existing email → Error shown
- [ ] Try accessing /checkout without login → Redirected to sign in
- [ ] Try accessing /profile without login → Redirected to sign in
- [ ] Try accessing /admin without login → Redirected to sign in
- [ ] Navigate to /cart with empty cart → "Cart is empty" message
- [ ] Submit form with missing required fields → Validation errors

## 🚀 Build & Production
- [ ] Run `npm run build`
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Run `npm run start`
- [ ] Production server starts successfully
- [ ] Site works in production mode
- [ ] All features work in production build

## 📊 Score Your Testing

Count your checkmarks:

- **80-90 checks**: 🎉 Perfect! Everything is working!
- **60-79 checks**: ✅ Great! Minor issues to fix.
- **40-59 checks**: ⚠️ Good start, but needs attention.
- **< 40 checks**: 🔧 Review the SETUP.md guide.

## 🆘 Common Issues

### Menu items not showing
```bash
npm run db:seed
```

### Prisma errors
```bash
npx prisma generate
npx prisma db push
```

### Cart/Theme not persisting
- Check browser localStorage (DevTools → Application → Local Storage)
- Clear localStorage and try again

### Port already in use
```bash
npm run dev -- -p 3001
```

### Database locked (SQLite)
- Close Prisma Studio
- Restart dev server

---

## ✨ Bonus Tests

- [ ] Open site in different browsers (Chrome, Firefox, Safari)
- [ ] Test on actual mobile device
- [ ] Test with slow network throttling
- [ ] Test with screen reader (accessibility)
- [ ] Test with keyboard navigation only

---

Happy Testing! 🧪✅

