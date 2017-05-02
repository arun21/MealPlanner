import { Component } from '@angular/core';
import { ToastController, ModalController, IonicPage } from 'ionic-angular';
import { MealSchedule, MealScheduleEntry } from '../../model';
import { SchedulesStore } from '../../services/schedules-store';
import { Observable } from "rxjs/Observable";
import { RecipePage } from "../recipe";

@IonicPage()
@Component({
  selector: 'schedule-page',
  templateUrl: 'list.html'
})
export class SchedulePage {
  schedule: Observable<MealSchedule>;

  constructor(
    private schedules: SchedulesStore,
    private toaster: ToastController,
    public modal: ModalController
  ) {
    this.schedule = schedules.getScheduleForWeekContaining(new Date());
  }

  date(entry: MealScheduleEntry) {
    return new Date(entry.date);
  }

  selectDay(entry: MealScheduleEntry) {
    this.modal.create(RecipePage, { 
        recipeId: entry.recipeId 
      })
      .present();
  }
}
