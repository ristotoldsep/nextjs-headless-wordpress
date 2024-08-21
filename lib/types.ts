// lib/types.ts

/**
 * POST TYPES
 */

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
  posts: {
    nodes: Post[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
  };
}

export interface SinglePostData {
  post: Post;
}

export interface PostSlugsData {
  posts: {
    nodes: Slug[];
  };
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
  