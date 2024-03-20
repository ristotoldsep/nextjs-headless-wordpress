import graphqlRequest from "./graphqlRequest";

// Define interfaces for your data
interface PageSlug {
    slug: string;
}

interface Page {
    title: string;
    slug: string;
    content: string;
    date: string;
    modified: string;
}

interface PageNodes<T> {
    nodes: T[];
}

interface PageData<T> {
    data: {
        pages: PageNodes<T>;
    };
}

// Adjust the functions with proper types
export async function getPageSlugs(): Promise<PageSlug[]> {
    const query = {
        query: `query getPageSlugs {
                    pages {
                        nodes {
                            slug
                        }
                    }
                }`,
    };

    const resJson: PageData<PageSlug> = await graphqlRequest(query);
    return resJson.data.pages.nodes;
}

export async function getSinglePage(slug: string): Promise<Page> {
    const query = {
        query: `query getSinglePage {
                pages(where: {name: "${slug}"}) {
                    nodes {
                        title(format: RENDERED)
                        slug
                        content(format: RENDERED)
                        date
                        modified
                    }
                }
            }`,
    };

    const resJson: PageData<Page> = await graphqlRequest(query);
    return resJson.data.pages.nodes[0];
}
