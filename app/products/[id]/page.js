import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaStar, FaTruck, FaCheckCircle } from 'react-icons/fa';
import ProductActions from '@/components/ProductActions';

export const dynamic = 'force-dynamic';

async function getProduct(id) {
    try {
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');

        let query = {};
        if (ObjectId.isValid(id)) {
            query = { _id: new ObjectId(id) };
        } else {
            query = { $or: [{ id: id }, { id: parseInt(id) }] };
        }

        const product = await collection.findOne(query);
        if (!product) return null;

        return {
            ...product,
            id: String(product._id),
            _id: String(product._id),
            features: Array.isArray(product.features) ? product.features : ['Excellent condition', 'Premium quality', 'Fast shipping'],
            rating: product.rating || '4.5',
            reviews: product.reviews || '24',
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

async function getRelatedProducts(currentId) {
    try {
        const db = await getDatabase();
        const collection = db.collection(process.env.DB_COLLECTION || 'products');
        const related = await collection.find({ _id: { $ne: new ObjectId(currentId) } }).limit(4).toArray();
        return related.map(p => ({
            ...p,
            id: String(p._id),
            _id: String(p._id)
        }));
    } catch (error) {
        return [];
    }
}

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const item = await getProduct(id);

    if (!item) {
        notFound();
    }

    const relatedItems = await getRelatedProducts(item._id);

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 lg:px-20 py-8 min-h-screen">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <Link className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="/">
                        Home
                    </Link>
                    <span className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                    <Link className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="/products">
                        Products
                    </Link>
                    <span className="text-[#4c669a] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                    <span className="text-[#0d121b] dark:text-white text-sm font-medium leading-normal">{item.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${item.image}')` }}
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
                                {item.category}
                            </span>
                            <h1 className="text-4xl font-black text-[#0d121b] dark:text-white mb-4">{item.name}</h1>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-500 text-[24px]" />
                                    <span className="text-xl font-bold">{item.rating}</span>
                                </div>
                                <span className="text-[#4c669a] dark:text-gray-400">({item.reviews} reviews)</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-5xl font-black text-primary">${parseFloat(item.price).toFixed(2)}</span>
                                <span className="text-[#4c669a] dark:text-gray-400 line-through text-xl">${(parseFloat(item.price) * 1.2).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-b border-[#e7ebf3] dark:border-gray-800 py-6">
                            <h3 className="text-xl font-bold mb-4">Description</h3>
                            <p className="text-[#4c669a] dark:text-gray-400 leading-relaxed">{item.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Key Features</h3>
                            <ul className="space-y-3">
                                {item.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <FaCheckCircle className="text-primary text-[20px] mt-0.5 flex-shrink-0" />
                                        <span className="text-[#4c669a] dark:text-gray-400">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ProductActions item={item} />

                        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 mt-4">
                            <div className="flex items-start gap-3">
                                <FaTruck className="text-primary text-[24px] flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-[#0d121b] dark:text-white mb-1">Free Shipping</h4>
                                    <p className="text-sm text-[#4c669a] dark:text-gray-400">On orders over $50. Estimated delivery: 3-5 business days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedItems.map((relatedItem) => (
                            <div key={relatedItem.id} className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all">
                                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform"
                                        style={{ backgroundImage: `url('${relatedItem.image}')` }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-sm line-clamp-1 mb-2">{relatedItem.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-black">${parseFloat(relatedItem.price).toFixed(2)}</span>
                                        <Link href={`/products/${relatedItem.id}`} className="text-primary text-sm font-bold hover:underline">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
