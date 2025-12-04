'use client';

import { useEffect, useState } from 'react';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { Filter, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
}

export default function RestaurantPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    isVeg: false,
    isSpicy: false,
    isPopular: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const { addToRestaurantCart } = useCartStore();

  // Get unique categories
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  useEffect(() => {
    fetchMenuItems();
  }, [filters]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        section: 'restaurant',
        ...(filters.category && { category: filters.category }),
        ...(filters.isVeg && { isVeg: 'true' }),
        ...(filters.isSpicy && { isSpicy: 'true' }),
        ...(filters.isPopular && { isPopular: 'true' }),
      });

      const response = await fetch(`/api/menu?${params}`);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      isVeg: false,
      isSpicy: false,
      isPopular: false,
    });
  };

  const hasActiveFilters = filters.category || filters.isVeg || filters.isSpicy || filters.isPopular;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Jhotpot Kitchen</h1>
        <p className="text-muted-foreground">
          Order delicious Bangladeshi dishes for instant delivery
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">!</span>}
        </Button>

        {showFilters && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-4 animate-slide-up">
            <div className="flex flex-wrap gap-3 mb-3">
              {/* Quick Filters */}
              <Button
                size="sm"
                variant={filters.isPopular ? 'default' : 'outline'}
                onClick={() => setFilters({ ...filters, isPopular: !filters.isPopular })}
              >
                ⭐ Popular
              </Button>
              <Button
                size="sm"
                variant={filters.isVeg ? 'default' : 'outline'}
                onClick={() => setFilters({ ...filters, isVeg: !filters.isVeg })}
              >
                🌱 Vegetarian
              </Button>
              <Button
                size="sm"
                variant={filters.isSpicy ? 'default' : 'outline'}
                onClick={() => setFilters({ ...filters, isSpicy: !filters.isSpicy })}
              >
                🌶️ Spicy
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium mr-2">Categories:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={filters.category === category ? 'default' : 'secondary'}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      category: filters.category === category ? '' : category,
                    })
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearFilters}
                className="mt-3"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading menu...</p>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No items found</p>
          {hasActiveFilters && (
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToRestaurantCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

