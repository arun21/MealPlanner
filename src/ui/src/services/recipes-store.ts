import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

const EatOutRecipe = { id: '0', title: 'Eat Out', imageUrl: '' };

@Injectable()
export class RecipesStore {

    static get EatOutRecipe() {
        return JSON.parse(JSON.stringify(EatOutRecipe));
    }

    constructor(private userData: UserDataService) {
    }

    getRecipe(recipeId: string): Observable<Recipe> {
        if(recipeId == EatOutRecipe.id) {
            return Observable.of(RecipesStore.EatOutRecipe);
        }

        return this.userData.object<Recipe>(`/recipes/${recipeId}`);
    }

    randomRecipe(): Observable<Recipe> {
        
        return this.search()
                    .map(recipes => 
                        recipes[Math.floor(Math.random() * recipes.length)]
                    );

    }

    search(filter?: string): Observable<Recipe[]> {

        let recipes = this.userData.list<Recipe[]>('/recipes');

        if(!filter) return recipes.filter(x => true);

        let query = new RegExp(filter, 'gi');

        console.debug('filter: ', filter)
        return recipes.map(x => x.filter(y => query.test(y.title)) );
    }

}