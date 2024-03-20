import Link from "next/link";

export default function SiteFooter() {
    return (
        <>
            <footer id="site-footer" className="bg-slate-100">
            <div className="flex justify-between items-center container mx-auto lg:max-w-5xl py-4">
                <div className="py-3">&copy; 2024 @ristotoldsep</div>
                <ul className="flex [&>li>a]:px-2">
                    <li>
                        <Link href="/about">About</Link> 
                    </li>
                    <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
        </footer>
        </>
    )
}