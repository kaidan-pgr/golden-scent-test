"use client";

import { useState } from 'react';
import { mockProducts } from '@/lib/mocks';
import { Product } from '@/types';
import Image from 'next/image';
import { Edit, Trash } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  return (
    <div className="bg-gray-dark/20 p-8 rounded-xl border border-gray-dark">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-foreground">Produkty</h1>
        <button className="bg-gold text-background px-4 py-2 rounded-md font-medium hover:bg-gold-hover transition-colors">
          Dodaj Produkt
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-dark">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produkt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Marka</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cena</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Płeć</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-dark">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-dark/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden">
                      <Image src={product.imageUrl} alt="" fill className="object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{product.brand}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.price} zł
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gold hover:text-gold-hover mr-4">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
