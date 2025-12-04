import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jhotpot - Bangladeshi Food Ordering & Catering',
  description: 'Order authentic Bangladeshi food, corporate lunch catering, and event catering services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pb-20 md:pb-0">{children}</main>
          <footer className="border-t border-border py-8 mt-20 mb-16 md:mb-0">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; 2025 Jhotpot Kitchen. All rights reserved.</p>
            </div>
          </footer>
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}

