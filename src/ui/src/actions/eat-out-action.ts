import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { IAction } from './action';
import { UserDataService } from '../services/user-data-service';
import { RecipesStore } from '../services/recipes-store';
import { MealScheduleEntry } from '../model';

export interface EatOutActionParams {
    date: number;
}

@Injectable()
export class EatOutAction implements IAction<EatOutActionParams> {

    constructor(private userData: UserDataService) {
    }

    async execute(params: EatOutActionParams): Promise<void> {
        const date = moment(params.date),
              year = date.year(),
              week = date.week(),
              day = date.day();

        let schedule = this.userData.object<MealScheduleEntry>(`/schedules/${year}/${week}/${day}`);

        schedule.update({ 
            recipeId: RecipesStore.EatOutRecipe.id,
            recipeName: RecipesStore.EatOutRecipe.title,
            recipeImageUrl: RecipesStore.EatOutRecipe.imageUrl,
        });
    }

}