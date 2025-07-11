import { Page } from '@uniformdev/csk-components/components/canvas';
import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AccordionItem from './AccordionItem';
import AddToCardButton from './AddToCardButton';
import AddToFavorites from './AddToFavorites';
import Button from './Button';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import Container from './Container';
import CustomComponent from './CustomComponent';
import DynamicProductRecommendations from './DynamicProductRecommendations';
import EntriesSearchBox from './EntriesSearchBox';
import EntriesSearchEngine from './EntriesSearchEngine';
import EntriesSearchFilters from './EntriesSearchFilters';
import EntriesSearchList from './EntriesSearchList';
import EntriesSearchPageSize from './EntriesSearchPageSize';
import EntriesSearchPagination from './EntriesSearchPagination';
import EntriesSearchSorting from './EntriesSearchSorting';
import EntriesSearchTotalAmount from './EntriesSearchTotalAmount';
import Favorites from './Favorites/Favorites';
import FavoritesIcon from './FavoritesIcon';
import FeaturedSection from './FeaturedSection';
import FlexCard from './FlexCard';
import FormattedPrice from './FormattedPrice';
import Grid from './Grid';
import GridItem from './GridItem';
import Input from './Input';
import ModalLayout from './ModalLayout';
import QuantitySelector from './QuantitySelector';
import QuirkSelector from './QuirkSelector';
import ReadMore from './ReadMore';
import RemoveButton from './RemoveButton';
import RichText from './RichText';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from './ShoppingCartIcon';

// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  customComponent: { component: CustomComponent },
  // This is an overridden CSK Container component.
  container: { component: Container },
  accordionItem: { component: AccordionItem },
  button: { component: Button },
  featuredSection: { component: FeaturedSection },
  richText: { component: RichText },
  readMore: { component: ReadMore },
  removeButton: { component: RemoveButton },
  grid: { component: Grid },
  flexCard: { component: FlexCard },
  gridItem: { component: GridItem },
  input: { component: Input },
  quantitySelector: { component: QuantitySelector },
  modalLayout: { component: ModalLayout },
  addToCardButton: { component: AddToCardButton },
  addToFavorites: { component: AddToFavorites },
  completeCheckoutButton: { component: CompleteCheckoutButton },
  quirkSelector: { component: QuirkSelector },
  shoppingCartIcon: { component: ShoppingCartIcon },
  shoppingCart: { component: ShoppingCart },
  favoritesIcon: { component: FavoritesIcon },
  favorites: { component: Favorites },
  entriesSearchEngine: { component: EntriesSearchEngine },
  entriesSearchBox: { component: EntriesSearchBox },
  entriesSearchFilters: { component: EntriesSearchFilters },
  entriesSearchList: { component: EntriesSearchList },
  entriesSearchPagination: { component: EntriesSearchPagination },
  entriesSearchSorting: { component: EntriesSearchSorting },
  entriesSearchTotalAmount: { component: EntriesSearchTotalAmount },
  entriesSearchPageSize: { component: EntriesSearchPageSize },
  dynamicProductRecommendations: { component: DynamicProductRecommendations },
  formattedPrice: { component: FormattedPrice },
  entryPreview: { component: Page },
};
