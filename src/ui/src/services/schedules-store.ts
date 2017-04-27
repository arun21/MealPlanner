import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MealSchedule, MealScheduleEntry, Recipe } from '../model';
import { RecipesStore } from './recipes-store';
import { UserDataService } from './user-data-service';
import 'rxjs/add/operator/toPromise';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class SchedulesStore {

    schedules: FirebaseListObservable<MealSchedule[]>;

    constructor(private userData: UserDataService, private recipes: RecipesStore) {
        this.schedules = this.userData.list('/schedules');
    }

    getScheduleForWeekContaining(date: Date): FirebaseObjectObservable<MealSchedule> {
        let beginDate = moment(date).subtract(date.getDay(), 'days').toDate();
        return this.getScheduleForWeekBeginning(beginDate);
    }

    getScheduleForWeekBeginning(date: Date): FirebaseObjectObservable<MealSchedule> {
        let url = `/schedules/${moment(date).format('YYYY/MM/DD')}`;
        let schedule = this.userData.object(url);
        this.generateTestData(date).then(generated => schedule.set(generated));
        return schedule;
    }

    generateTestData(date: Date) {
        return this.recipes.recipes.toPromise().then(recipes => {

            let extras = 0;
            
            while(recipes.length < 7) {
                recipes.push(recipes[extras++]);
            }

            let entries: MealScheduleEntry[] = recipes.slice(0, 7).map((recipe, i) => {
                return { 
                    date: moment(date).add(i, 'days').toDate().getTime(), 
                    recipeId: recipe._id,
                    recipeName: recipe.title,
                    recipeImageUrl: recipe.imageUrl
                };
            })

            return { entries };
        })

    }

}