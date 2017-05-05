import { AuthenticationService } from './authentication-service';
import { RecipesStore } from './recipes-store';
import { SchedulesStore } from './schedules-store';
import { ShoppingListStore } from './shopping-list-store';
import { UserDataService } from './user-data-service';

export const SERVICES = [
    AuthenticationService,
    RecipesStore,
    SchedulesStore,
    ShoppingListStore,
    UserDataService,
];