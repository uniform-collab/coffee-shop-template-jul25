import { FC } from 'react';
import { Flex as CSKFlex, Grid } from '@uniformdev/csk-components/components/ui';
import { getProductRecommendations } from '@/utils/getProductRecommendations';
import { DynamicRecommendationsProps } from '.';
import ProductCard, { ProductCardSkeleton } from '../ProductCard';

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = async ({
  title,
  backgroundColor,
  spacing,
  fluidContent,
  fullHeight,
  border,
  boostEnrichments,
  maxRecommendations = '3',
}) => {
  const products = await getProductRecommendations({
    boostEnrichments,
    maxRecommendations: parseInt(maxRecommendations),
    entryType: 'product',
  });

  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      {title}

      <Grid
        columnsCount={{
          desktop: '3',
          tablet: '2',
          mobile: '1',
        }}
        gapY="8"
        gapX="8"
        fluidContent
      >
        {!products.length
          ? Array.from({ length: parseInt(maxRecommendations) }, () => 0).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map(product => {
              const { price = 0, currency = 'USD' } = product?.variants?.[0] ?? {};
              return (
                <ProductCard
                  key={product.slug}
                  price={price}
                  currency={currency}
                  title={product.title}
                  image={product.primaryImage?.[0]?.url}
                  slug={product.slug}
                  link={`/products/${product.slug}`}
                  textColor={'primary'}
                />
              );
            })}
      </Grid>
    </CSKFlex>
  );
};

export default DynamicProductRecommendations;
