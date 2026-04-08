import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest uppercase mb-6 text-foreground">Kim Jesteśmy</h1>
          <div className="h-1 w-24 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop"
              alt="Tworzenie perfum"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
          </div>

          <div className="lg:pl-8">
            <h2 className="font-serif text-3xl md:text-4xl text-gold mb-8">Prawdziwy luksus rodzi się z czasu, pasji i najlepszych surowców.</h2>
            
            <div className="space-y-6 text-gray-300 font-light leading-relaxed">
              <p>
                Założona w sercu Europy, marka <span className="font-semibold text-foreground">Golden Scent</span> powstała z fascynacji starożytną sztuką perfumiarstwa i pragnienia przedefiniowania współczesnego luksusu. Nie podążamy za trendami; tworzymy kompozycje zapachowe, które stają się Twoją osobistą sygnaturą.
              </p>
              <p>
                Każdy nasz flakon to owoc wielomiesięcznej pracy mistrzów perfumiarstwa z Grasse we Francji. Selekcjonujemy najrzadsze składniki – od stuletniego drewna agarowego, przez wanilię z Madagaskaru, kończąc na różach z Taif, zbieranych o świcie.
              </p>
              <p>
                Naszą misją jest oferowanie zapachów, które nie tylko pięknie pachną, ale też budzą głębokie emocje. Od wyboru nut po ręcznie polerowane detale z akcentami złota na flakonach – każdy element naszej pracy odzwierciedla bezkompromisowe dążenie do perfekcji.
              </p>
            </div>

            <div className="mt-12 flex items-center space-x-12">
              <div>
                <p className="font-serif text-3xl text-gold font-bold">10+</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Lat Doświadczenia</p>
              </div>
              <div className="h-12 w-px bg-gray-dark"></div>
              <div>
                <p className="font-serif text-3xl text-gold font-bold">100%</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Naturalne Składniki</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
