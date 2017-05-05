import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import { default as config } from '../config';
import { default as stubData } from './stubData';

@Injectable()
export class RecipesStore extends BehaviorSubject<Recipe[]> {

    constructor(private userData: UserDataService) {
        super(stubData.recipes);

        if (!config.stubMode)
            this.source = this.userData.list('/recipes');
    }

    getRecipe(recipeId: string): Observable<Recipe> {
        return this.flatMap(x => x).first(x => x.id == recipeId);
    }

    search(filter: string): Observable<Recipe[]> {

        if(!filter) return this;

        let query = new RegExp(filter, 'gi');

        console.debug('filter: ', filter)
        return this.map(x => x.filter(y => query.test(y.title)) );
    }

}