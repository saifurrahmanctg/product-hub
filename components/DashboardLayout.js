'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MdMenu, MdClose } from 'react-icons/md';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white font-display">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-background-dark border-r border-[#cfd7e7] dark:border-gray-800 transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:block lg:flex-shrink-0 lg:h-screen
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'}
        `}
            >
                <div className="h-full relative flex flex-col">
                    {/* Pass a close handler to Sidebar logic if needed, but for now just wrapping it */}
                    <div className="flex-1 overflow-y-auto" onClick={(e) => {
                        // If user clicks a link (which bubbles up), close sidebar on mobile
                        if (window.innerWidth < 1024) {
                            // Optional: check if target is a link. 
                            // For simplicity, just close on any click might be annoying if clicking non-links.
                            // So we rely on the user clicking links.
                            setIsSidebarOpen(false);
                        }
                    }}>
                        <Sidebar />
                    </div>

                    {/* Close Button Mobile (Overlay on top of sidebar content) */}
                    <button
                        className="absolute top-2 right-2 lg:hidden p-2 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 shadow-md border border-gray-100 dark:border-gray-700 transition-colors z-50"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <MdClose className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header Trigger */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-background-dark border-b border-[#cfd7e7] dark:border-gray-800 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors">
                            <MdMenu className="text-2xl" />
                        </button>
                        <span className="font-bold text-lg">Menu</span>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}
