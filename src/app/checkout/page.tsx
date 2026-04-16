"use client";

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handlePayU = (e: React.FormEvent) => {
    e.formEvent?.preventDefault();
    e.preventDefault();
    setIsProcessing(true);
    // W przyszłości tutaj odpali się zapytanie do /api/checkout/payu
    setTimeout(() => {
      alert("Rozpoczęcie płatności w PayU! (Ten tryb zostanie włączony po dodaniu kluczy)");
      setIsProcessing(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-serif mb-6 text-foreground">Twój koszyk jest pusty</h1>
        <Link href="/sklep" className="px-8 py-3 bg-gold text-background rounded-full hover:bg-gold-hover font-medium">
          Wróć do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Lewa kolumna - Formularz */}
        <div className="flex-1">
          <Link href="/sklep" className="inline-flex items-center text-sm text-gray-400 hover:text-gold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do sklepu
          </Link>
          <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest mb-8">Kasa</h1>
          
          <form id="checkout-form" onSubmit={handlePayU} className="space-y-8">
            <section>
              <h2 className="text-xl font-serif text-foreground mb-4">1. Dane kontaktowe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Imię</label>
                  <input required type="text" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nazwisko</label>
                  <input required type="text" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Adres e-mail</label>
                  <input required type="email" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Numer telefonu</label>
                  <input required type="tel" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-4">2. Adres dostawy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Ulica i numer domu/lokalu</label>
                  <input required type="text" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Kod pocztowy</label>
                  <input required type="text" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Miejscowość</label>
                  <input required type="text" className="w-full bg-transparent border border-gray-dark rounded-md px-4 py-2 text-foreground focus:border-gold focus:outline-none" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-4">3. Płatność</h2>
              <div className="p-4 border border-gold rounded-md bg-gold/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-white rounded flex items-center justify-center p-1 font-bold text-black border border-gray-300 shadow-sm text-xs">
                    PayU
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">Szybki przelew / BLIK</span>
                    <span className="block text-xs text-gray-400">Bezpieczne płatności przez PayU</span>
                  </div>
                </div>
                <ShieldCheck className="text-gold w-6 h-6" />
              </div>
            </section>
          </form>
        </div>

        {/* Prawa kolumna - Podsumowanie */}
        <div className="w-full lg:w-[450px]">
          <div className="border border-gray-dark rounded-lg p-6 sticky top-24 bg-background z-10 shadow-xl">
            <h2 className="text-xl font-serif text-foreground mb-6 uppercase tracking-wider">Podsumowanie</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 rounded-md overflow-hidden border border-gray-dark flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.brand}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">Ilość: {item.quantity}</span>
                      <span className="text-sm font-medium">{item.price * item.quantity} zł</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-dark pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Wartość produktów</span>
                <span>{subtotal} zł</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Dostawa kurierem</span>
                <span>{shipping} zł</span>
              </div>
              <div className="pt-3 flex justify-between items-center text-lg font-medium text-foreground border-t border-gray-dark">
                <span>Do zapłaty</span>
                <span className="text-gold">{total} zł</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className={`w-full mt-8 py-4 rounded-full font-medium text-background transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 ${
                isProcessing ? 'bg-gray-600 cursor-not-allowed' : 'bg-gold hover:bg-gold-hover'
              }`}
            >
              {isProcessing ? 'Przetwarzanie...' : 'Zamawiam i płacę z PayU'}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Truck className="w-4 h-4" /> Darmowa dostawa od 500 zł
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
