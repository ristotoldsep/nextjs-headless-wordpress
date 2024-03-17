import graphqlRequest from "./graphqlRequest";

export async function getAllPosts() {
    const query = {
        query: `
        query NewQuery {
            posts {
              nodes {
                title
                slug
                date
                excerpt(format: RENDERED)
                featuredImage {
                  node {
                    mediaDetails {
                      file
                      sizes {
                        sourceUrl
                        width
                        height
                      }
                    }
                  }
                }
                categories {
                  nodes {
                    slug
                    name
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }
        `,
    };

    const resJson = await graphqlRequest(query);

    const allPosts = resJson.data.posts;

    return allPosts;
}

export async function getSinglePost(slug: string) {
    const query = {
        query: `
        query getSinglePost {
            post(id: "${slug}", idType: SLUG) {
              id
              title(format: RENDERED)
              content(format: RENDERED)
              excerpt(format: RENDERED)
              modified
              slug
              featuredImage {
                node {
                  mediaDetails {
                    sizes {
                      width
                      height
                      sourceUrl
                    }
                  }
                }
              }
              categories {
                      nodes {
                  name
                  slug
                }
              }
            }
          }
        `,
    };

    const resJson = await graphqlRequest(query);

    const singlePost = resJson.data.post;

    return singlePost;
}

export async function getPostSlugs() {
    const query = {
        query: `
        query getPostSlugs {
            posts {
              nodes {
                slug
              }
            }
          }
        `
    };

    const resJson = await graphqlRequest(query);

    const slugs = resJson.data.posts.nodes;

    return slugs;
}