import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MealSchedule, MealScheduleEntry } from '../../model';
import { SchedulesStore } from '../../services/schedules-store';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'schedule-page',
  templateUrl: 'list.html'
})
export class SchedulePage {
  schedule: Observable<MealSchedule>;

  constructor(
    private schedules: SchedulesStore,
    private toaster: ToastController
  ) {
    this.schedule = schedules.getScheduleForWeekContaining(new Date());
  }

  date(entry: MealScheduleEntry) {
    return new Date(entry.date);
  }

  selectDay(entry: MealScheduleEntry) {
    this.toaster.create({
      message: 'Meal details coming soon!',
      duration: 3000,
      position: 'top'
    }).present()
  }
}
