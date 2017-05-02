import { AuthenticationService } from './authentication-service';
import { RecipesStore } from './recipes-store';
import { SchedulesStore } from './schedules-store';
import { UserDataService } from './user-data-service';

export const SERVICES = [
    AuthenticationService,
    RecipesStore,
    SchedulesStore,
    UserDataService,
];