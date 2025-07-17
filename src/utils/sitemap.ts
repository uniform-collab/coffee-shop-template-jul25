/**
 * Reusable sitemap utility for Next.js with configurable resolvers for dynamic routes.
 *
 * Usage:
 * ```typescript
 * export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 *   return generateSitemap({
 *     locales: ['en', 'es', 'fr'],
 *     resolvers: {
 *       ':blog-post': createContentTypeResolver('blogPost'),
 *       ':product-slug': createContentTypeResolver('product'),
 *     },
 *   });
 * }
 * ```
 */
import type { MetadataRoute } from 'next';
import { ContentClient } from '@uniformdev/canvas';
import { ProjectMapClient, getNodeActiveCompositionEdition, type ProjectMapNode } from '@uniformdev/project-map';

export interface SitemapResolver {
  (contentClient: ContentClient, locale?: string): Promise<string[]>;
}

export interface SitemapConfig {
  resolvers?: Record<string, SitemapResolver>;
  baseUrl?: string;
  locales?: string[];
  defaultChangeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  defaultPriority?: number;
  projectMapClient?: ProjectMapClient;
  contentClient?: ContentClient;
}

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface CompositionEdition {
  modified?: string | Date;
}

export async function generateSitemap(config: SitemapConfig = {}): Promise<MetadataRoute.Sitemap> {
  const {
    resolvers = {},
    baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : 'http://localhost:3000',
    locales = [],
    defaultChangeFrequency = 'daily',
    defaultPriority = 1,
    projectMapClient = new ProjectMapClient({
      apiHost: process.env.UNIFORM_CLI_BASE_URL! || 'https://uniform.app',
      apiKey: process.env.UNIFORM_API_KEY!,
      projectId: process.env.UNIFORM_PROJECT_ID!,
    }),
    contentClient = new ContentClient({
      apiKey: process.env.UNIFORM_API_KEY!,
      projectId: process.env.UNIFORM_PROJECT_ID!,
    }),
  } = config;

  const { nodes } = await projectMapClient.getNodes({ withCompositionData: true });

  if (!nodes) return [];

  const isLocalized = locales.length > 0;

  const nodePromises = nodes.map(async node => {
    if (!isLocalized || !node.path?.includes(':locale')) {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: undefined,
      });

      return await processNode(
        node,
        undefined,
        edition,
        baseUrl,
        resolvers,
        contentClient,
        defaultChangeFrequency,
        defaultPriority
      );
    }

    const localePromises = locales.map(async locale => {
      const edition = getNodeActiveCompositionEdition({
        node,
        targetLocale: locale,
      });

      return await processNode(
        node,
        locale,
        edition,
        baseUrl,
        resolvers,
        contentClient,
        defaultChangeFrequency,
        defaultPriority
      );
    });

    const resolvedLocales = await Promise.all(localePromises);
    return resolvedLocales.flat();
  });

  const resolvedNodes = await Promise.all(nodePromises);
  return resolvedNodes.flat();
}

async function processNode(
  node: ProjectMapNode,
  locale: string | undefined,
  edition: CompositionEdition | undefined,
  baseUrl: string,
  resolvers: Record<string, SitemapResolver>,
  contentClient: ContentClient,
  defaultChangeFrequency: SitemapConfig['defaultChangeFrequency'],
  defaultPriority: number
): Promise<SitemapEntry[]> {
  if (!node.path) return [];

  const url =
    locale && node.path.includes(':locale')
      ? `${baseUrl}${node.path.replace(':locale', locale)}`
      : `${baseUrl}${node.path}`;

  const isDynamicNode = node?.pathSegment?.startsWith(':');

  if (isDynamicNode && node.pathSegment) {
    const resolver = resolvers[node.pathSegment];

    if (resolver) {
      try {
        const slugs = await resolver(contentClient, locale);
        return slugs.map(slug => ({
          url: url.replace(node.pathSegment!, slug),
          lastModified: edition?.modified,
          changeFrequency: defaultChangeFrequency!,
          priority: defaultPriority,
        }));
      } catch (error) {
        console.warn(`Failed to resolve slugs for ${node.pathSegment}:`, error);
        return [];
      }
    } else {
      console.warn(`No resolver found for dynamic node: ${node.pathSegment}`);
      return [];
    }
  } else {
    return [
      {
        url,
        lastModified: edition?.modified,
        changeFrequency: defaultChangeFrequency!,
        priority: defaultPriority,
      },
    ];
  }
}

// Built-in resolvers for common content types
export const createContentTypeResolver = (contentType: string): SitemapResolver => {
  return async (contentClient: ContentClient, _locale?: string) => {
    const { entries } = await contentClient.getEntries({
      filters: {
        'type[eq]': contentType,
      },
    });

    return entries.map(e => e.entry._slug).filter((slug): slug is string => Boolean(slug));
  };
};

// Specific resolvers for common use cases
export const resolvers = {
  article: createContentTypeResolver('article'),
  product: createContentTypeResolver('product'),
  blogPost: createContentTypeResolver('blogPost'),
};
