import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mocks';

// Wymusza uruchomienie na Edge runtime w Next.js/Cloudflare
export const runtime = 'edge';

export async function GET() {
  // Symulacja pobrania z bazy D1
  return NextResponse.json(mockProducts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Tutaj logika zapisu do D1
    console.log('Received new product', body);
    
    return NextResponse.json({ message: 'Produkt dodany', id: `prod_${Date.now()}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Błąd przetwarzania żądania' }, { status: 400 });
  }
}
