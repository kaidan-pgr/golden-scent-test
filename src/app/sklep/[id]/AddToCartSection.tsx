"use client";

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

export default function AddToCartSection({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [capacity, setCapacity] = useState('50ml');

  const handleAddToCart = () => {
    // We add the base product, capacity handling could be added to Product type later
    // but for now we'll just push multiple of the same product or simulate it.
    for (let i = 0; i < quantity; i++) {
        addItem(product);
    }
  };

  return (
    <div className="mt-8 space-y-8 border-t border-gray-dark pt-8">
        
      <div>
        <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Pojemność</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => setCapacity('50ml')}
            className={`px-6 py-3 border rounded-full text-sm font-medium transition-colors ${capacity === '50ml' ? 'border-gold text-gold bg-gold/5' : 'border-gray-dark text-gray-400 hover:text-foreground'}`}
          >
            50 ml
          </button>
          <button 
            onClick={() => setCapacity('100ml')}
            className={`px-6 py-3 border rounded-full text-sm font-medium transition-colors ${capacity === '100ml' ? 'border-gold text-gold bg-gold/5' : 'border-gray-dark text-gray-400 hover:text-foreground'}`}
          >
            100 ml
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border border-gray-dark rounded-full px-4 py-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-gold transition-colors">
                <Minus size={18} />
            </button>
            <span className="px-6 font-medium text-foreground">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-gold transition-colors">
                <Plus size={18} />
            </button>
        </div>

        <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gold text-background px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-gold-hover transition-colors flex items-center justify-center gap-2"
        >
            <ShoppingBag size={20} />
            Dodaj do koszyka
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        Dostępny w magazynie. Wysyłka w 24h.
      </div>
    </div>
  );
}
