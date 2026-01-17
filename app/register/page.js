'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaCube } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            Swal.fire({
                title: 'Registration Disabled',
                text: 'Only the demo user is allowed for this application. Please use the demo credentials to log in.',
                icon: 'info',
                confirmButtonText: 'Go to Login'
            }).then(() => {
                router.push('/login');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-solid border-[#e7ebf3] dark:border-gray-800 bg-white dark:bg-background-dark z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between whitespace-nowrap px-6 md:px-10 py-3">
                    <Link href="/" className="flex items-center gap-4 text-[#0d121b] dark:text-white">
                        <div className="text-primary">
                            <FaCube className="size-6 bg-primary text-white p-1 rounded-md" />
                        </div>
                        <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">ProductHub</h2>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden md:inline">Already have an account?</span>
                        <Link href="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/20 transition-colors">
                            Log In
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fc] dark:bg-background-dark/50">
                <div className="w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8">
                    {/* Headline */}
                    <div className="text-center mb-8">
                        <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Create Account</h1>
                        <p className="text-[#4c669a] dark:text-gray-400 text-base mt-2">Join our producthub community today</p>
                    </div>

                    {/* Register Form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">Full Name</label>
                            <input
                                className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] px-4 text-base font-normal transition-all"
                                placeholder="John Doe"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">Email Address</label>
                            <input
                                className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] px-4 text-base font-normal transition-all"
                                placeholder="name@company.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold leading-normal">Password</label>
                            <div className="relative">
                                <input
                                    className="form-input flex w-full rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cfd7e7] dark:border-gray-700 bg-[#f8f9fc] dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] px-4 text-base font-normal transition-all"
                                    placeholder="Create a password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash className="text-[20px]" /> : <FaEye className="text-[20px]" />}
                                </button>
                            </div>
                        </div>

                        <button
                            className="w-full flex items-center justify-center rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-[#4c669a] dark:text-gray-400">
                        Already have an account? <Link className="text-primary font-bold hover:underline" href="/login">Log In</Link>
                    </p>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-[#e7ebf3] dark:border-gray-800 bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto py-6 px-10 text-center">
                    <p className="text-[#4c669a] dark:text-gray-500 text-xs">© 2024 ProductHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
