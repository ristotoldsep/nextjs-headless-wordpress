import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Date from "@/components/Date";
import LoadMore from "@/components/LoadMore";
import FeaturedImage from "@/components/FeaturedImage";
import { getCategoryDetails, getCategorySlugs, getPostList } from "@/lib/posts";
import AOS from "aos";
import "aos/dist/aos.css";

export async function getStaticPaths() {
    const categories = await getCategorySlugs();

    return {
        paths: categories.map((category) => (
            {
                params: {
                    categoryName: category.slug
                }
            }
        )),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const categoryPosts = await getPostList(null, {key: "categoryName", value: params.categoryName});

    const categoryDetails = await getCategoryDetails(params.categoryName);

    return {
        props: {
            categoryPosts: categoryPosts,
            categoryDetails: categoryDetails,
        }
    }
}

export default function CategoryArchive({ categoryPosts, categoryDetails }) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease", // Animation easing effect
            once: false, // Whether animation should happen only once
        });
    }, []);

    const [posts, setPosts] = useState(categoryPosts);

    return (
        <>
        <Head>
            <title>{categoryDetails.name}</title>
        </Head>
        <div className="h-[30vh] min-h-[20rem] bg-[url('/home-bg.webp')] relative">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

            <SiteHeader className="header-blog-home z-10 relative" />

            <h1 className="text-4xl text-center text-slate-100 relative z-10 py-8">
                Category Archive: {categoryDetails.name}
            </h1>

            <p className="relative z-10 text-center text-slate-200 text-2xl">
                Found {categoryDetails.count} posts under this category
            </p>

        </div>
        <main className="px-8">
            <section className="container mx-auto lg:max-w-6xl post-list mt-8">
                <ul>
                    {
                        posts.nodes.map((post) => (
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
                                    <div className="py-4">
                                        Published on <Date dateString={post.date} />
                                    </div>
                                    <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
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
                        ))
                    }
                </ul>
                <div className="py-8 text-center">
                    <LoadMore 
                    posts={posts} 
                    setPosts={setPosts}
                    taxonomy={{key: "categoryName", value: categoryDetails.slug}} />
                </div>
            </section>
        </main>
        <SiteFooter />
        </>
    );
}