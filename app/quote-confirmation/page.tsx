'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function QuoteConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto text-center animate-scale-in">
        <CardContent className="py-12">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Quote Request Received!</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your interest! Our team will review your request and get back to you within 24 hours.
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Our team will review your requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>We&apos;ll prepare a customized quote for you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>We&apos;ll contact you via phone or email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>We&apos;ll finalize the details together</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Back to Home</Button>
            </Link>
            <Link href="/restaurant">
              <Button size="lg" variant="outline">
                Browse Menu
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

