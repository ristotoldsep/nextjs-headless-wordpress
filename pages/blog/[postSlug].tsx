import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPostSlugs, getSinglePost } from "@/lib/posts";

export async function getStaticProps({ params }) {
    const postData = await getSinglePost(params.postSlug);

    return {
        props: {
            postData: postData
        }
    }
}

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((slug) => (
            {
                params: {
                    postSlug: slug.slug
                }
            }
        )),
        fallback: false
    }
}

export default function Post({ postData }) {
    return (
        <h1>This is a post</h1>
    );
}