import Image from "next/image";
import Link from "next/link";

interface SiteHeaderProps {
    className: string;
}

export default function SiteHeader( { className }: SiteHeaderProps ) {
    return (
        <header className={`${className} container mx-auto lg:max-w-6xl flex items-center py-4 justify-between`}>
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
          <nav className="text-slate-100">
                <ul className="flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:underline [&>li>a:hover]:underline-offset-4 [&>li>a:hover]:decoration-1 [&>li>a]:transition text-xl">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/blog">Products</Link>
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
    )
}