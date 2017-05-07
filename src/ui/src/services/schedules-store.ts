import * as moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import { MealSchedule } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SchedulesStore {

    constructor(private userData: UserDataService) {
    }

    getScheduleForWeekContaining(date: Date): Observable<MealSchedule> {
        let mDate = moment(date);
        return this.getScheduleForWeek(mDate.week(), mDate.year());
    }

    getScheduleForWeek(week: number, year: number = new Date().getFullYear()): Observable<MealSchedule> {
        return this.userData.object<MealSchedule>(`/schedules/${year}/${week}`)
                            .map(entries => <MealSchedule>{
                                entries: entries
                            });
    }

}