import { FC } from 'react';
import { ContentType, WithUniformContentEntrySystemParams, Product } from '@/types';
import ProductCard from './ProductCard';

export type ProductCardProps = WithUniformContentEntrySystemParams<Product> & {
  contentType: ContentType.Product;
  textColor?: string;
  border?: string;
};

const ProductResultCard: FC<ProductCardProps> = ({
  title,
  category,
  subcategory,
  primaryImage,
  slug,
  variants,
  textColor,
  rating,
}) => {
  const asset = primaryImage?.[0];

  const { price = 0, currency = 'USD' } = variants?.[0] ?? {};

  return (
    <ProductCard
      image={asset?.url}
      title={title}
      category={subcategory?.title ?? category?.title}
      price={price}
      currency={currency}
      textColor={textColor ?? ''}
      slug={slug}
      link={`/products/${slug}`}
      rating={rating}
    />
  );
};

export default ProductResultCard;
