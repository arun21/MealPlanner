import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
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

}