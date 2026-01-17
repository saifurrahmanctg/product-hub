'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdDeleteSweep, MdFavorite, MdShoppingCart } from 'react-icons/md';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = () => {
            try {
                const savedFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
                setFavorites(savedFavs);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const removeFromFavorites = (id) => {
        const updatedFavs = favorites.filter(item => (item.id !== id && item._id !== id));
        setFavorites(updatedFavs);
        localStorage.setItem('favorites', JSON.stringify(updatedFavs));
    };

    const clearAll = () => {
        setFavorites([]);
        localStorage.setItem('favorites', JSON.stringify([]));
    };

    const addToCart = (item) => {
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const exists = currentCart.find(cartItem => (cartItem.id === item.id || cartItem._id === item._id));

        let newCart;
        if (exists) {
            newCart = currentCart.map(cartItem =>
                (cartItem.id === item.id || cartItem._id === item._id) ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
            );
        } else {
            newCart = [...currentCart, { ...item, quantity: 1 }];
        }

        localStorage.setItem('cart', JSON.stringify(newCart));
        import('sweetalert2').then(Swal => {
            Swal.default.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Added to cart',
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            {/* Header Section */}
            <header className="p-4 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight">My Favorites ({favorites.length})</h1>
                        <p className="text-sm text-[#4c669a] dark:text-gray-400">Items you&apos;ve saved to your wishlist</p>
                    </div>
                    {favorites.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#cfd7e7] dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-[#f6f6f8] dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                            <MdDeleteSweep className="text-lg" />
                            Clear All
                        </button>
                    )}
                </div>
            </header>

            {/* Grid of Favorites */}
            <section className="px-4 md:px-8 pb-12">
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {favorites.map((item) => (
                            <div key={item.id || item._id} className="bg-white dark:bg-background-dark/30 rounded-xl overflow-hidden shadow-sm border border-[#cfd7e7] dark:border-gray-800 group hover:shadow-md transition-all">
                                <div className="relative aspect-square">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                    <button
                                        onClick={() => removeFromFavorites(item.id || item._id)}
                                        className="absolute top-3 right-3 size-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <MdFavorite className="text-lg fill-current" />
                                    </button>
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4c669a]">{item.category}</span>
                                        <h3 className="text-base font-bold truncate">{item.name}</h3>
                                    </div>
                                    <p className="text-lg font-black text-primary">${parseFloat(item.price).toFixed(2)}</p>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <MdShoppingCart className="text-lg" />
                                            Add to Cart
                                        </button>
                                        <Link
                                            href={`/products/${item.id || item._id}`}
                                            className="w-full py-2 text-center text-[#4c669a] dark:text-gray-400 text-xs font-bold hover:text-primary transition-colors uppercase tracking-tight"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center gap-6 py-20">
                        <div className="text-6xl text-gray-300 mb-4 items-center justify-center flex">❤️</div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">No favorites yet</h2>
                            <p className="text-[#4c669a] dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                                Your wishlist is empty. Start exploring our producthub to find items you love and save them for later!
                            </p>
                        </div>
                        <Link href="/products" className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                            Explore Products
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
}
