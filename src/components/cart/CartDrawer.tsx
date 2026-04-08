"use client";

import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
          <div className="flex h-full flex-col bg-background shadow-xl border-l border-gray-dark">
            
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-6 border-b border-gray-dark">
              <h2 className="text-lg font-serif font-medium text-foreground uppercase tracking-widest">Twoj Koszyk</h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gold transition"
                  onClick={closeCart}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <ShoppingBag className="w-16 h-16 text-gray-dark" />
                  <p className="text-center text-gray-400">Twój koszyk jest pusty.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 px-6 py-2 border border-gold text-gold rounded-full text-sm font-medium hover:bg-gold hover:text-background transition-colors"
                  >
                    Kontynuuj zakupy
                  </button>
                </div>
              ) : (
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-dark">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-dark">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={80}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-foreground">
                              <h3 className="font-serif">{item.name}</h3>
                              <p className="ml-4 whitespace-nowrap">{item.price * item.quantity} zł</p>
                            </div>
                            <p className="mt-1 text-sm text-gold">{item.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            
                            <div className="flex items-center border border-gray-dark rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-gold">
                                <Minus size={14} />
                              </button>
                              <span className="px-3">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-gold">
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              type="button"
                              className="font-medium text-gray-400 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              Usuń
                            </button>

                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-dark px-6 py-6">
                <div className="flex justify-between text-base font-medium text-foreground mb-4">
                  <p>Suma</p>
                  <p className="text-xl">{total} zł</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-400 mb-6">Koszt dostawy i podatki obliczone przy kasie.</p>
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex items-center justify-center rounded-full border border-transparent bg-gold px-6 py-3 text-base font-medium text-background shadow-sm hover:bg-gold-hover transition-colors"
                  >
                    Przejdź do kasy
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
