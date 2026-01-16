'use client';

import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

export default function ProductActions({ item }) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            setIsFav(favs.some(f => (f.id === item.id || f._id === item._id)));
        }
    }, [item.id, item._id]);

    const handleFavorite = () => {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const exists = favs.find(f => (f.id === item.id || f._id === item._id));
        let newFavs;
        if (exists) {
            newFavs = favs.filter(f => (f.id !== item.id && f._id !== item._id));
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Removed from favorites',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            newFavs = [...favs, item];
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Added to favorites',
                showConfirmButton: false,
                timer: 1500
            });
        }
        localStorage.setItem('favorites', JSON.stringify(newFavs));
        setIsFav(!exists);
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const exists = cart.find(c => (c.id === item.id || c._id === item._id));
        let newCart;
        if (exists) {
            newCart = cart.map(c => (c.id === item.id || c._id === item._id) ? { ...c, quantity: (c.quantity || 1) + 1 } : c);
        } else {
            newCart = [...cart, { ...item, quantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="flex gap-4 mt-6">
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-blue-700 text-white rounded-lg h-14 px-8 text-lg font-bold transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
            >
                <FaShoppingCart />
                <span>Add to Cart</span>
            </button>
            <button
                onClick={handleFavorite}
                className={`border-2 border-primary rounded-lg h-14 px-8 text-lg font-bold transition-all flex items-center justify-center ${isFav
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white dark:bg-white/5 text-primary hover:bg-primary hover:text-white'}`}
            >
                {isFav ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    );
}
