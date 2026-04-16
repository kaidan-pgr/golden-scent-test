import { getRequestContext } from '@cloudflare/next-on-pages';
import { Product } from '@/types';

// Odtwarza format zgodny z Product z Types, wyciągnięty z silnika D1 (ze zignorowaniem snake_case bazy danych)
function mapToProduct(row: any): Product {
    try {
        const notes = typeof row.notes === 'string' ? JSON.parse(row.notes) : [];
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            notes: Array.isArray(notes) ? notes : [],
            gender: row.gender,
            brand: row.brand,
        };
    } catch {
        return {
            id: row.id,
            name: row.name,
            description: row.description || '',
            price: row.price,
            imageUrl: row.image_url,
            notes: [],
            gender: row.gender || 'Unisex',
            brand: row.brand || '',
        };
    }
}

export async function getAllProducts(): Promise<Product[]> {
  const DB = getRequestContext().env.DB;
  const { results } = await DB.prepare(`SELECT * FROM products ORDER BY created_at DESC`).all();
  return results.map(mapToProduct);
}

export async function getRecentProducts(limit: number): Promise<Product[]> {
    const DB = getRequestContext().env.DB;
    const { results } = await DB.prepare(`SELECT * FROM products ORDER BY created_at DESC LIMIT ?`).bind(limit).all();
    return results.map(mapToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
    const DB = getRequestContext().env.DB;
    const result = await DB.prepare(`SELECT * FROM products WHERE id = ?`).bind(id).first();
    if (!result) return null;
    return mapToProduct(result);
}
