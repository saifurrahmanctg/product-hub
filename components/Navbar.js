'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FaCube } from 'react-icons/fa';
import { MdMenu, MdClose, MdFavorite, MdShoppingCart } from 'react-icons/md';
import Swal from 'sweetalert2';

import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.length);
        };
        updateCartCount();
        window.addEventListener('storage', updateCartCount);
        // Custom event for same-window updates
        window.addEventListener('cartUpdated', updateCartCount);
        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your session.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Sign Out'
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove('authToken');
                Cookies.remove('userEmail');
                Cookies.remove('userName');
                setIsLoggedIn(false);
                window.location.href = '/';
            }
        });
    };

    return (
        <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e7ebf3] dark:border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        <FaCube className="size-9 text-white bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-lg shadow-primary/20" />
                    </div>
                    <h2 className="text-xl font-black tracking-tight bg-gradient-to-r from-[#0d121b] to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">ProductHub</h2>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                    <nav className="flex items-center gap-8">
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">Home</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="/products">Products</Link>
                        {isLoggedIn && (
                            <>
                                <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
                                <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard/add-product">Add Product</Link>
                            </>
                        )}
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/favorites" title="Favorites" className="text-[#4c669a] dark:text-gray-400 hover:text-primary transition-colors">
                            <MdFavorite className="text-2xl" />
                        </Link>
                        <Link href="/cart" title="Cart" className="text-[#4c669a] dark:text-gray-400 hover:text-primary transition-colors relative">
                            <MdShoppingCart className="text-2xl" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-background-dark">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <ThemeToggle />
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 text-sm font-bold transition-all shadow-lg shadow-red-500/20"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 text-sm font-bold transition-all shadow-lg shadow-primary/20">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-2xl text-[#0d121b] dark:text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#1a2131] border-b border-[#e7ebf3] dark:border-white/10 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
                    <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium" href="/">Home</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium" href="/products">Products</Link>
                    {isLoggedIn && (
                        <>
                            <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium" href="/dashboard">Dashboard</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium" href="/dashboard/add-product">Add Product</Link>
                        </>
                    )}
                    <hr className="border-gray-100 dark:border-gray-800" />
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white rounded-lg px-6 py-3 text-sm font-bold text-center"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="bg-primary text-white rounded-lg px-6 py-3 text-sm font-bold text-center">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
