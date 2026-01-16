'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    MdShoppingBag,
    MdFavorite,
    MdInventory,
    MdAccountCircle,
    MdTrendingUp,
    MdMoreTime,
    MdFiberManualRecord
} from 'react-icons/md';

export default function DashboardOverviewPage() {
    const [stats, setStats] = useState({
        ordersCount: 0,
        totalSpent: 0,
        favoritesCount: 0,
        listingsCount: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch orders
                const ordersRes = await fetch('/api/orders');
                let orders = [];
                if (ordersRes.ok) {
                    orders = await ordersRes.json();
                    setRecentOrders(orders.slice(0, 3));
                }

                // Fetch products (listings)
                const productsRes = await fetch('/api/products');
                let products = [];
                if (productsRes.ok) {
                    products = await productsRes.json();
                }

                // Get favorites from localStorage
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

                setStats({
                    ordersCount: orders.length,
                    totalSpent: orders.reduce((acc, curr) => acc + (curr.total || 0), 0),
                    favoritesCount: favorites.length,
                    listingsCount: products.length
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Orders', value: stats.ordersCount, icon: MdShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50', link: '/dashboard/order-history' },
        { label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, icon: MdTrendingUp, color: 'text-green-500', bg: 'bg-green-50', link: '/dashboard/order-history' },
        { label: 'Favorites', value: stats.favoritesCount, icon: MdFavorite, color: 'text-red-500', bg: 'bg-red-50', link: '/dashboard/favorites' },
        { label: 'My Listings', value: stats.listingsCount, icon: MdInventory, color: 'text-purple-500', bg: 'bg-purple-50', link: '/dashboard/my-listings' }
    ];

    return (
        <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black tracking-tight mb-2">Dashboard Overview</h1>
                <p className="text-[#4c669a] dark:text-gray-400">Welcome back! Here&apos;s a summary of your activity on ProductHub.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, idx) => (
                    <Link href={stat.link} key={idx} className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} dark:bg-gray-800`}>
                                <stat.icon className="text-2xl" />
                            </div>
                        </div>
                        <p className="text-[#4c669a] dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-[#0d121b] dark:text-white group-hover:text-primary transition-colors">{stat.value}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-[#cfd7e7] dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-black">Recent Orders</h2>
                            <Link href="/dashboard/order-history" className="text-sm font-bold text-primary hover:underline">View All</Link>
                        </div>
                        <div className="p-0">
                            {recentOrders.length > 0 ? (
                                <div className="divide-y divide-[#cfd7e7] dark:divide-gray-800">
                                    {recentOrders.map((order) => (
                                        <div key={order._id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                    #{order._id.toString().slice(-4).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{order.shipping?.name || 'Customer'}</p>
                                                    <p className="text-xs text-[#4c669a]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-sm text-primary">${(order.total || 0).toFixed(2)}</p>
                                                <p className="text-[10px] font-bold text-orange-500 uppercase flex items-center justify-end gap-1">
                                                    <MdFiberManualRecord className="size-2" />
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <MdMoreTime className="text-5xl text-gray-200 mx-auto mb-4" />
                                    <p className="text-[#4c669a] dark:text-gray-400">No recent orders found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Profile Summary */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/30">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2">Sell More!</h3>
                            <p className="text-blue-100 text-sm mb-6">Reach thousands of buyers by listing your products today.</p>
                            <Link href="/dashboard/add-product" className="inline-block bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all text-sm">
                                Create Listing
                            </Link>
                        </div>
                        <MdInventory className="absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12" />
                    </div>

                    <div className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-lg font-black mb-6">Account Status</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <MdAccountCircle className="text-4xl text-[#4c669a]" />
                            </div>
                            <div>
                                <p className="font-bold">Standard Member</p>
                                <p className="text-xs text-green-500 font-bold">Verified Account</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#4c669a]">Trust Score</span>
                                <span className="font-bold text-primary">98%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[98%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
