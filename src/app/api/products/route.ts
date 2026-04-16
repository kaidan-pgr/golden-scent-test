import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, brand, description, price, imageUrl, gender, notes } = body;

    // Uzyskujemy dostęp do naszej bazy D1 Cloudflare zadeklarowanej w env.d.ts
    const DB = getRequestContext().env.DB;
    
    // Generowanie pseudolosowego ID
    const id = `prod_${Math.random().toString(36).substr(2, 9)}`;
    const stringifiedNotes = Array.isArray(notes) ? JSON.stringify(notes) : notes;

    // Przekazanie zapytania SQL za pomocą prepare
    const { success } = await DB.prepare(
      `INSERT INTO products (id, name, brand, description, price, image_url, gender, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, name, brand, description, price, imageUrl, gender, stringifiedNotes).run();

    if (success) {
      return NextResponse.json({ success: true, message: 'Produkt został pomyślnie dodany do bazy D1!', id }, { status: 201 });
    } else {
      return NextResponse.json({ success: false, error: 'Błąd podczas wykonywania INSERT w Cloudflare.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error("API POST products error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Wewnętrzny błąd serwera' }, { status: 500 });
  }
}
