import graphqlRequest from "./graphqlRequest";

export async function getAllProducts() {
  const query = {
    query: `
        query products {
            products {
            nodes {
                id
                title(format: RENDERED)
                slug
                productFields {
                summary
                thumbnail {
                    node {
                    mediaDetails {
                        sizes {
                        sourceUrl
                        height
                        width
                        }
                    }
                    }
                }
                }
                productCategories {
                nodes {
                    name
                    slug
                }
                }
            }
            }
        }
        `,
  };

  const resJson = await graphqlRequest(query);

  const allProducts = resJson.data.products.nodes;

  return allProducts;
}
