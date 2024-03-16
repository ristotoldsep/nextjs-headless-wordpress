export default function getAllPosts() {
  const query = {
    query: `
        query NewQuery {
            posts {
              nodes {
                title
                slug
                excerpt
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
}
