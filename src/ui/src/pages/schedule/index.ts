import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MealSchedule, MealScheduleEntry } from '../../model';
import { SchedulesStore } from '../../services/schedules-store';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'schedule-page',
  templateUrl: 'list.html'
})
export class SchedulePage {

  schedule: FirebaseObjectObservable<MealSchedule>;
  selectedDay = new Date().getDay();

  constructor(
    private schedules: SchedulesStore,
    private toaster: ToastController,
    private firebase: AngularFire
  ) {
    this.schedule = this.schedules.getScheduleForWeekContaining(new Date());
  }

  selectDay(entry: MealScheduleEntry) {
    this.toaster.create({
      message: 'Meal details coming soon!',
      duration: 3000,
      position: 'top'
    }).present()
  }
}
