"use client";

import { Order } from '@/types';
import { Eye } from 'lucide-react';

export default function OrdersPage() {
  const mockOrders: Order[] = [
    {
      id: "ord_001",
      customerName: "Anna Kowalska",
      customerEmail: "anna@example.com",
      totalAmount: 1250,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "ord_002",
      customerName: "Piotr Nowak",
      customerEmail: "piotr@test.com",
      totalAmount: 650,
      status: "paid",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];

  return (
    <div className="bg-gray-dark/20 p-8 rounded-xl border border-gray-dark">
      <h1 className="text-3xl font-serif text-foreground mb-8">Zamówienia</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-dark">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Klient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kwota</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-dark">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-dark/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gold">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="font-medium text-foreground">{order.customerName}</div>
                  <div className="text-gray-500">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {order.totalAmount} zł
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gold transition-colors">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
