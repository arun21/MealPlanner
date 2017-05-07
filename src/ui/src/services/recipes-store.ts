import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class RecipesStore {

    constructor(private userData: UserDataService) {
    }

    getRecipe(recipeId: string): Observable<Recipe> {
        return this.userData.object<Recipe>(`/recipes/${recipeId}`);
    }

    search(filter: string): Observable<Recipe[]> {

        let recipes = this.userData.list<Recipe[]>('/recipes');

        if(!filter) return recipes.filter(x => true);

        let query = new RegExp(filter, 'gi');

        console.debug('filter: ', filter)
        return recipes.map(x => x.filter(y => query.test(y.title)) );
    }

}