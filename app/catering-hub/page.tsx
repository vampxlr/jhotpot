'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PartyPopper, Heart, Briefcase, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CateringHubPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    eventType: '',
    numberOfPeople: '',
    date: '',
    venue: '',
    budget: '',
    preferences: '',
    notes: '',
  });

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Corporate Event',
    'Anniversary',
    'Religious Ceremony',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'CATERING_HUB',
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
        <h1 className="text-4xl font-bold mb-4">Catering Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make your special occasions memorable with our exceptional catering services
        </p>
      </div>

      {/* Event Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Weddings</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <PartyPopper className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Parties</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Corporate</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold">Ceremonies</h3>
          </CardContent>
        </Card>
      </div>

      {/* Quote Form */}
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Request a Catering Quote</CardTitle>
            <CardDescription>
              Tell us about your event and we&apos;ll create a custom package for you
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
                  label="Phone Number"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Event Type
                  </label>
                  <select
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Number of Guests"
                  type="number"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Event Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <Input
                  label="Budget Range (৳)"
                  type="number"
                  min="0"
                  placeholder="Optional"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>

              <Input
                label="Venue/Location"
                placeholder="Where will the event take place?"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />

              <Textarea
                label="Menu Preferences"
                placeholder="What type of dishes would you like? Any dietary restrictions?"
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                rows={3}
              />

              <Textarea
                label="Additional Notes"
                placeholder="Any other details about your event..."
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

        {/* Why Choose Us */}
        <div className="mt-12 bg-secondary/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Jhotpot Catering?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🍽️ Extensive Menu</h3>
              <p className="text-sm text-muted-foreground">
                From traditional Bangladeshi to fusion cuisine, we offer diverse menu options
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">👨‍🍳 Expert Chefs</h3>
              <p className="text-sm text-muted-foreground">
                Our experienced chefs ensure authentic flavors and quality in every dish
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Full Service</h3>
              <p className="text-sm text-muted-foreground">
                We handle everything from setup to cleanup, so you can enjoy your event
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💰 Flexible Packages</h3>
              <p className="text-sm text-muted-foreground">
                Custom packages designed to fit your budget and guest count
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

