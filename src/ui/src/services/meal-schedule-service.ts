import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MealSchedule, MealScheduleEntry, Recipe } from '../model';
import { RecipesService } from './recipes-service';

@Injectable()
export class MealScheduleService {

    constructor(private recipesService: RecipesService) {
    }

    getScheduleForWeekContaining(date: Date): Promise<MealSchedule> {
        let beginDate = moment(date).subtract(date.getDay(), 'days').toDate();
        return this.getScheduleForWeekBeginning(beginDate);
    }

    getScheduleForWeekBeginning(date: Date): Promise<MealSchedule> {

        // TODO: Replace with real implementation - this is just for demo purposes
        return this.recipesService.getRecipes().then(recipes => {

            let extras = 0;
            
            while(recipes.length < 7) {
                recipes.push(recipes[extras++]);
            }

            let entries: MealScheduleEntry[] = recipes.slice(0, 7).map((recipe, i) => {
                return { 
                    date: moment(date).add(i, 'days').toDate(), 
                    recipeId: recipe._id 
                };
            })

            return { entries };
        })

    }

}