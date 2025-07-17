import type { MetadataRoute } from 'next';
import localesConfig from '@/i18n/locales.json';
import { generateSitemap, createContentTypeResolver } from '@/utils/sitemap';

// Note:
// This is a basic implementation of sitemap generation. It is suitable for smaller projects where
// the total number of sitemap items does not exceed 50,000, which is the limit for a single sitemap file.
// For projects with more than 50,000 items, it is recommended to split the sitemap into multiple files
// as suggested in the Next.js documentation:
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap({
    locales: localesConfig?.locales || [],
    resolvers: {
      ':article-slug': createContentTypeResolver('article'),
      ':product-slug': createContentTypeResolver('product'),
    },
  });
}
