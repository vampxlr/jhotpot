import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Utensils, Users, PartyPopper } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to Jhotpot
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience authentic Bangladeshi cuisine. From quick meals to grand celebrations,
          we&apos;ve got you covered.
        </p>
      </div>

      {/* Three Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Jhotpot Kitchen */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Utensils className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Jhotpot Kitchen</CardTitle>
            <CardDescription>Regular Restaurant Menu</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Order delicious Bangladeshi dishes with instant delivery. Browse our full menu and
              enjoy authentic flavors at home.
            </p>
            <Link href="/restaurant">
              <Button size="lg" className="w-full">
                Order Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Lunch Loop */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Lunch Loop</CardTitle>
            <CardDescription>Corporate Lunch Catering</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Daily lunch solutions for your office. Get custom quotes for your team&apos;s
              favorite meals delivered fresh.
            </p>
            <Link href="/lunch-loop">
              <Button size="lg" className="w-full" variant="secondary">
                Get a Quote
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Catering Hub */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Catering Hub</CardTitle>
            <CardDescription>Event Catering Services</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Make your events memorable with our catering. Weddings, parties, corporate events -
              we handle it all.
            </p>
            <Link href="/catering-hub">
              <Button size="lg" className="w-full" variant="secondary">
                Plan Your Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="bg-secondary/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Jhotpot?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🍛</div>
            <h3 className="font-semibold text-lg mb-2">Authentic Flavors</h3>
            <p className="text-muted-foreground text-sm">
              Traditional Bangladeshi recipes prepared by expert chefs
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Quick Delivery</h3>
            <p className="text-muted-foreground text-sm">
              Fast and reliable delivery to your doorstep
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💯</div>
            <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
            <p className="text-muted-foreground text-sm">
              Fresh ingredients and hygienic preparation standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

