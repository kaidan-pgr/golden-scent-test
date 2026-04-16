import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 Async params
) {
  try {
    const { id } = await params;
    const DB = getRequestContext().env.DB;
    
    const { success } = await DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();

    if (success) {
      return NextResponse.json({ success: true, message: 'Usunięto produkt.' });
    }
    return NextResponse.json({ success: false, error: 'Błąd podczas usuwania' }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, brand, description, price, imageUrl, gender, notes } = body;

    const DB = getRequestContext().env.DB;
    const stringifiedNotes = Array.isArray(notes) ? JSON.stringify(notes) : notes;

    const { success } = await DB.prepare(`
      UPDATE products 
      SET name = ?, brand = ?, description = ?, price = ?, image_url = ?, gender = ?, notes = ?
      WHERE id = ?
    `).bind(name, brand, description, price, imageUrl, gender, stringifiedNotes, id).run();

    if (success) {
      return NextResponse.json({ success: true, message: 'Zaktualizowano produkt' });
    }
    return NextResponse.json({ success: false, error: 'Błąd podczas aktualizacji w D1' }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
