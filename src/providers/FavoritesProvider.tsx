'use client';

import { createContext, useContext, FC, PropsWithChildren, useMemo, useCallback, useState, useEffect } from 'react';
import { FAVORITES_STORAGE_KEY } from '@/constants';
import useStorage from '@/hooks/useStorage';
import { Product } from '@/types';

type FavoritesContextType = {
  storedFavorites: Record<string, boolean>;
  toggleFavorite: (productSlug: string) => void;
  favoritesProducts: Product[];
  isFavoritesLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useStorage<Record<string, boolean>>(FAVORITES_STORAGE_KEY, {});

  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);

  const toggleFavorite = useCallback(
    (productSlug: string) => {
      const isFavorite = storedFavorites[productSlug];

      if (isFavorite) {
        const { [productSlug]: _, ...newFavorites } = storedFavorites;
        setStoredFavorites(newFavorites, { force: true });
      } else {
        setStoredFavorites({ ...storedFavorites, [productSlug]: true });
      }
    },
    [storedFavorites, setStoredFavorites]
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsFavoritesLoading(true);
      const productSlugs = Object.keys(storedFavorites);
      const query = productSlugs.map(slug => `productSlugs=${encodeURIComponent(slug)}`).join('&');
      const response = await fetch(`/api/entry/by-slug?${query}`);

      const data = await response.json();

      setFavoritesProducts(data);
      setIsFavoritesLoading(false);
    };

    const hasFavorites = Object.keys(storedFavorites).length > 0;

    if (hasFavorites) {
      fetchFavorites();
    }
  }, [storedFavorites]);

  const value = useMemo(
    () => ({
      storedFavorites,
      toggleFavorite,
      favoritesProducts,
      isFavoritesLoading,
    }),
    [storedFavorites, toggleFavorite, favoritesProducts, isFavoritesLoading]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
