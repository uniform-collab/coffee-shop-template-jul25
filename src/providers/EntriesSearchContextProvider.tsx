import {
  createContext,
  FC,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  DEFAULT_PAGE_SIZE,
  ENTRIES_SEARCH_ORDER_BY_KEY,
  ENTRIES_SEARCH_PAGE_KEY,
  ENTRIES_SEARCH_PAGE_SIZE_KEY,
  ENTRIES_SEARCH_QUERY_KEY,
  FIRST_PAGE,
} from '@/constants';
import {
  ContentType,
  FilterBy,
  Pagination,
  WithUniformContentEntrySystemParams,
  Article,
  Product,
  Facets,
  OrderBy,
  PageSize,
} from '@/types';

interface EntriesSearchContextType {
  contentType: ContentType;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  pageSize: number;
  pageSizes: PageSize[];
  page: number;
  filterBy: FilterBy[];
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: (selectedFilters: Record<string, string[]>) => void;
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets | null;
  isLoading: boolean;
  clearFilters: () => void;
  searchBoxValue: string;
  setSearchBoxValue: Dispatch<SetStateAction<string>>;
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  setOrderBy: (orderByQuery: string) => void;
}

const EntriesSearchContext = createContext<EntriesSearchContextType>({
  contentType: ContentType.Product,
  search: '',
  setSearch: () => {},
  setPage: () => {},
  setPageSize: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  pageSizes: [],
  page: FIRST_PAGE,
  filterBy: [],
  selectedFilters: {},
  setSelectedFilters: () => {},
  entries: {
    items: [],
    page: FIRST_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  },
  facets: null,
  isLoading: false,
  clearFilters: () => {},
  searchBoxValue: '',
  setSearchBoxValue: () => {},
  orderBy: [],
  selectedOrderByQuery: '',
  setOrderBy: () => {},
});

type EntriesSearchContextProviderProps = {
  children: React.ReactNode;
  filterBy: FilterBy[];
  pageSizes: PageSize[];
  contentType: ContentType;
  selectedFilters: Record<string, string[]>;
  orderBy: OrderBy[];
  selectedOrderByQuery: string;
  search: string;
  page: number;
  pageSize: number;
  entries: Pagination<WithUniformContentEntrySystemParams<Article | Product>>;
  facets: Facets;
};

const EntriesSearchContextProvider: FC<EntriesSearchContextProviderProps> = ({
  children,
  filterBy,
  contentType,
  selectedFilters,
  orderBy,
  selectedOrderByQuery,
  search,
  page,
  pageSize,
  pageSizes,
  entries,
  facets,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchBoxValue, setSearchBoxValue] = useState(search);
  const [isLoading, setIsLoading] = useState(false);

  const setSearch = useCallback(
    (search: string) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      if (!search) {
        params.delete(ENTRIES_SEARCH_QUERY_KEY);
      } else {
        params.set(ENTRIES_SEARCH_QUERY_KEY, search);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const setPage = useCallback(
    (page: number) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      if (page === 0) {
        params.delete(ENTRIES_SEARCH_PAGE_KEY);
      } else {
        params.set(ENTRIES_SEARCH_PAGE_KEY, (page + 1).toString());
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      params.set(ENTRIES_SEARCH_PAGE_SIZE_KEY, pageSize.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const setOrderBy = useCallback(
    (orderByQuery: string) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      params.set(ENTRIES_SEARCH_ORDER_BY_KEY, orderByQuery);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const setSelectedFilters = useCallback(
    (selectedFilters: Record<string, string[]>) => {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.delete(ENTRIES_SEARCH_PAGE_KEY);
      if (search) {
        params.set(ENTRIES_SEARCH_QUERY_KEY, search);
      }
      Object.entries(selectedFilters).forEach(([key, value]) => {
        const filter = filterBy.find(f => f.fieldKey === key);
        if (!filter) return;
        value.forEach(v => {
          params.append(filter.fieldId, v);
        });
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [search, router, filterBy]
  );

  const clearFilters = useCallback(() => {
    setIsLoading(true);
    setSearchBoxValue('');
    router.push(pathname);
  }, [router, pathname]);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const value: EntriesSearchContextType = useMemo(() => {
    return {
      search,
      setSearch,
      pageSize,
      page,
      setPage,
      setPageSize,
      pageSizes,
      filterBy,
      contentType,
      selectedFilters,
      setSelectedFilters,
      orderBy,
      setOrderBy,
      selectedOrderByQuery,
      entries,
      facets,
      isLoading,
      clearFilters,
      searchBoxValue,
      setSearchBoxValue,
    };
  }, [
    search,
    setSearch,
    pageSize,
    page,
    setPage,
    setPageSize,
    pageSizes,
    filterBy,
    contentType,
    selectedFilters,
    setSelectedFilters,
    orderBy,
    setOrderBy,
    selectedOrderByQuery,
    entries,
    facets,
    isLoading,
    clearFilters,
    searchBoxValue,
    setSearchBoxValue,
  ]);

  return <EntriesSearchContext.Provider value={value}>{children}</EntriesSearchContext.Provider>;
};

export default EntriesSearchContextProvider;

export const useEntriesSearchContext = () => {
  const context = useContext(EntriesSearchContext);
  if (!context) {
    throw new Error('useEntriesSearchContext must be used within a EntriesSearchContextProvider');
  }
  return context;
};
