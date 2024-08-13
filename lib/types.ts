// lib/types.ts

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
    productFields: ProductFields;
    productCategories: {
      nodes: ProductCategory[];
    };
  }
  
  export interface ProductsData {
    products: {
      nodes: Product[];
    };
  }
  