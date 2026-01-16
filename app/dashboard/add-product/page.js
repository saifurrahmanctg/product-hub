'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function AddProductPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
            setIsLoading(false);
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Show success alert
                Swal.fire({
                    title: 'Product Added!',
                    text: 'Your product is now listed on the producthub.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Reset form or redirect
                    setFormData({
                        name: '',
                        description: '',
                        price: '',
                        category: 'Electronics',
                        image: ''
                    });
                    // Redirect to My Listings in dashboard
                    router.push('/dashboard/my-listings');
                });
            } else {
                Swal.fire('Error', 'Failed to add product. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#0d121b] dark:text-white mb-2">Add New Product</h1>
                <p className="text-[#4c669a] dark:text-gray-400">List your product for sale on the producthub</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 p-6 md:p-8 space-y-6">
                {/* Product Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] px-4 text-base font-normal transition-all"
                        placeholder="e.g., Wireless Headphones Pro"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="form-textarea flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary placeholder:text-[#4c669a] p-4 text-base font-normal transition-all resize-none"
                        placeholder="Describe your product in detail..."
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                        Price (USD) *
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4c669a] font-bold">$</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] pl-8 pr-4 text-base font-normal transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                        Category *
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-select flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal transition-all"
                    >
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home & Living">Home & Living</option>
                        <option value="Sports">Sports</option>
                        <option value="Books">Books</option>
                        <option value="Collectibles">Collectibles</option>
                    </select>
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                        Image URL *
                    </label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] px-4 text-base font-normal transition-all"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Image Preview */}
                {formData.image && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">
                            Image Preview
                        </label>
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-[#e7ebf3] dark:border-gray-800">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${formData.image}')` }}
                            />
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary hover:bg-blue-700 text-white rounded-lg h-12 px-8 text-base font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Adding...' : (
                            <>
                                <FaCheckCircle />
                                <span>Add Product</span>
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/my-listings')}
                        className="bg-white dark:bg-white/5 border border-[#cfd7e7] dark:border-white/10 rounded-lg h-12 px-8 text-base font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all font-display text-[#0d121b] dark:text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/10 flex items-start gap-3">
                <FaInfoCircle className="text-primary text-[20px] mt-0.5" />
                <div>
                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Live Database</p>
                    <p className="text-[#4c669a] dark:text-gray-300 text-sm">
                        Products added here will be saved to your MongoDB database via the API.
                    </p>
                </div>
            </div>
        </div>
    );
}
