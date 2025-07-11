import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  createServerUniformContext,
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { isRouteWithoutErrors } from '@uniformdev/csk-components/utils/routing';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import { generateMetadata as generateMetadataBase } from '@/utils/metadata';
import retrieveRoute from '@/utils/retrieveRoute';

const path = ['not-found'];

export const generateMetadata = () => {
  return generateMetadataBase({
    params: Promise.resolve({
      path,
    }),
  });
};

export default async function NotFound(props: PageParameters) {
  const searchParams = await props.searchParams;
  const customProps = {
    ...searchParams,
    params: Promise.resolve({
      path,
    }),
  };
  const route = await retrieveRoute(customProps, locales.defaultLocale);

  const serverContext = await createServerUniformContext({
    searchParams,
  });

  const cookie = await cookies();
  const theme = cookie.get('theme')?.value || 'light';

  if (!isRouteWithoutErrors(route)) return notFound();

  return (
    <DesignExtensionsProvider>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            theme,
          },
        }}
      />
      <UniformComposition
        {...customProps}
        route={route}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        serverContext={serverContext}
        mode="server"
      />
    </DesignExtensionsProvider>
  );
}

export const dynamic = 'force-dynamic';
