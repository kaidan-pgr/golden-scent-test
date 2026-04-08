"use client";

import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  return (
    <div className="group relative flex flex-col bg-gray-dark/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent gold-border-hover">
      
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-dark">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-2">
          <p className="text-xs text-gold uppercase tracking-widest font-semibold">{product.brand}</p>
          <h3 className="mt-1 font-serif text-xl font-medium text-foreground">{product.name}</h3>
        </div>
        
        <p className="mt-2 text-sm text-gray-400 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-foreground">{product.price} zł</p>
          <button 
            onClick={() => addItem(product)}
            className="px-4 py-2 border border-foreground text-foreground rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>

    </div>
  );
}
