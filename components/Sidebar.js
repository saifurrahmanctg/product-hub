'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MdDashboard,
    MdInventory,
    MdShoppingBag,
    MdFavorite,
    MdSettings,
    MdSupportAgent,
    MdLogout,
    MdStorefront,
    MdMessage,
    MdPerson,
    MdAddBox
} from 'react-icons/md';
import { FaCube } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();

    const topMenuItems = [
        { name: 'Dashboard', icon: MdDashboard, href: '/dashboard' },
        { name: 'Add Products', icon: MdAddBox, href: '/dashboard/add-product' },
        { name: 'My Listings', icon: MdInventory, href: '/dashboard/my-listings' },
        { name: 'My Orders', icon: MdShoppingBag, href: '/dashboard/order-history' },
        { name: 'Favorites', icon: MdFavorite, href: '/dashboard/favorites' },
    ];

    const bottomMenuItems = [
        { name: 'Profile', icon: MdPerson, href: '/dashboard/profile' },
        { name: 'Settings', icon: MdSettings, href: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your session.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Red-500
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Sign Out'
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove('authToken');
                Cookies.remove('userEmail');
                Cookies.remove('userName');
                window.location.href = '/login';
            }
        });
    };

    const [user, setUser] = useState({ name: 'Guest', email: '', type: 'Buyer' });

    useEffect(() => {
        const name = Cookies.get('userName');
        const email = Cookies.get('userEmail');
        if (name) setUser({ name, email, type: 'Pro Seller' });
    }, []);

    const NavItem = ({ item }) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
            <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-[#4c669a] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-gray-800 font-semibold hover:text-[#0d121b] dark:hover:text-white'
                    }`}
            >
                <Icon className={`text-xl ${isActive ? 'fill-current' : ''}`} />
                <p className="text-sm">{item.name}</p>
            </Link>
        );
    };

    return (
        <aside className="flex flex-col h-full bg-white dark:bg-background-dark font-display">
            <div className="p-6 flex flex-col h-full">
                {/* Top Section */}
                <div className="flex flex-col gap-8">
                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-primary rounded-lg p-2 text-white group-hover:bg-blue-700 transition-colors">
                            <FaCube className="text-2xl" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#0d121b] dark:text-white text-base font-bold leading-none">ProductHub</h1>
                            <p className="text-[#4c669a] dark:text-gray-400 text-xs font-medium">{user.type}</p>
                        </div>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-1">
                        {topMenuItems.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </nav>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-4 mt-8">
                    {/* Bottom Navigation */}
                    <nav className="flex flex-col gap-1">
                        {bottomMenuItems.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </nav>

                    <div className="h-px bg-[#cfd7e7] dark:bg-gray-800 my-1"></div>

                    {/* Sign Out */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                    >
                        <MdLogout className="text-xl" />
                        <p className="text-sm font-semibold">Sign Out</p>
                    </button>

                    {/* User Profile Card */}
                    <div className="flex items-center gap-3 p-3 bg-[#f6f6f8] dark:bg-gray-800 rounded-xl">
                        <div className="bg-primary text-white rounded-full size-10 flex-shrink-0 flex items-center justify-center font-bold text-lg">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-[#0d121b] dark:text-white text-sm font-bold truncate">{user.name}</p>
                            <p className="text-[#4c669a] dark:text-gray-400 text-xs truncate">{user.email || user.type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
