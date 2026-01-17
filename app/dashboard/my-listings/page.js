'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    MdSearch,
    MdNotifications,
    MdAdd,
    MdFilterList,
    MdDownload,
    MdOnlinePrediction,
    MdPendingActions,
    MdCheckCircle,
    MdArrowUpward,
    MdArrowDownward,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdMoreVert,
    MdChevronLeft,
    MdChevronRight,
    MdClose
} from 'react-icons/md';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function MyListingsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const router = useRouter();

    const fetchListings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setListings(data.map(item => ({
                    ...item,
                    id: item._id || item.id,
                    date: new Date(item.createdAt || Date.now()).toLocaleDateString(),
                    views: item.views || Math.floor(Math.random() * 1000),
                    status: item.status || 'ACTIVE'
                })));
            }
        } catch (error) {
            console.error('Failed to fetch listings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
                    fetchListings();
                } else {
                    const data = await res.json();
                    Swal.fire('Error!', data.error || 'Failed to delete product', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', 'Something went wrong', 'error');
            }
        }
    };

    const handleEditClick = (item) => {
        setEditingItem({ ...item });
        setIsEditModalOpen(true);
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/products/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem),
            });

            if (res.ok) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsEditModalOpen(false);
                fetchListings();
            } else {
                const data = await res.json();
                Swal.fire('Error!', data.error || 'Failed to update product', 'error');
            }
        } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error');
        }
    };

    const filteredListings = listings.filter(item => {
        let matchesTab = true;
        if (activeTab === 'Active') matchesTab = item.status === 'ACTIVE' || item.status === 'PENDING';
        else if (activeTab === 'Sold') matchesTab = item.status === 'SOLD';
        else if (activeTab === 'Drafts') matchesTab = item.status === 'DRAFT';

        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <>
            <header className="h-16 flex items-center justify-between border-b border-[#cfd7e7] dark:border-gray-800 bg-white dark:bg-background-dark px-4 md:px-8 sticky top-0 z-10 transition-colors">
                <div className="flex-1 max-w-md hidden md:block">
                    <label className="relative flex items-center">
                        <MdSearch className="absolute left-3 text-[#4c669a] text-xl" />
                        <input
                            className="w-full pl-10 pr-4 py-2 rounded-lg border-none bg-background-light dark:bg-gray-800 text-[#0d121b] dark:text-white placeholder:text-[#4c669a] focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                            placeholder="Search your listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </label>
                </div>
                {/* Mobile Search Icon? Maybe just hide search on mobile for now or show simplified */}
                <div className="md:hidden flex-1 mr-4">
                    {/* Simple mobile search input that shrinks */}
                    <div className="relative">
                        <MdSearch className="absolute left-2 top-2.5 text-[#4c669a]" />
                        <input
                            className="w-full pl-8 pr-2 py-2 rounded-lg bg-background-light dark:bg-gray-800 text-sm"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="flex items-center justify-center p-2 rounded-lg bg-background-light dark:bg-gray-800 text-[#0d121b] dark:text-white hover:bg-[#e7ebf3] dark:hover:bg-gray-700 transition-colors relative">
                        <MdNotifications className="text-xl" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                    </button>
                    <div className="h-8 w-[1px] bg-[#cfd7e7] dark:bg-gray-800 mx-2 hidden md:block"></div>
                    <Link href="/dashboard/add-product" className="bg-primary text-white text-sm font-bold px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm">
                        <MdAdd className="text-lg" />
                        <span className="hidden md:inline">Add New Product</span>
                        <span className="md:hidden">Add</span>
                    </Link>
                </div>
            </header>

            <div className="p-4 md:p-8 w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <p className="text-[#0d121b] dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-tight">My Listings</p>
                        <p className="text-[#4c669a] dark:text-gray-400 mt-1 text-sm md:text-base">Manage and track your producthub inventory</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 text-sm font-bold bg-white dark:bg-gray-800 hover:bg-background-light dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
                            <MdFilterList className="text-lg" />
                            Filters
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-700 text-sm font-bold bg-white dark:bg-gray-800 hover:bg-background-light dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
                            <MdDownload className="text-lg" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats Grid - Responsive cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm">
                        <div className="flex justify-between items-start">
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Items</p>
                            <MdOnlinePrediction className="text-primary text-2xl" />
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-[#0d121b] dark:text-white text-3xl font-bold leading-none">
                                {listings.filter(i => i.status === 'ACTIVE').length}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm">
                        <div className="flex justify-between items-start">
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Pending Items</p>
                            <MdPendingActions className="text-orange-400 text-2xl" />
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-[#0d121b] dark:text-white text-3xl font-bold leading-none">
                                {listings.filter(i => i.status === 'PENDING').length}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 bg-white dark:bg-background-dark shadow-sm">
                        <div className="flex justify-between items-start">
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Sold Items</p>
                            <MdCheckCircle className="text-green-500 text-2xl" />
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-[#0d121b] dark:text-white text-3xl font-bold leading-none">
                                {listings.filter(i => i.status === 'SOLD').length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs - Overflow managed automatically */}
                <div className="mb-6">
                    <div className="flex border-b border-[#cfd7e7] dark:border-gray-800 gap-8 overflow-x-auto pb-1 hide-scrollbar">
                        {['All', 'Active', 'Sold', 'Drafts'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 border-b-2 pb-4 px-1 min-w-max transition-colors ${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-[#4c669a] dark:text-gray-400 hover:text-[#0d121b] dark:hover:text-white'
                                    }`}
                            >
                                <p className="text-sm font-bold">{tab === 'All' ? 'All Listings' : tab}</p>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-[#e7ebf3] dark:bg-gray-800 text-[#4c669a]'
                                    }`}>
                                    {tab === 'All' ? listings.length :
                                        tab === 'Active' ? listings.filter(i => i.status === 'ACTIVE').length :
                                            tab === 'Sold' ? listings.filter(i => i.status === 'SOLD').length :
                                                listings.filter(i => i.status === 'DRAFT').length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listings Table - Overflow managed */}
                <div className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-background-light dark:bg-gray-800/50">
                                    <th className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Views</th>
                                    <th className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cfd7e7] dark:divide-gray-800">
                                {filteredListings.length > 0 ? (
                                    filteredListings.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-12 h-12 rounded-lg bg-center bg-no-repeat bg-cover flex-shrink-0 bg-gray-100 ${item.status === 'SOLD' ? 'grayscale opacity-70' : ''}`}
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></div>
                                                    <div>
                                                        <p className="text-[#0d121b] dark:text-white font-bold text-sm truncate max-w-[200px]">{item.name}</p>
                                                        <p className="text-[#4c669a] dark:text-gray-500 text-xs">{item.category} • {item.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.status === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : item.status === 'SOLD'
                                                        ? 'bg-[#e7ebf3] text-[#4c669a] dark:bg-gray-800 dark:text-gray-400'
                                                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 font-bold text-sm ${item.status === 'SOLD' ? 'text-[#4c669a] dark:text-gray-400' : 'text-[#0d121b] dark:text-white'}`}>
                                                {item.price}
                                            </td>
                                            <td className="px-6 py-4 text-[#4c669a] dark:text-gray-400 text-sm">{item.views}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(item)}
                                                        className="p-1.5 rounded-lg hover:bg-[#e7ebf3] dark:hover:bg-gray-700 text-[#4c669a] dark:text-gray-400 transition-colors"
                                                    >
                                                        {item.status === 'SOLD' ? <MdVisibility className="text-lg" /> : <MdEdit className="text-lg" />}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(item.id)}
                                                        className={`p-1.5 rounded-lg hover:bg-[#e7ebf3] dark:hover:bg-gray-700 text-[#4c669a] dark:text-gray-400 transition-colors ${item.status !== 'SOLD' && 'hover:bg-red-50 text-red-500'}`}
                                                    >
                                                        {item.status === 'SOLD' ? <MdMoreVert className="text-lg" /> : <MdDelete className="text-lg" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-[#4c669a] dark:text-gray-400 text-sm">
                                            {searchQuery ? `No results found for "${searchQuery}"` : 'No listings found.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 border-t border-[#cfd7e7] dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs font-semibold text-[#4c669a] dark:text-gray-500">
                            {filteredListings.length > 0
                                ? `Showing 1 to ${filteredListings.length} of ${filteredListings.length}`
                                : 'No results'}
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 border border-[#cfd7e7] dark:border-gray-700 rounded-lg text-[#4c669a] hover:bg-background-light dark:hover:bg-gray-800 disabled:opacity-50" disabled>
                                <MdChevronLeft className="text-base" />
                            </button>
                            <button className="p-2 border border-[#cfd7e7] dark:border-gray-700 rounded-lg text-[#4c669a] hover:bg-background-light dark:hover:bg-gray-800">
                                <MdChevronRight className="text-base" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white dark:bg-background-dark w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b border-[#cfd7e7] dark:border-gray-800 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Edit Product</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                    <MdClose className="text-xl" />
                                </button>
                            </div>
                            <form onSubmit={updateProduct} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#4c669a]">Product Name</label>
                                    <input
                                        className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                        value={editingItem.name}
                                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#4c669a]">Price ($)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                            value={editingItem.price}
                                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#4c669a]">Category</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                            value={editingItem.category}
                                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                        >
                                            <option value="Electronics">Electronics</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Home & Living">Home & Living</option>
                                            <option value="Beauty">Beauty</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#4c669a]">Description</label>
                                    <textarea
                                        className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 h-24"
                                        value={editingItem.description}
                                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 px-6 py-2.5 rounded-lg border border-[#cfd7e7] dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
