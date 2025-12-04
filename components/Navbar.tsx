'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/Button';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const { data: session } = useSession();
  const { restaurantCart } = useCartStore();

  const cartCount = restaurantCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            Jhotpot
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/restaurant" className="text-foreground hover:text-primary transition-colors">
              Restaurant
            </Link>
            <Link href="/lunch-loop" className="text-foreground hover:text-primary transition-colors">
              Lunch Loop
            </Link>
            <Link href="/catering-hub" className="text-foreground hover:text-primary transition-colors">
              Catering Hub
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline ml-2">{session.user.name || 'Profile'}</span>
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => signOut()}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

