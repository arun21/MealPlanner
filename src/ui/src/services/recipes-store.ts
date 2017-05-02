import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import { default as config } from '../config';
import { default as stubData } from './stubData';

@Injectable()
export class RecipesStore {

    recipes: Observable<Recipe[]>;

    constructor(private userData: UserDataService) {
        this.recipes = 
            (config.stubMode)
                ? Observable.from([stubData.recipes])
                : this.userData.list('/recipes');
    }

    getRecipe(recipeId: string): Observable<Recipe> {
        return this.recipes.flatMap(x => x).first(x => x.id == recipeId);
    }

}