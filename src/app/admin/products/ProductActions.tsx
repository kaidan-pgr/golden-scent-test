"use client";

import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductActions({ productId }: { productId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Czy na pewno chcesz na zawsze usunąć ten produkt z Cloudflare D1?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh(); // Przeładowanie Server Components na stronie aby tabela pozbyła się skasowanego tr'a
      } else {
        alert("Błąd podczas usuwania");
      }
    } catch (err) {
      alert("Brak połączenia api");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-4">
      <Link href={`/admin/products/${productId}/edit`} className="text-gold hover:text-gold-hover transition-colors">
        <Edit size={18} />
      </Link>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
        className={`${isDeleting ? 'text-gray-500 cursor-not-allowed' : 'text-red-500 hover:text-red-400'} transition-colors`}
      >
        <Trash size={18} />
      </button>
    </div>
  );
}
