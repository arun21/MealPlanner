import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { IAction } from './action';
import { UserDataService } from '../services/user-data-service';
import { MealScheduleEntry } from '../model';

export interface EatOutActionParams {
    date: number;
}

const EatOutRecipeId = '0';

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
            recipeId: EatOutRecipeId,
            recipeName: 'EAT OUT',
            recipeImageUrl: null
        });
    }

}