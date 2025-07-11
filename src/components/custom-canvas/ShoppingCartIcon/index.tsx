import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import ShoppingCartIconClient from './ShoppingCartIconClient';

const ShoppingCartIcon: FC<CSKNavigationLinkProps> = props => (
  <ShoppingCartIconClient
    filledShoppingCartLink={<CSKNavigationLink {...props} />}
    emptyShoppingCartLink={<CSKNavigationLink {...props} link={undefined} />}
    animateWhenEmpty={true}
    {...props}
  />
);

export default ShoppingCartIcon;
