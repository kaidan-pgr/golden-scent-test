import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';
import { getRecentProducts } from '@/lib/db';

export const runtime = 'edge';

export default async function Home() {
  const bestsellers = await getRecentProducts(4);

  return (
    <>
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover object-center brightness-50"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-widest mb-6">
            ESENCJA LUKSUSU
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            Odkryj kolekcję najbardziej ekskluzywnych zapachów, tworzonych z pasją i rzemieślniczą precyzją, by obudzić Twoje zmysły.
          </p>
          <Link 
            href="/sklep"
            className="px-8 py-4 bg-gold text-background font-medium text-lg rounded-full hover:bg-gold-hover transition-colors inline-block tracking-wide uppercase"
          >
            Odkryj Kolekcję
          </Link>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-foreground font-bold tracking-wider uppercase mb-4">Bestsellery</h2>
            <div className="h-1 w-24 bg-gold mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Zapachy najchętniej wybierane przez naszych koneserów. Poznaj zapachy, które definiują współczesną elegancję.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/sklep"
              className="inline-block px-8 py-3 border border-gold text-gold font-medium rounded-full hover:bg-gold hover:text-background transition-colors uppercase tracking-wide text-sm"
            >
              Zobacz wszystkie
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
