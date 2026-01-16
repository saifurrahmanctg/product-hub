'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
    MdEdit,
    MdLocationOn,
    MdCalendarToday,
    MdStar,
    MdCheckCircle,
    MdStore,
    MdEmail,
    MdPhone
} from 'react-icons/md';

export default function ProfilePage() {
    const [user, setUser] = useState({ name: 'Guest', email: '', type: 'Buyer' });
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const name = Cookies.get('userName') || 'Guest';
        const email = Cookies.get('userEmail') || '';
        setUser({ name, email, type: 'Pro Seller' });

        const fetchListings = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setListings(data.slice(0, 4)); // Show recent listings
                }
            } catch (error) {
                console.error('Failed to fetch listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-[#f6f6f8] dark:bg-background-dark/50 min-h-[calc(100vh-64px)]">
            {/* Profile Banner */}
            <div className="h-48 md:h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="px-4 md:px-8 pb-12 relative">
                {/* Header Card */}
                <div className="relative -mt-20 mb-8">
                    <div className="bg-white dark:bg-background-dark rounded-xl p-6 shadow-sm border border-[#cfd7e7] dark:border-gray-800 flex flex-col md:flex-row gap-6 items-start md:items-end">
                        {/* Avatar */}
                        <div className="relative -mt-16 md:-mt-20 shrink-0">
                            <div className="size-32 md:size-40 rounded-full border-4 border-white dark:border-background-dark shadow-lg bg-primary text-white flex items-center justify-center text-5xl font-black">
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute bottom-2 right-2 bg-green-500 size-6 rounded-full border-2 border-white dark:border-background-dark" title="Online"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pb-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-black text-[#0d121b] dark:text-white truncate">{user.name}</h1>
                                    <p className="text-[#4c669a] dark:text-gray-400 font-medium">{user.type} • Tech Enthusiast</p>
                                </div>
                                <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#cfd7e7] dark:border-gray-700 rounded-lg text-sm font-bold text-[#0d121b] dark:text-white hover:bg-[#f6f6f8] dark:hover:bg-gray-700 transition-colors shadow-sm">
                                    <MdEdit className="text-lg" />
                                    <span>Edit Profile</span>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#4c669a] dark:text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <MdLocationOn className="text-lg" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MdCalendarToday className="text-lg" />
                                    <span>Joined Recently</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MdEmail className="text-lg" />
                                    <span>{user.email || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Stats & About) */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white dark:bg-background-dark rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Seller Stats</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-3 bg-[#f6f6f8] dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
                                            <MdStar className="text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#4c669a] dark:text-gray-400 font-bold uppercase">Rating</p>
                                            <p className="text-lg font-bold">4.9/5</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-[#4c669a]">(12)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#f6f6f8] dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                            <MdStore className="text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#4c669a] dark:text-gray-400 font-bold uppercase">Active Listings</p>
                                            <p className="text-lg font-bold">{listings.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="bg-white dark:bg-background-dark rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">About Me</h3>
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm leading-relaxed">
                                Passionate collector and seller on ProductHub. I take great care in packaging and shipping items quickly. Feel free to message me if you have any questions about my listings!
                            </p>
                            <div className="mt-6 pt-6 border-t border-[#f6f6f8] dark:border-gray-800">
                                <h4 className="text-sm font-bold mb-2">Verifications</h4>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                        <MdCheckCircle className="text-sm" /> Email
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Recent Listings) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Recent Listings</h3>
                            <Link href="/dashboard/my-listings" className="text-primary text-sm font-bold hover:underline">View All</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listings.length > 0 ? (
                                listings.map((item) => (
                                    <Link
                                        href={`/products/${item.id || item._id}`}
                                        key={item.id || item._id}
                                        className="bg-white dark:bg-background-dark rounded-xl p-4 border border-[#cfd7e7] dark:border-gray-800 flex gap-4 hover:shadow-md transition-all group"
                                    >
                                        <div
                                            className="size-24 rounded-lg bg-gray-100 bg-cover bg-center shrink-0 group-hover:scale-105 transition-transform"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        ></div>
                                        <div className="flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-[#0d121b] dark:text-white line-clamp-1">{item.name}</h4>
                                                <p className="text-xs text-[#4c669a] mt-1">{item.category}</p>
                                            </div>
                                            <p className="font-bold text-primary">${parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-2 p-12 text-center bg-white dark:bg-background-dark rounded-xl border border-dashed border-[#cfd7e7] dark:border-gray-800">
                                    <p className="text-[#4c669a]">No active listings found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
