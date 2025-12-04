'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Users, Clock, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LunchLoopPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    companyName: '',
    numberOfPeople: '',
    date: '',
    budget: '',
    preferences: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'LUNCH_LOOP',
          numberOfPeople: parseInt(formData.numberOfPeople),
          budget: parseFloat(formData.budget) || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      toast.success('Quote request submitted successfully!');
      router.push('/quote-confirmation');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Lunch Loop</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Corporate lunch catering made simple. Fresh, delicious meals delivered daily to your office.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Perfect for Teams</h3>
            <p className="text-sm text-muted-foreground">
              From small teams to large offices, we cater to all sizes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">On-Time Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Guaranteed lunch delivery at your preferred time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Flexible Pricing</h3>
            <p className="text-sm text-muted-foreground">
              Custom packages to fit your budget and preferences
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quote Form */}
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you with a customized quote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Number of Employees"
                  type="number"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                  required
                />
                <Input
                  label="Preferred Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <Input
                  label="Budget per Person (৳)"
                  type="number"
                  min="0"
                  placeholder="Optional"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>

              <Textarea
                label="Dietary Preferences & Restrictions"
                placeholder="Vegetarian options, allergies, spice level, etc."
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                rows={3}
              />

              <Textarea
                label="Additional Notes"
                placeholder="Any other information we should know..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Request Quote'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sample Packages */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Sample Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>৳200-250 per person</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Rice + Curry</li>
                  <li>✓ Dal + Vegetable</li>
                  <li>✓ Salad</li>
                  <li>✓ Water</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary border-2">
              <CardHeader>
                <CardTitle>Standard</CardTitle>
                <CardDescription>৳300-350 per person</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Biryani/Polao</li>
                  <li>✓ Chicken/Beef Curry</li>
                  <li>✓ Dal + Vegetable</li>
                  <li>✓ Salad + Dessert</li>
                  <li>✓ Beverage</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>৳400+ per person</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Kacchi/Special Biryani</li>
                  <li>✓ Multiple Curries</li>
                  <li>✓ Dal + Mixed Vegetables</li>
                  <li>✓ Salad + Premium Dessert</li>
                  <li>✓ Beverage + Borhani</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

