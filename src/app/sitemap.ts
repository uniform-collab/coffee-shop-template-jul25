import type { MetadataRoute } from 'next';
import { ProjectMapClient, getNodeActiveCompositionEdition } from '@uniformdev/project-map';
import localesConfig from '@/i18n/locales.json';
import { ContentClient } from '@uniformdev/canvas';

const projectMap = new ProjectMapClient({
  apiHost: process.env.UNIFORM_CLI_BASE_URL! || 'https://uniform.app',
  apiKey: process.env.UNIFORM_API_KEY!,
  projectId: process.env.UNIFORM_PROJECT_ID!,
});

const BASE_URL = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : '';
// Note:
// This is a basic implementation of sitemap generation. It is suitable for smaller projects where
// the total number of sitemap items does not exceed 50,000, which is the limit for a single sitemap file.
// For projects with more than 50,000 items, it is recommended to split the sitemap into multiple files
// as suggested in the Next.js documentation:
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-multiple-sitemaps
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = BASE_URL || 'http://localhost:3000';
  const { nodes } = await projectMap.getNodes({ withCompositionData: true });
  const contentClient = new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY!,
    projectId: process.env.UNIFORM_PROJECT_ID!,
  });

  if (!nodes) return [];

  const isLocalized = localesConfig?.locales?.length > 0;

  const nodePromises = nodes.map(async node => {
    if (!isLocalized || !node.path?.includes(':locale')) {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: undefined,
      });

      return [
        {
          url: `${domain}${node.path}`,
          lastModified: edition?.modified,
          changeFrequency: 'daily' as const,
          priority: 1,
        },
      ];
    }

    const localePromises = localesConfig.locales.map(async locale => {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: locale,
      });

      if (!node.path) return [];

      const url = `${domain}${node.path.replace(':locale', locale)}`;

      const isDynamicNode = node?.pathSegment?.startsWith(':');
      if (isDynamicNode && node.pathSegment) {
        let slugs: string[] = [];
        if (node.pathSegment === (':article-slug')) {
          const { entries } = await contentClient.getEntries({
            filters: {
              'type[eq]': 'article', // Replace with your content type
            },
          });

          slugs = entries.map((e) => e.entry._slug).filter((slug): slug is string => Boolean(slug));
        } else if (node.pathSegment === (':product-slug')) {
          const { entries } = await contentClient.getEntries({
            filters: {
              'type[eq]': 'product', // Replace with your content type
            },
          });
          slugs = entries.map((e) => e.entry._slug).filter((slug): slug is string => Boolean(slug));
        }
        return slugs.map(s => {
          return {
            url: url.replace(node.pathSegment!, s),
            lastModified: edition?.modified,
            changeFrequency: 'daily' as const,
            priority: 1,
          };
        });
      } else {
        return [{
          url,
          lastModified: edition?.modified,
          changeFrequency: 'daily' as const,
          priority: 1,
        }];
      }
    });

    const resolvedLocales = await Promise.all(localePromises);
    return resolvedLocales.flat();
  });

  const resolvedNodes = await Promise.all(nodePromises);
  return resolvedNodes.flat();
}
