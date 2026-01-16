'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MdDelete, MdAdd, MdRemove, MdShoppingCart, MdArrowForward, MdLocalMall } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCart = () => {
            const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(savedCart);
            setIsLoading(false);
        };
        fetchCart();
    }, []);

    const updateQuantity = (id, delta) => {
        const updatedCart = cart.map(item => {
            if (item.id === id || item._id === id) {
                const newQty = Math.max(1, (item.quantity || 1) + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => (item.id !== id && item._id !== id));
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Shipping Details',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Full Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Shipping Address">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Phone Number">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Confirm Order',
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const address = document.getElementById('swal-input2').value;
                const phone = document.getElementById('swal-input3').value;
                if (!name || !address || !phone) {
                    Swal.showValidationMessage('Please fill in all fields');
                    return false;
                }
                return { name, address, phone };
            }
        });

        if (formValues) {
            Swal.fire({
                title: 'Processing Order...',
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Simulate API call to save order
            try {
                const orderData = {
                    items: cart,
                    shipping: formValues,
                    total: total,
                    status: 'Processing',
                    createdAt: new Date(),
                    userEmail: 'user@example.com' // Should ideally come from auth
                };

                const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (res.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Placed!',
                        text: 'Your order has been placed successfully.',
                        confirmButtonText: 'Great!'
                    });
                    localStorage.setItem('cart', JSON.stringify([]));
                    setCart([]);
                    window.dispatchEvent(new Event('cartUpdated'));
                } else {
                    Swal.fire('Error', 'Failed to place order', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background-dark/30 transition-colors">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-20 py-12">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <MdLocalMall className="text-3xl text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Shopping Cart</h1>
                        <p className="text-[#4c669a] dark:text-gray-400">Review your items and proceed to checkout</p>
                    </div>
                </div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id || item._id} className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all">
                                    <div
                                        className="w-24 h-24 rounded-xl bg-cover bg-center bg-gray-100 flex-shrink-0"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-[#4c669a] dark:text-gray-400 mb-2">{item.category}</p>
                                        <p className="text-primary font-black text-xl">${parseFloat(item.price).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id || item._id, -1)}
                                                className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors text-[#4c669a] dark:text-gray-400"
                                            >
                                                <MdRemove />
                                            </button>
                                            <span className="w-10 text-center font-bold">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id || item._id, 1)}
                                                className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors text-[#4c669a] dark:text-gray-400"
                                            >
                                                <MdAdd />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id || item._id)}
                                            className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                            title="Remove"
                                        >
                                            <MdDelete className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-3xl p-8 sticky top-28 shadow-xl">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-[#4c669a] dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-[#0d121b] dark:text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#4c669a] dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className="font-bold text-[#0d121b] dark:text-white">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-[#cfd7e7] dark:bg-gray-800 my-4"></div>
                                    <div className="flex justify-between text-xl font-black">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 mb-4"
                                >
                                    <span>Checkout</span>
                                    <MdArrowForward className="text-xl" />
                                </button>
                                <Link href="/products" className="block text-center text-[#4c669a] dark:text-gray-400 text-sm font-bold hover:text-primary transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-background-dark border border-[#cfd7e7] dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-8">
                            <MdShoppingCart className="text-7xl text-gray-300 dark:text-gray-700" />
                        </div>
                        <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
                        <p className="text-[#4c669a] dark:text-gray-400 mb-10 max-w-sm mx-auto">Looks like you haven&apos;t added any products to your cart yet. Let&apos;s find something you love!</p>
                        <Link href="/products" className="bg-primary hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center gap-3">
                            <MdLocalMall />
                            Discover Products
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
