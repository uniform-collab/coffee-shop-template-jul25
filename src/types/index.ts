import { GetEntriesResponse } from '@uniformdev/canvas';
import { ParameterRichTextValue } from '@uniformdev/richtext';

export type UniformContentEntry = GetEntriesResponse['entries']['0']['entry'];

export type StoredCartItem = {
  productSlug: string;
  quantity: number;
};

export type StoredCart = {
  [key: string]: StoredCartItem;
};

export type ProductVariant = {
  code: string;
  currency: string;
  price: number;
  title: string;
  imageGallery: {
    url: string;
    title: string;
  }[];
};

export type Brand = {
  title: string;
  description: string;
  logo: {
    url: string;
    title: string;
  }[];
};

export type Product = {
  title: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductCategory;
  shortDescription: string;
  primaryImage: MappedAsset[];
  brand: Brand;
  variants: ProductVariant[];
  recommendations: Product[];
  rating: number;
  slug: string;
};

type UniformContentEntrySystemParams = {
  id: string;
  slug: string;
  contentType: string;
};

export type WithUniformContentEntrySystemParams<T> = T & UniformContentEntrySystemParams;

export type FilterByItem = {
  title: string;
  value: string;
};

export type FilterBy = {
  type: 'select' | 'multiSelect' | 'range';
  title: string;
  fieldId: string;
  fieldKey: string;
  enableFaceting: boolean;
  values: FilterByItem[];
};

export type OrderBy = {
  title: string;
  field: string;
  direction: 'ASC' | 'DESC';
};

export type PageSize = {
  size: number;
};

export type Pagination<Item> = {
  items: Item[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export enum ContentType {
  Article = 'article',
  Product = 'product',
}

export type MappedAsset = {
  url: string;
  title: string;
  width: number;
  height: number;
  mediaType: string;
  id: string;
  size: number;
};

export type Author = {
  name: string;
  about: string;
  thumbnail: MappedAsset[];
};

export type ArticleCategory = {
  title: string;
};

export type ProductCategory = {
  title: string;
  description: string;
  logo: MappedAsset[];
  displayPriority: boolean;
};

export type Article = {
  title: string;
  publishDate: string;
  content: ParameterRichTextValue;
  shortDescription: string;
  author: Author;
  category: ArticleCategory;
  thumbnail: MappedAsset[];
};

export type Facets = {
  [key: string]: {
    [key: string]: number;
  };
};

export type FilterQuery = {
  [K: string]: string[];
};

export type ProductBoostEnrichment = 'category' | 'brand' | 'subcategory';
