import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Automatycznie przekierowuje użytkowników logujących się na czysty /admin 
  // prosto do odpowiedniej i gotowej platformy podrzędnej wewnątrz /admin/products/new
  redirect('/admin/products/new');
}
