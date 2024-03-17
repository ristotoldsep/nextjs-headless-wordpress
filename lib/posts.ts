import graphqlRequest from "./graphqlRequest";

export async function getAllPosts() {
  
    const query = {
    query: `
        query NewQuery {
            posts {
              nodes {
                title
                slug
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
