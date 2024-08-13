// lib/products.ts

import graphqlRequest from "./graphqlRequest";
import { ProductsData, Product } from "./types";

export async function getAllProducts(): Promise<Product[]> {
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

  const resJson = await graphqlRequest<ProductsData>(query);
  const allProducts = resJson.data.products.nodes;

  return allProducts;
}


export async function getProductBySlug(slug: string): Promise<Product | null> {
    const query = {
      query: `
        query product($slug: String!) {
          productBy(slug: $slug) {
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
      `,
      variables: { slug },
    };
  
    const resJson = await graphqlRequest(query);
    const product = resJson.data.productBy;
  
    return product || null;
  }