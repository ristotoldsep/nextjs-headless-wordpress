import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SiteHeaderProps {
    className: string;
}

export default function SiteHeader({ className }: SiteHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`${className} z-1000 ${isMenuOpen ? 'bg-black' : 'bg-transparent'}`}>
            <header className="container mx-auto lg:max-w-6xl flex items-center py-4 px-4 justify-between">
                <div className="flex items-center justify-between px-4 lg:px-0 w-full">

                    <div className="logo-area">
                        <Link href="/" className="flex justify-center">
                            <Image
                                src="/bmw-logo.webp"
                                width="110"
                                height="120"
                                alt="Site Logo"
                            />
                        </Link>
                    </div>
                    <div
                        className="menu-toggle lg:hidden ml-4"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </div>

                </div>
                <nav className={`text-slate-100 ${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex absolute bg-black text-white z-50 lg:z-auto lg:w-auto top-full left-0 lg:top-auto lg:left-auto lg:bg-transparent lg:relative lg:flex-row pb-4 lg:pb-0`}>

                    <ul className="gap-4 lg:gap-0 text-center z-49 flex flex-col lg:flex-row justify-center lg:justify-end [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:underline [&>li>a:hover]:underline-offset-4 [&>li>a:hover]:decoration-1 [&>li>a]:transition text-xl">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/products">Products</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}
