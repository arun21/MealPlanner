import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { IAction } from './action';
import { ToastController } from "ionic-angular";
import { RecipesStore } from '../services/recipes-store';
import { UserDataService } from '../services/user-data-service';
import { Recipe, MealScheduleEntry } from '../model';
import 'rxjs/add/operator/toPromise';

export interface ReplaceMealActionParams {
    date: number;
    recipeId?: string;
}

@Injectable()
export class ReplaceMealAction implements IAction<ReplaceMealActionParams> {

    constructor(
        private toaster: ToastController,
        private recipes: RecipesStore,
        private userData: UserDataService
    ) {
    }

    execute(params: ReplaceMealActionParams): Promise<void> {

        let getRecipe = 
            params.recipeId 
                ? this.recipes.getRecipe(params.recipeId)
                : this.recipes.randomRecipe()
        
        return getRecipe.first().toPromise().then(recipe => {
            this.replaceMeal(params.date, recipe);
        });
    }

    async replaceMeal(date: number, recipe: Recipe): Promise<void> {

        if(!date) {
            console.warn('No date provided!');
            return;
        }

        if(!recipe) {
            console.warn('No recipe provided!');
            return;
        }

        const year = moment(date).year(),
              week = moment(date).week(),
              day = moment(date).day();

        return <Promise<void>>this.userData
            .object<MealScheduleEntry>(`/schedules/${year}/${week}/${day}`)
            .update({ 
                recipeId: recipe.id,
                recipeName: recipe.title,
                recipeImageUrl: recipe.imageUrl,
            });

    }

}
