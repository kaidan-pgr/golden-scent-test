import { getProductById } from '@/lib/db';
import EditProductForm from './EditProductForm';

export const runtime = 'edge';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h2 className="text-2xl font-serif text-red-500 mb-4">Nie znaleziono produktu</h2>
        <p className="text-gray-400">Prawdopodobnie próbujesz edytować zapach, który nie istnieje w bazie lub został skasowany.</p>
      </div>
    );
  }

  return <EditProductForm product={product} />;
}
