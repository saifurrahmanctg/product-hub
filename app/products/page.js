import { getProducts } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ProductsPageContent from '@/components/ProductsPageContent';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 lg:px-20 py-8 min-h-screen">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Link className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="/">
                        Home
                    </Link>
                    <span className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                    <span className="text-[#0d121b] dark:text-white text-sm font-medium leading-normal">Shop All Products</span>
                </div>

                <ProductsPageContent initialProducts={products} />
            </main>
            <Footer />
        </>
    );
}
