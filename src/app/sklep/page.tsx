import ProductCard from '@/components/ui/ProductCard';
import { getAllProducts } from '@/lib/db';

export const runtime = 'edge';

export default async function StorePage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Filters sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 border border-gray-dark rounded-xl p-6 bg-gray-dark/10">
            <h2 className="font-serif text-2xl mb-6">Filtruj</h2>
            
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Płeć</h3>
              <ul className="space-y-3">
                {['Damskie', 'Męskie', 'Unisex'].map(gender => (
                  <li key={gender} className="flex items-center">
                    <input type="checkbox" id={`gender-${gender}`} className="rounded border-gray-dark bg-background text-gold focus:ring-gold" />
                    <label htmlFor={`gender-${gender}`} className="ml-3 text-sm text-foreground cursor-pointer">{gender}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Marka</h3>
              <ul className="space-y-3">
                {['Lumière Noire', 'Maison Dorée', 'Atelier du Bois', 'Elixir De Nuit'].map(brand => (
                  <li key={brand} className="flex items-center">
                    <input type="checkbox" id={`brand-${brand}`} className="rounded border-gray-dark bg-background text-gold focus:ring-gold" />
                    <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-foreground cursor-pointer">{brand}</label>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8 flex justify-between items-end">
            <h1 className="font-serif text-4xl">Wszystkie Zapachy</h1>
            <p className="text-gray-400 text-sm">{products.length} produktów</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
