import { Injectable } from '@angular/core';
import { ShoppingListEntry } from '../model';
import { SchedulesStore } from './schedules-store';
import { RecipesStore } from './recipes-store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ShoppingListStore {

    constructor(
        private schedules: SchedulesStore,
        private recipes: RecipesStore,
    ) {
    }

    getShoppingListForWeekContaining(date: Date): Observable<ShoppingListEntry[]> {
        return this.recipes.search(null).flatMap(recipes => 
            recipes.map(recipe => 
                (recipe.ingredients ? recipe.ingredients : []).map(ingredient => ({ name: ingredient }))
            )
        );
    }
}