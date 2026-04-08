import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-dark py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-foreground">
            GOLDEN<span className="text-gold">SCENT</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            Ekskluzywna kolekcja zapachów z najdalszych zakątków świata. 
            Zapach to luksus, na który możesz sobie pozwolić każdego dnia.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground tracking-wider uppercase mb-4 text-sm">Odkrywaj</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/sklep?gender=Damskie" className="hover:text-gold transition">Perfumy Damskie</Link></li>
            <li><Link href="/sklep?gender=Męskie" className="hover:text-gold transition">Perfumy Męskie</Link></li>
            <li><Link href="/sklep?gender=Unisex" className="hover:text-gold transition">Zapachy Unisex</Link></li>
            <li><Link href="/bestsellery" className="hover:text-gold transition">Bestsellery</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground tracking-wider uppercase mb-4 text-sm">Informacje</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/o-nas" className="hover:text-gold transition">O marce</Link></li>
            <li><Link href="/kontakt" className="hover:text-gold transition">Kontakt</Link></li>
            <li><Link href="/regulamin" className="hover:text-gold transition">Regulamin</Link></li>
            <li><Link href="/polityka-prywatnosci" className="hover:text-gold transition">Polityka Prywatności</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-dark text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Golden Scent. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
