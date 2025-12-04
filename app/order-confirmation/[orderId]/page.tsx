'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto text-center animate-scale-in">
        <CardContent className="py-12">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500 animate-scale-in" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Order Confirmed! 🎉</h1>
          
          <p className="text-lg text-muted-foreground mb-2">
            Thank you for your order!
          </p>
          
          <p className="text-muted-foreground mb-8">
            Order ID: <span className="font-mono font-semibold">{params.orderId}</span>
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>We&apos;re preparing your delicious meal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Our delivery partner will pick it up soon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>You&apos;ll receive your order at your doorstep</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Pay cash on delivery</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile">
              <Button size="lg">View Order Details</Button>
            </Link>
            <Link href="/restaurant">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

