import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Date from "@/components/Date";
import FeaturedImage from "@/components/FeaturedImage";

import { getAllPosts } from "@/lib/posts";

import AOS from "aos";
import "aos/dist/aos.css";

interface Post {
    slug: string;
    title: string;
    date: string; // Assuming it's a string for now, adjust according to actual type
    excerpt: string; // Assuming it's a string for now, adjust according to actual type
    categories: {
        nodes: {
            slug: string;
            name: string;
        }[];
    };
}

interface Props {
    allPosts: {
        nodes: Post[];
    };
}

export async function getStaticProps() {
    const allPosts = await getAllPosts();

    return {
        props: {
            allPosts: allPosts,
        },
    };
}

export default function BlogHome({ allPosts }: Props) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease", // Animation easing effect
            once: false, // Whether animation should happen only once
        });
    }, []);

    console.log(allPosts);

    const posts = allPosts;

    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <div className="h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] relative">
                <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

                <SiteHeader className="header-blog-home z-10 relative" />

                <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
                    BLOG
                </h1>

                <p className="relative z-10 text-center text-slate-200 text-2xl">
                    Read our latest articles
                </p>
            </div>
            <main>
                <section className="container mx-auto lg:max-w-6xl post-list mt-8 px-8">
                    <ul>
                        {posts.nodes.map((post) => (
                            <li
                                key={post.slug}
                                className="grid grid-cols-5 gap-8 mb-8"
                                data-aos="fade-in"
                            >
                                <div className="col-span-2">
                                    <FeaturedImage post={post} />
                                </div>
                                <div className="col-span-3">
                                    <h2 className="py-4">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-[#063E67] text-2xl hover:text-blue-600"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <div className="pb-4">
                                        Published on <Date dateString={post.date} />
                                    </div>
                                    <div
                                        className="text-lg"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    ></div>
                                    <div className="py-4">
                                        Category:{" "}
                                        {post.categories.nodes.map((category, index) => (
                                            <span key={category.slug}>
                                                <Link
                                                    className="text-[#063E67] hover:text-blue-500"
                                                    href={`/category/${category.slug}`}
                                                >
                                                    {category.name}
                                                </Link>
                                                {index < post.categories.nodes.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="py-4 text-center">
                        {/* <LoadMore posts={posts} setPosts={setPosts} /> */}
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
