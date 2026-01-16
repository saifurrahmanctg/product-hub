import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata = {
    title: 'ProductHub - Buy & Sell Online',
    description: 'The modern destination for buying and selling anything with security and speed.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-background-light dark:bg-background-dark font-display text-[#0d121b] dark:text-white transition-colors duration-200">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
