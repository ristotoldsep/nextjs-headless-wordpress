/**
 * types.ts
 */

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface FeaturedImage {
  node: {
    mediaDetails: {
      sizes: Array<{
        width: number;
        height: number;
        sourceUrl: string;
      }>;
    };
  };
}

export interface Category {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  featuredImage?: FeaturedImage;
  categories?: {
    nodes: Category[];
  };
}

export interface PostsData {
  nodes: Post[];
  pageInfo: PageInfo;
}


export interface PostData {
  id: string;
  title: string;
  slug: string;
  databaseId: number;
  excerpt?: string;
  content?: string;
  modified: string;
  featuredImage?: {
      node: {
          mediaDetails: {
              sizes: Array<{
                  width: number;
                  height: number;
                  sourceUrl: string;
              }>;
          };
      };
  };
  categories?: {
      nodes: Array<{
          name: string;
          slug: string;
      }>;
  };
}

export interface SinglePostData {
  post: Post;
}

export interface Slug {
  slug: string;
}

export interface PostSlugsData {
  posts: {
    nodes: Slug[];
  };
}

export interface CategorySlugsData {
  categories: {
    nodes: Slug[];
  };
}

export interface CategoryDetails {
  count: number;
  name: string;
  slug: string;
}

export interface CategoryDetailsData {
  category: CategoryDetails;
}

/**
 * PRODUCTS TYPES
 */
export interface ProductThumbnail {
  mediaDetails: {
    sizes: {
      sourceUrl: string;
      height: string;
      width: string;
    }[];
  };
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductFields {
  summary: string;
  thumbnail: {
    node: ProductThumbnail;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  productFields: ProductFields;
  productCategories: {
    nodes: ProductCategory[];
  };
}

export interface ProductsData {
  data: {
    products: {
      nodes: Product[];
    };
  }
}
