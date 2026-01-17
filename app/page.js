import { getDatabase } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    FaUserPlus,
    FaShoppingBag,
    FaShieldAlt,
    FaHeart,
    FaStar,
    FaCamera,
    FaGamepad,
    FaMobileAlt,
    FaClock,
    FaCouch,
    FaTshirt,
    FaGem,
    FaCheckCircle,
    FaLock,
    FaHeadset,
    FaArrowRight
} from 'react-icons/fa';

export const dynamic = 'force-dynamic';

import { getProducts } from '@/lib/db';

async function getTrendingProducts() {
    const products = await getProducts();
    return products.slice(0, 4);
}

export default async function Home() {
    const trendingProducts = await getTrendingProducts();

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 py-12">
                <div className="flex flex-col-reverse gap-10 md:flex-row items-center">
                    <div className="flex flex-col gap-8 md:w-1/2">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl text-[#0d121b] dark:text-white">
                                Discover, Buy, and Sell the Best Products Online.
                            </h1>
                            <p className="text-base text-[#4c669a] dark:text-gray-400 max-w-lg leading-relaxed">
                                Join thousands of users in the most trusted modern producthub. From vintage finds to the latest tech, find what you&apos;re looking for today.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products" className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-8 text-base font-bold transition-all shadow-xl shadow-primary/30 flex items-center justify-center">
                                Explore Products
                            </Link>
                            <button className="bg-white dark:bg-white/5 border border-[#cfd7e7] dark:border-white/10 rounded-lg h-12 px-8 text-base font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all">
                                How it Works
                            </button>
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-[#e7ebf3] dark:border-white/10">
                            <div className="flex -space-x-3">
                                <div className="size-10 rounded-full border-2 border-white dark:border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')" }}></div>
                                <div className="size-10 rounded-full border-2 border-white dark:border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')" }}></div>
                                <div className="size-10 rounded-full border-2 border-white dark:border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/46.jpg')" }}></div>
                            </div>
                            <p className="text-sm font-medium text-[#4c669a] dark:text-gray-400">Join 12,000+ happy buyers this month</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl shadow-2xl" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")' }}></div>
                    </div>
                </div>
            </section>

            {/* Section 1: How it Works */}
            <section className="bg-white dark:bg-background-dark/50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white">How it Works</h2>
                        <p className="text-[#4c669a] dark:text-gray-400 mt-2">Get started in three simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-4 rounded-xl border border-[#cfd7e7] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 hover:border-primary/50 transition-colors">
                            <div className="bg-primary/10 text-primary size-12 rounded-lg flex items-center justify-center">
                                <FaUserPlus className="text-3xl" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold">Create Account</h3>
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm leading-relaxed">Sign up in seconds and join our community. Verification is instant and secure.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl border border-[#cfd7e7] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 hover:border-primary/50 transition-colors">
                            <div className="bg-primary/10 text-primary size-12 rounded-lg flex items-center justify-center">
                                <FaShoppingBag className="text-3xl" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold">List Products</h3>
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm leading-relaxed">Upload your items with photos and descriptions. Reach thousands of buyers instantly.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl border border-[#cfd7e7] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 hover:border-primary/50 transition-colors">
                            <div className="bg-primary/10 text-primary size-12 rounded-lg flex items-center justify-center">
                                <FaShieldAlt className="text-3xl" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold">Secure Trade</h3>
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm leading-relaxed">Transactions are protected by our escrow system. Buy and sell with total confidence.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Featured Categories */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                <div className="flex justify-between items-end mb-10 px-4">
                    <div>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white">Featured Categories</h2>
                        <p className="text-[#4c669a] dark:text-gray-400 mt-2">Browse items by category</p>
                    </div>
                    <Link href="/products" className="text-primary font-bold flex items-center gap-2 hover:underline">
                        View All <FaArrowRight />
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Electronics', icon: FaCamera, color: 'bg-blue-500', items: '1,200+' },
                        { name: 'Fashion', icon: FaTshirt, color: 'bg-pink-500', items: '3,400+' },
                        { name: 'Home', icon: FaCouch, color: 'bg-orange-500', items: '800+' },
                        { name: 'Gaming', icon: FaGamepad, color: 'bg-purple-500', items: '500+' }
                    ].map((cat) => (
                        <Link href="/products" key={cat.name} className="relative group overflow-hidden rounded-2xl h-48">
                            <div className={`absolute inset-0 ${cat.color} transition-transform duration-500 group-hover:scale-110`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <cat.icon className="text-3xl mb-2" />
                                <h4 className="text-xl font-bold">{cat.name}</h4>
                                <p className="text-white/80 text-sm">{cat.items} Items</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Section 3: Trending Products */}
            <section className="bg-[#f0f2f7] dark:bg-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#0d121b] dark:text-white">Trending Products</h2>
                        <p className="text-[#4c669a] dark:text-gray-400 mt-2">The most popular products available right now</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingProducts.length > 0 ? (
                            trendingProducts.map((product, idx) => (
                                <div key={idx} className="bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#e7ebf3] dark:border-white/10 group">
                                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform" style={{ backgroundImage: `url('${product.image || 'https://via.placeholder.com/400'}')` }}></div>
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full p-2 text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors">
                                            <FaHeart className="text-sm" />
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-base truncate">{product.name}</h4>
                                            <span className="text-primary font-black">${product.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaStar className="text-yellow-400 text-sm" />
                                            <span className="text-xs font-semibold">{product.rating || '4.5'} ({product.reviews || '0'} reviews)</span>
                                        </div>
                                        <Link href={`/products/${product.id}`} className="w-full mt-3 bg-background-light dark:bg-white/10 text-sm font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-center">
                                            Quick View
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [...Array(4)].map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-background-dark rounded-xl h-80 animate-pulse border border-[#e7ebf3] dark:border-white/10"></div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Section 4: Why Choose Us */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}></div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#0d121b] dark:text-white">Why Choose ProductHub?</h2>
                            <p className="text-[#4c669a] dark:text-gray-400 mt-4 leading-relaxed">We provide a platform that balances security for sellers and quality for buyers. Our mission is to make online commerce accessible and safe for everyone.</p>
                        </div>
                        <div className="grid gap-6">
                            {[
                                { icon: FaCheckCircle, title: 'Verified Sellers', desc: 'Every seller goes through a rigorous identity verification process.' },
                                { icon: FaLock, title: 'Secure Payments', desc: 'We use industry-standard encryption to protect every transaction.' },
                                { icon: FaHeadset, title: '24/7 Support', desc: 'Our dedicated support team is available around the clock for any assistance.' }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 bg-primary/10 text-primary size-10 rounded-full flex items-center justify-center">
                                        <feature.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{feature.title}</h4>
                                        <p className="text-sm text-[#4c669a] dark:text-gray-400">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Testimonials */}
            <section className="bg-primary/5 dark:bg-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Alex Rivera', role: 'Verified Buyer', quote: 'I found a rare vintage lens I\'d been looking for years. The purchase was smooth and the product arrived exactly as described.', rating: 5, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
                            { name: 'Sarah Jenkins', role: 'Pro Seller', quote: 'Selling my electronics was never this easy. The listing tool is intuitive and I got my first offer within hours.', rating: 5, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
                            { name: 'Michael Chen', role: 'Enthusiast', quote: 'ProductHub\'s escrow system makes me feel safe buying from independent sellers. Highly recommend to everyone.', rating: 4, image: 'https://randomuser.me/api/portraits/men/46.jpg' }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white dark:bg-background-dark p-8 rounded-xl border border-[#cfd7e7] dark:border-white/10 shadow-sm">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="italic text-[#4c669a] dark:text-gray-400 mb-6">&quot;{testimonial.quote}&quot;</p>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-cover" style={{ backgroundImage: `url('${testimonial.image}')` }}></div>
                                    <div>
                                        <h5 className="font-bold text-sm">{testimonial.name}</h5>
                                        <p className="text-xs text-[#4c669a]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Statistics */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { number: '1.2K+', label: 'Active Sellers' },
                        { number: trendingProducts.length * 10 + '+', label: 'Products Listed' },
                        { number: '24/7', label: 'Customer Care' },
                        { number: '99%', label: 'Happy Users' }
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="text-4xl font-black text-primary">{stat.number}</span>
                            <span className="text-sm font-bold text-[#4c669a] dark:text-gray-400 uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 7: Newsletter */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                    <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col items-center text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-black/10 rounded-full"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl font-bold mb-6">Stay ahead of the curve</h2>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">Subscribe to our newsletter and get exclusive access to new product listings, market trends, and special offers.</p>
                            <form className="flex flex-col sm:flex-row gap-4 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 rounded-xl h-14 px-6 text-[#0d121b] focus:ring-4 focus:ring-white/20 outline-none transition-all"
                                />
                                <button className="bg-[#0d121b] hover:bg-black text-white px-8 rounded-xl h-14 font-bold transition-all shadow-lg">
                                    Join Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
