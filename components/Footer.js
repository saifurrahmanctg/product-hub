import Link from 'next/link';
import { MdPublic, MdAlternateEmail, MdRssFeed } from 'react-icons/md';
import { FaCube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-[#e7ebf3] dark:border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <FaCube className="size-6" />
                            <h2 className="text-lg font-bold text-[#0d121b] dark:text-white">ProductHub</h2>
                        </div>
                        <p className="text-[#4c669a] dark:text-gray-400 text-sm mb-6">
                            The modern destination for buying and selling anything with security and speed.
                        </p>
                        <div className="flex gap-4">
                            <Link className="text-[#4c669a] hover:text-primary" href="#">
                                <MdPublic className="text-2xl" />
                            </Link>
                            <Link className="text-[#4c669a] hover:text-primary" href="#">
                                <MdAlternateEmail className="text-2xl" />
                            </Link>
                            <Link className="text-[#4c669a] hover:text-primary" href="#">
                                <MdRssFeed className="text-2xl" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="flex flex-col gap-3 text-sm text-[#4c669a] dark:text-gray-400">
                            <li><Link className="hover:text-primary" href="#">About Us</Link></li>
                            <li><Link className="hover:text-primary" href="#">Careers</Link></li>
                            <li><Link className="hover:text-primary" href="#">News</Link></li>
                            <li><Link className="hover:text-primary" href="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="flex flex-col gap-3 text-sm text-[#4c669a] dark:text-gray-400">
                            <li><Link className="hover:text-primary" href="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary" href="#">Safety Center</Link></li>
                            <li><Link className="hover:text-primary" href="#">Community Guidelines</Link></li>
                            <li><Link className="hover:text-primary" href="#">Refund Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="flex flex-col gap-3 text-sm text-[#4c669a] dark:text-gray-400">
                            <li><Link className="hover:text-primary" href="#">Terms of Service</Link></li>
                            <li><Link className="hover:text-primary" href="#">Privacy Policy</Link></li>
                            <li><Link className="hover:text-primary" href="#">Cookie Policy</Link></li>
                            <li><Link className="hover:text-primary" href="#">Compliance</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#e7ebf3] dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#4c669a] dark:text-gray-500">© 2024 ProductHub. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-[#4c669a] dark:text-gray-500">
                        <Link href="#">Privacy</Link>
                        <Link href="#">Terms</Link>
                        <Link href="#">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
