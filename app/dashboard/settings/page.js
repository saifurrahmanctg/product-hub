'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
    MdPhotoCamera,
    MdDelete,
    MdWarning
} from 'react-icons/md';

export default function SettingsPage() {
    const [user, setUser] = useState({ name: 'Guest', email: '' });

    useEffect(() => {
        const name = Cookies.get('userName') || 'Guest';
        const email = Cookies.get('userEmail') || '';
        setUser({ name, email });
    }, []);

    return (
        <div className="flex flex-col bg-background-light dark:bg-background-dark min-h-full">
            {/* Header */}
            <header className="px-4 py-6 md:p-8 border-b border-[#cfd7e7] dark:border-gray-800 bg-white dark:bg-background-dark">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Account Settings</h1>
                <p className="text-sm text-[#4c669a] dark:text-gray-400 mt-1">Manage your profile, security, and preferences</p>
            </header>

            {/* Main Content Form */}
            <div className="flex-1 bg-[#f6f6f8] dark:bg-background-dark/50">
                <div className="p-4 md:p-8 space-y-8 pb-32">
                    {/* Profile Picture Section */}
                    <section className="bg-white dark:bg-background-dark rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Profile Picture</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative group">
                                <div className="size-24 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-md text-3xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <MdPhotoCamera className="text-lg" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-3 w-full sm:w-auto text-center sm:text-left">
                                <div className="flex gap-3 justify-center sm:justify-start">
                                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-[#cfd7e7] dark:border-gray-700 rounded-lg text-sm font-bold text-[#0d121b] dark:text-white hover:bg-[#f6f6f8] dark:hover:bg-gray-700 transition-colors">
                                        Upload New Photo
                                    </button>
                                </div>
                                <p className="text-xs text-[#4c669a]">
                                    Recommended: Square JPG, PNG, or WEBP. Max 2MB.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Personal Information */}
                    <section className="bg-white dark:bg-background-dark rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#4c669a] dark:text-gray-400 tracking-wider">Full Name</label>
                                <input
                                    defaultValue={user.name}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[#0d121b] dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-[#4c669a] dark:text-gray-400 tracking-wider">Email Address</label>
                                <div className="relative">
                                    <input
                                        defaultValue={user.email}
                                        type="email"
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-[#f6f6f8] dark:bg-gray-800 text-gray-500 cursor-not-allowed font-medium"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">VERIFIED</span>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-xs font-bold uppercase text-[#4c669a] dark:text-gray-400 tracking-wider">Bio</label>
                                <textarea
                                    placeholder="Tell us about yourself..."
                                    rows="3"
                                    className="w-full px-4 py-2 rounded-lg border border-[#cfd7e7] dark:border-gray-800 bg-background-light dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none text-[#0d121b] dark:text-white"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-white dark:bg-background-dark rounded-xl p-6 border border-[#cfd7e7] dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Security</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-6 border-b border-[#f6f6f8] dark:border-gray-800">
                                <div>
                                    <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                                    <p className="text-xs text-[#4c669a] mt-1">Add an extra layer of security to your account.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                                <MdWarning className="text-xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Delete Account</h3>
                                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Sticky Footer Actions */}
            <footer className="p-4 md:p-6 bg-white dark:bg-background-dark border-t border-[#cfd7e7] dark:border-gray-800 flex justify-end gap-3 sticky bottom-0 z-10">
                <button className="px-6 py-2.5 rounded-lg border border-[#cfd7e7] dark:border-gray-700 text-[#0d121b] dark:text-white font-bold text-sm hover:bg-[#f6f6f8] dark:hover:bg-gray-800 transition-colors">
                    Discard
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Save Changes
                </button>
            </footer>
        </div>
    );
}
