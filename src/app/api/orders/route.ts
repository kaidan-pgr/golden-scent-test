import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Symulacja pobrania z bazy D1
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received new order', body);
    
    // Tutaj powinnaby się pojawić integracja ze Stripe lub zapis do D1
    // const paymentIntent = await stripe.paymentIntents.create({...})
    
    return NextResponse.json({ message: 'Zamówienie przyjęte', id: `ord_${Date.now()}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Błąd przetwarzania żądania' }, { status: 400 });
  }
}
