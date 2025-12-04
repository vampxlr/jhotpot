'use client';

import Image from 'next/image';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Plus, Flame, Leaf } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    category: string;
    isVeg: boolean;
    isSpicy: boolean;
    isPopular: boolean;
  };
  onAddToCart: (item: any) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    toast.success(`${item.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative h-48 w-full bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.isPopular && <Badge variant="warning">Popular</Badge>}
          {item.isVeg && (
            <Badge variant="success" className="flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Veg
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              Spicy
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground mb-1">{item.category}</p>

        {/* Name */}
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={isAdding ? 'animate-cart-bounce' : ''}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

