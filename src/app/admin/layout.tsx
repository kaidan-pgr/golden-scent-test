"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && sessionStorage.getItem('golden_admin') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('golden_admin', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Nieprawidłowe dane logowania. Użyj admin / admin123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('golden_admin');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-foreground tracking-widest uppercase">
            Panel <span className="text-gold">Admina</span>
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-dark/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-dark border-t-gold border-t-2">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Login</label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-dark bg-background rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Hasło</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-dark bg-background rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-foreground"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-gold hover:bg-gold-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-gold transition-colors"
                >
                  Zaloguj się
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar dla admina */}
      <nav className="bg-gray-dark border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin/dashboard" className="text-gold font-serif text-xl font-bold">
                  GOLDEN<span className="text-white">ADMIN</span>
                </Link>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin/products" className="border-transparent text-gray-300 hover:border-gold hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                  <Package className="mr-2 h-4 w-4" />
                  Produkty
                </Link>
                <Link href="/admin/orders" className="border-transparent text-gray-300 hover:border-gold hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Zamówienia
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-gold focus:outline-none transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Główna zawartość admina */}
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
