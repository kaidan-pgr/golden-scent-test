"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-foreground">
              GOLDEN<span className="text-gold">SCENT</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-gold transition-colors">
              Początek
            </Link>
            <Link href="/sklep" className="text-sm font-medium hover:text-gold transition-colors">
              Sklep
            </Link>
            <Link href="/o-nas" className="text-sm font-medium hover:text-gold transition-colors">
              O Nas
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleCart} 
              className="relative p-2 text-foreground hover:text-gold transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-background bg-gold rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground focus:outline-none">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-gray-dark px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-gold">Początek</Link>
          <Link href="/sklep" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-gold">Sklep</Link>
          <Link href="/o-nas" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-gold">O Nas</Link>
        </div>
      )}
    </nav>
  );
}
