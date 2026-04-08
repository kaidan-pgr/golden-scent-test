export default function DashboardPage() {
  return (
    <div className="bg-gray-dark/20 p-8 rounded-xl border border-gray-dark">
      <h1 className="text-3xl font-serif text-foreground mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background p-6 rounded-lg border border-gray-dark border-l-gold border-l-4">
          <h3 className="text-gray-400 text-sm tracking-wider uppercase">Suma Sprzedaży (Ten miesiąc)</h3>
          <p className="text-3xl font-serif mt-2 text-foreground">12 450 zł</p>
        </div>
        
        <div className="bg-background p-6 rounded-lg border border-gray-dark border-l-gold border-l-4">
          <h3 className="text-gray-400 text-sm tracking-wider uppercase">Nowe Zamówienia</h3>
          <p className="text-3xl font-serif mt-2 text-foreground">24</p>
        </div>
        
        <div className="bg-background p-6 rounded-lg border border-gray-dark border-l-gold border-l-4">
          <h3 className="text-gray-400 text-sm tracking-wider uppercase">Aktywne Produkty</h3>
          <p className="text-3xl font-serif mt-2 text-foreground">6</p>
        </div>
      </div>
    </div>
  );
}
