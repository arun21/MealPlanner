import * as moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import { MealSchedule } from '../model';
import { UserDataService } from './user-data-service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { default as config } from '../config';
import { default as stubData } from './stubData';

@Injectable()
export class SchedulesStore extends BehaviorSubject<MealSchedule[]> {

    constructor(private userData: UserDataService) {
        super(stubData.schedules);

        if (!config.stubMode)
            this.source = this.userData.list('/schedules');
    }

    getScheduleForWeekContaining(date: Date): Observable<MealSchedule> {
        let mDate = moment(date);
        return this.getScheduleForWeek(mDate.week(), mDate.year());
    }

    getScheduleForWeek(week: number, year: number = new Date().getFullYear()): Observable<MealSchedule> {
        return this.flatMap(x => x).first(x => x.year === year && x.week === week);
    }

}