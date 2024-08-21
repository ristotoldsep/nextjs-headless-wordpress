// posts.ts

import graphqlRequest from "./graphqlRequest";
import { PostsData, SinglePostData, PostSlugsData } from "./types";

export async function getPostList(endCursor = null, taxonomy = null) {
  let condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`;

  if(taxonomy) {
    condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}`;
  }

  const query = {
      query: `
      query NewQuery {
          posts(${condition}) {
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

  const resJson = await graphqlRequest<{ data: PostsData }>(query);
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

    const resJson = await graphqlRequest<{ data: SinglePostData }>(query);
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

  const resJson = await graphqlRequest<{ data: PostSlugsData }>(query);
  const slugs = resJson.data.posts.nodes;

  return slugs;
}

export async function getCategorySlugs() {
  const query = {
    query: `query getCategorySlugs {
      categories {
        nodes {
          slug
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const categories = resJson.data.categories.nodes;

  return categories;
}

export async function getCategoryDetails(categoryName) {
  const query = {
    query: `query getCategoryDetails {
      category(id: "${categoryName}", idType: SLUG) {
        count
        name
        slug
      }
    }`
  };

  const resJson = await graphqlRequest(query);
  const categoryDetails = resJson.data.category;

  return categoryDetails;
}
