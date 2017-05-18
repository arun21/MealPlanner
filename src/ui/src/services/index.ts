import { RecipeSearchService } from './recipe-search-service';
import { IngredientParser } from './ingredient-parser';
import { UserStore } from './user-store';
import { RecipesStore } from './recipes-store';
import { SchedulesStore } from './schedules-store';
import { ShoppingListStore } from './shopping-list-store';
import { UserDataService } from './user-data-service';

export const SERVICES = [
    RecipeSearchService,
    IngredientParser,
    UserStore,
    RecipesStore,
    SchedulesStore,
    ShoppingListStore,
    UserDataService,
];