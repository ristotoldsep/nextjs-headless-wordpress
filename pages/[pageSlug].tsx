import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getPageSlugs, getSinglePage } from "../lib/pages";
import { GetStaticProps, GetStaticPaths } from 'next';

interface PageProps {
    pageData: {
        title: string;
        content: string;
    };
}

export const getStaticProps: GetStaticProps = async (context) => {

    // console.log(context);

    // Ensure that params exists before attempting to access its properties
    if (!context.params) {
        return { notFound: true };
    }

    const pageData = await getSinglePage(context.params.pageSlug as string);

    return {
        props: {
            pageData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const pageSlugs = await getPageSlugs();

    return {
        paths: pageSlugs.map((s) => ({
            params: { pageSlug: s.slug },
        })),
        fallback: false,
    };
};

const Page: React.FC<PageProps> = ({ pageData }) => {
    return (
        <>
            <Head>
                <title>{pageData.title}</title>
            </Head>
            <section className="bg-slate-700">
                <SiteHeader className="header-page relative" />
            </section>
            <section className="content-area py-8">
                <article>
                    <h1 className="text-6xl text-center text-slate-700 relative py-8">
                        {pageData.title}
                    </h1>
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }} className="post-content container mx-auto lg:max-w-4xl" />
                </article>
            </section>
            <SiteFooter />
        </>
    );
};

export default Page;
