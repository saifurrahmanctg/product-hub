'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaArrowRight, FaChevronLeft, FaChevronRight, FaChevronDown, FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdDevices, MdCheckroom, MdHome, MdAutoFixHigh, MdSportsSoccer, MdFilterList, MdShoppingCart } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function ProductsPageContent({ initialProducts }) {
    const [products, setItems] = useState(initialProducts || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [favItems, setFavItems] = useState([]);

    useEffect(() => {
        const savedFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavItems(savedFavs);
    }, []);

    const toggleFavorite = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const currentFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const exists = currentFavs.find(fav => fav.id === item.id);

        let newFavs;
        if (exists) {
            newFavs = currentFavs.filter(fav => fav.id !== item.id);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Removed from favorites',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            newFavs = [...currentFavs, item];
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
        setFavItems(newFavs);
    };

    const addToCart = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const exists = currentCart.find(cartItem => cartItem.id === item.id);

        let newCart;
        if (exists) {
            newCart = currentCart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
            );
        } else {
            newCart = [...currentCart, { ...item, quantity: 1 }];
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

    // Categories with icons
    const categories = [
        { name: 'All', icon: null },
        { name: 'Electronics', icon: MdDevices },
        { name: 'Fashion', icon: MdCheckroom },
        { name: 'Home & Living', icon: MdHome },
        { name: 'Beauty', icon: MdAutoFixHigh },
        { name: 'Sports', icon: MdSportsSoccer }
    ];

    // Filter products
    const filteredItems = products.filter(item => {
        // Search filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            return false;
        }

        // Price filter
        if (priceMin && item.price < parseFloat(priceMin)) {
            return false;
        }
        if (priceMax && item.price > parseFloat(priceMax)) {
            return false;
        }

        // Rating filter
        if (selectedRating > 0 && parseFloat(item.rating) < selectedRating) {
            return false;
        }

        return true;
    });

    // Sort products
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const applyPriceFilter = () => {
        setSearchQuery(searchQuery);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation & Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-[#e7ebf3] dark:border-gray-700 font-bold shadow-sm"
                    >
                        <div className="flex items-center gap-2 text-[#0d121b] dark:text-white">
                            <MdFilterList className="text-xl" />
                            <span>Filters</span>
                        </div>
                        <span className="text-primary text-sm font-bold">{isFilterOpen ? 'Hide' : 'Show'}</span>
                    </button>
                </div>

                <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block sticky top-24 flex flex-col gap-8`}>
                    {/* Categories */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#0d121b] dark:text-white text-base font-bold leading-normal uppercase tracking-wider text-xs">
                            Categories
                        </h1>
                        <div className="flex flex-col gap-1">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = selectedCategory === category.name;

                                return (
                                    <div
                                        key={category.name}
                                        onClick={() => {
                                            setSelectedCategory(category.name);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-[#4c669a] dark:text-gray-400 hover:text-[#0d121b] dark:hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {Icon && <Icon className="text-[20px]" />}
                                            <p className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                                {category.name}
                                            </p>
                                        </div>
                                        {isActive && <FaChevronDown className="text-[16px]" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter: Price Range */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#0d121b] dark:text-white text-base font-bold leading-normal uppercase tracking-wider text-xs">
                            Price Range
                        </h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-full h-10 px-3 rounded-lg border-none bg-[#e7ebf3] dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary dark:text-white"
                                    placeholder="Min"
                                    type="number"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                />
                                <span className="text-[#4c669a]">-</span>
                                <input
                                    className="w-full h-10 px-3 rounded-lg border-none bg-[#e7ebf3] dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary dark:text-white"
                                    placeholder="Max"
                                    type="number"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    applyPriceFilter();
                                    setIsFilterOpen(false);
                                }}
                                className="w-full py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Apply Price
                            </button>
                        </div>
                    </div>

                    {/* Filter: Rating */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#0d121b] dark:text-white text-base font-bold leading-normal uppercase tracking-wider text-xs">
                            Rating
                        </h1>
                        <div className="flex flex-col gap-2">
                            {[4, 3].map((rating) => (
                                <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        className="w-4 h-4 rounded text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
                                        type="checkbox"
                                        checked={selectedRating === rating}
                                        onChange={(e) => {
                                            setSelectedRating(e.target.checked ? rating : 0);
                                            setIsFilterOpen(false);
                                        }}
                                    />
                                    <span className="flex items-center text-sm text-[#4c669a] dark:text-gray-400 group-hover:text-primary transition-colors">
                                        {[...Array(rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500 text-[18px] mr-0.5" />
                                        ))}
                                        <span className="ml-1">& up</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(selectedCategory !== 'All' || priceMin || priceMax || selectedRating > 0 || searchQuery) && (
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setPriceMin('');
                                setPriceMax('');
                                setSelectedRating(0);
                                setSearchQuery('');
                                setIsFilterOpen(false);
                            }}
                            className="w-full py-2 text-sm font-bold bg-gray-200 dark:bg-gray-700 text-[#0d121b] dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Search and Sorting Bar */}
                <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-background-dark p-4 rounded-xl border border-[#e7ebf3] dark:border-gray-800">
                    <div className="w-full flex-1">
                        <label className="flex flex-col md:min-w-40 h-11 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#4c669a] flex border-none bg-[#e7ebf3] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                                    <FaSearch className="text-[20px]" />
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 border-none bg-[#e7ebf3] dark:bg-gray-800 focus:ring-0 text-[#0d121b] dark:text-white placeholder:text-[#4c669a] px-4 rounded-r-lg text-sm font-normal"
                                    placeholder={`Search products...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="flex h-11 items-center justify-center rounded-lg bg-[#e7ebf3] dark:bg-gray-800 p-1 md:min-w-[320px] overflow-hidden">
                            {[
                                { value: 'relevance', label: 'Relevance' },
                                { value: 'price-low', label: 'Price: Low' },
                                { value: 'price-high', label: 'Price: High' },
                                { value: 'rating', label: 'Top Rated' }
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all text-[10px] md:text-xs font-bold leading-normal text-center ${sortBy === option.value
                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-[#0d121b] dark:text-white'
                                        : 'text-[#4c669a]'
                                        }`}
                                >
                                    <span className="truncate">{option.label}</span>
                                    <input
                                        className="invisible w-0"
                                        name="sort_option"
                                        type="radio"
                                        value={option.value}
                                        checked={sortBy === option.value}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-[#4c669a] dark:text-gray-400">
                    Showing {sortedItems.length} of {products.length} products
                </div>

                {/* Product Grid */}
                {sortedItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedItems.map((item) => (
                            <div key={item.id} className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <button
                                            onClick={(e) => toggleFavorite(e, item)}
                                            className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${favItems.find(fav => fav.id === item.id)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white/90 dark:bg-gray-800/90 text-red-500'}`}
                                        >
                                            {favItems.find(fav => fav.id === item.id) ? <FaHeart /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-2">
                                    <h3 className="text-lg font-bold text-[#0d121b] dark:text-white line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-[#4c669a] dark:text-gray-400 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1 mb-3">
                                        <FaStar className="text-yellow-500 text-[18px]" />
                                        <span className="text-xs font-bold dark:text-white">{item.rating}</span>
                                        <span className="text-xs text-[#4c669a]">({item.reviews} reviews)</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/products/${item.id}`}
                                            className="flex-1 bg-white dark:bg-gray-800 text-[#0d121b] dark:text-white border border-[#e7ebf3] dark:border-gray-700 py-2.5 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span>Details</span>
                                            <FaArrowRight className="text-sm" />
                                        </Link>
                                        <button
                                            onClick={(e) => addToCart(e, item)}
                                            className="bg-primary text-white p-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                            title="Add to Cart"
                                        >
                                            <MdShoppingCart className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl text-gray-300 dark:text-gray-700 mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-[#0d121b] dark:text-white mb-2">No products found</h3>
                        <p className="text-[#4c669a] dark:text-gray-400 mb-6">Try adjusting your filters or search query</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setPriceMin('');
                                setPriceMax('');
                                setSelectedRating(0);
                                setSearchQuery('');
                            }}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {sortedItems.length > 0 && (
                    <div className="flex items-center justify-center gap-2 py-8">
                        <button className="p-2 rounded-lg bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white hover:bg-primary hover:text-white transition-all">
                            <FaChevronLeft className="text-[20px]" />
                        </button>
                        <button className="h-10 w-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                        <button className="h-10 w-10 rounded-lg bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
                            2
                        </button>
                        <button className="h-10 w-10 rounded-lg bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
                            3
                        </button>
                        <span className="text-[#4c669a] px-2">...</span>
                        <button className="h-10 w-10 rounded-lg bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
                            12
                        </button>
                        <button className="p-2 rounded-lg bg-[#e7ebf3] dark:bg-gray-800 text-[#0d121b] dark:text-white hover:bg-primary hover:text-white transition-all">
                            <FaChevronRight className="text-[20px]" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
