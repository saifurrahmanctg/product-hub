'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    MdSearch,
    MdExpandMore,
    MdFilterList,
    MdCheckCircle,
    MdLocalShipping,
    MdCancel,
    MdChevronLeft,
    MdChevronRight,
    MdShoppingBag
} from 'react-icons/md';

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">My Orders</h2>
                    <p className="text-[#4c669a] dark:text-gray-400 text-sm md:text-base">Track and manage your recent producthub purchases.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col px-6 py-3 bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-[#4c669a] uppercase tracking-widest">Total Spent</span>
                        <span className="text-2xl font-black text-primary">
                            ${orders.reduce((acc, order) => acc + (order.total || 0), 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="p-6 border-b border-[#cfd7e7] dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-[#4c669a] uppercase tracking-wider mb-1">Order Placed</p>
                                        <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#4c669a] uppercase tracking-wider mb-1">Total</p>
                                        <p className="text-sm font-bold text-primary">${(order.total || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-[10px] font-bold text-[#4c669a] uppercase tracking-wider mb-1">Ship To</p>
                                        <p className="text-sm font-bold truncate max-w-[150px]">{order.shipping?.name || 'Customer'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wide flex items-center gap-1.5 ${order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                        order.status === 'Shipped' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        <span className="size-1.5 rounded-full bg-current animate-pulse"></span>
                                        {order.status?.toUpperCase()}
                                    </span>
                                    <p className="text-xs text-[#4c669a] font-medium">Order #{(order._id || '').toString().slice(-8).toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col gap-6">
                                    {(order.items || []).map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row items-center gap-6">
                                            <div
                                                className="size-20 rounded-xl bg-cover bg-center bg-gray-100 flex-shrink-0 border border-gray-100 dark:border-gray-800"
                                                style={{ backgroundImage: `url('${item.image}')` }}
                                            ></div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-bold text-[#0d121b] dark:text-white mb-1">{item.name}</h4>
                                                <p className="text-xs text-[#4c669a] dark:text-gray-400 line-clamp-1">{item.description}</p>
                                            </div>
                                            <div className="flex flex-col items-center sm:items-end gap-2">
                                                <button className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-primary/20">
                                                    Track Item
                                                </button>
                                                <Link href={`/products/${item.id || item._id}`} className="text-[10px] font-bold text-[#4c669a] hover:text-primary transition-colors uppercase tracking-tight">
                                                    Write a Review
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-3xl p-16 flex flex-col items-center text-center gap-8 shadow-sm">
                    <div className="size-24 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                        <MdShoppingBag className="text-5xl" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-black">No orders found</h3>
                        <p className="text-[#4c669a] dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                            It looks like you haven&apos;t placed any orders yet. Once you make a purchase, your order history will appear here.
                        </p>
                    </div>
                    <Link href="/products" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/30 active:scale-95">
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
