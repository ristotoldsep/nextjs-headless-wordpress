import graphqlRequest from "./graphqlRequest";
import { PostData, PostsData, SinglePostData, PostSlugsData, CategorySlugsData, CategoryDetailsData } from "./types";

export async function getPostList(endCursor: string | null = null, taxonomy: { key: string, value: string } | null = null, token?: string): Promise<PostsData> {
  let condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}}`;

  if (taxonomy) {
    condition = `after: "${endCursor}", first: 10, where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}`;
  }

  const query = {
    query: `
      query NewQuery {
          posts(${condition}) {
            nodes {
              id
              title
              slug
              date
              excerpt(format: RENDERED)
              featuredImage {
                node {
                  mediaDetails {
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

  const resJson = await graphqlRequest<{ data: { posts?: PostsData } }>(query, token);

  console.log("API Response:", resJson); // Log the API response to inspect it

  if (!resJson.data || !resJson.data.posts) {
    console.error("No posts data returned", resJson); // Log an error message with the full response
    throw new Error("Failed to fetch posts: No posts data returned");
  }

  const allPosts = resJson.data.posts;

  return allPosts;
}


export async function getSinglePost(slug: string): Promise<PostData> {
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

  const resJson = await graphqlRequest<{ data: { post: PostData } }>(query);
  return resJson.data.post;
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

  const resJson = await graphqlRequest<{ data: CategorySlugsData }>(query);
  const categories = resJson.data.categories.nodes;

  return categories;
}

export async function getCategoryDetails(categoryName: string) {
  const query = {
    query: `query getCategoryDetails {
      category(id: "${categoryName}", idType: SLUG) {
        count
        name
        slug
      }
    }`
  };

  const resJson = await graphqlRequest<{ data: CategoryDetailsData }>(query);
  const categoryDetails = resJson.data.category;

  return categoryDetails;
}
