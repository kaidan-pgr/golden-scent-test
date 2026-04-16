import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import AddToCartSection from './AddToCartSection';

export const runtime = 'edge';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the asynchronous params object in Next.js 15+
  const { id } = await params;
  
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/sklep" className="inline-flex items-center text-sm text-gray-400 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do sklepu
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Lewa kolumna: Galeria */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full bg-gray-dark rounded-2xl overflow-hidden border border-gray-dark shadow-2xl">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Opcjonalne mniejsze zdjęcia poglądowe (Mock) */}
            <div className="grid grid-cols-3 gap-4">
               {[1, 2, 3].map((idx) => (
                 <div key={idx} className="relative aspect-square rounded-xl bg-gray-dark overflow-hidden border border-gray-dark cursor-pointer hover:border-gold transition-colors">
                     <Image src={product.imageUrl} alt={`${product.name} thumbnail`} fill className="object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Prawa kolumna: Detale i Zakup */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <p className="text-sm text-gold uppercase tracking-widest font-semibold mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground font-medium mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-foreground mb-8">{product.price} zł</p>

            <div className="prose prose-invert max-w-none text-gray-400 font-light leading-relaxed mb-10">
              <p>{product.description}</p>
            </div>

            {/* Nuty Zapachowe */}
            <div className="mb-10">
                <h3 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">Główne Nuty Zapachowe</h3>
                <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                        <span key={note} className="px-4 py-2 border border-gray-dark rounded-full text-xs text-gray-300 bg-gray-dark/20">
                            {note}
                        </span>
                    ))}
                </div>
            </div>

            {/* Client Component z konfiguracją ilości/pojemności i dodaniem do koszyka */}
            <AddToCartSection product={product} />

          </div>
        </div>
      </div>
    </div>
  );
}
