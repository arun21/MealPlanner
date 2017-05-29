import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { IAction } from './action';
import { ToastController } from "ionic-angular";
import { RecipesStore } from '../services/recipes-store';
import { UserDataService } from '../services/user-data-service';
import { Recipe, MealScheduleEntry } from '../model';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

export interface GenerateScheduleActionParams {
    year?: number;
    week?: number;
    date?: Date;
}

@Injectable()
export class GenerateScheduleAction implements IAction<GenerateScheduleActionParams> {

    constructor(
        private toaster: ToastController,
        private recipes: RecipesStore,
        private userData: UserDataService
    ) {
    }

    async execute(params: GenerateScheduleActionParams): Promise<void> {

        let year: number, 
            week: number;

        if(params && params.year && params.week) {
            year = params.year;
            week = params.week;
        } 
        else if(params && params.date) {
            let date = moment(params.date);
            year = date.year();
            week = date.week();
        }
        else {
            throw `Invalid schedule generation request - must supply a year/week or a date. (params: ${JSON.stringify(params)})`;
        }

        console.debug(`Generating schedule for year ${year} and week ${week}...`);

        let entries = await this.generateScheduleEntries(year, week);

        console.debug('Got entries: ', entries);

        this.userData.object<MealScheduleEntry[]>(`/schedules/${year}/${week}`)
            .set(entries)
            .then(() => console.log(`Successfully created schedule for year ${year} and week ${week}`))
            .catch((error) => console.error('Error saving schedule: ' + JSON.stringify(error)));

    }

    async generateScheduleEntries(year: number, week: number): Promise<MealScheduleEntry[]> {

        return this.recipes.search().first().toPromise<Recipe[]>()
            .then(recipes => {
            
                console.debug('Got recipes: ', recipes);
        
                let entries: MealScheduleEntry[] = [];

                for(let day = 0; day < 7; day++) {

                    let date = moment().year(year).week(week).day(day).utc().valueOf();
                    let recipe = this.recipes.getRandomRecipe(recipes);

                    entries.push({
                        date: date,
                        recipeId: recipe.id,
                        recipeName: recipe.title,
                        recipeImageUrl: recipe.imageUrl
                    });
                }

                return entries;
            });
    }

}
