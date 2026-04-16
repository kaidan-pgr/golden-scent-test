"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notes, setNotes] = useState<string[]>(product.notes || []);
  const [currentNote, setCurrentNote] = useState('');

  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price.toString(),
    imageUrl: product.imageUrl,
    gender: product.gender,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote.trim()]);
      setCurrentNote('');
    }
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price), notes }),
      });
      
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert('Podczas aktualizacji wystąpił błąd: ' + data.error);
      }
    } catch (error) {
      alert('Nie udało się połączyć z API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-dark/20 border border-gold rounded-xl">
        <h2 className="text-2xl font-serif text-gold mb-4 uppercase tracking-widest">Zaktualizowano</h2>
        <p className="text-gray-300 text-center mb-8">Pomyślnie nałożono poprawki na produkt w chmurze.</p>
        <Link href="/admin/products" className="px-6 py-2 bg-foreground text-background font-medium rounded-full hover:bg-gray-300 transition-colors">
          Wróć do listy produktów
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/products" className="text-gray-400 hover:text-gold mr-4 transition-colors">
             <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">Edycja: <span className="text-gold">{product.name}</span></h1>
        </div>
      </div>

      <div className="bg-gray-dark/30 border border-gray-dark rounded-xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nazwa</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Marka</label>
              <input required type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Cena w PLN</label>
              <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Przeznaczenie</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none appearance-none">
                <option value="Damskie">Damskie</option>
                <option value="Męskie">Męskie</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Link do zdjęcia (URL / Unsplash)</label>
              <input required type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none font-mono text-sm" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Pełny Opis Luksusowy</label>
              <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-gray-dark rounded-md px-4 py-3 text-foreground focus:border-gold focus:outline-none leading-relaxed"></textarea>
            </div>

            <div className="md:col-span-2 border-t border-gray-dark pt-6 mt-2">
                <label className="block text-sm text-gray-400 mb-2">Kreator Nut Zapachowych</label>
                <div className="flex gap-2 mb-4">
                    <input 
                       type="text" 
                       value={currentNote} 
                       onChange={(e) => setCurrentNote(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNote())}
                       className="flex-1 bg-background border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" 
                    />
                    <button type="button" onClick={addNote} className="px-4 py-2 bg-gray-dark text-white rounded-md transition-colors"><Plus size={18} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {notes.map((note, index) => (
                        <div key={index} className="flex items-center gap-2 bg-background border border-gold/50 px-3 py-1 rounded-full text-sm">
                            <span className="text-gray-300">{note}</span>
                            <button type="button" onClick={() => removeNote(index)} className="text-red-400 hover:text-red-300">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center px-8 py-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-background tracking-widest uppercase transition-colors ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gold hover:bg-gold-hover'}`}
            >
              {isSubmitting ? 'Aktualizuję chmurę...' : <><Save size={18} className="mr-2" /> Nadpisz zmiany</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
