import { Component } from '@angular/core';
import { ToastController, ModalController, IonicPage } from 'ionic-angular';
import { MealScheduleEntry } from '../../model';
import { SchedulesStore } from '../../services/schedules-store';
import { Observable } from "rxjs/Observable";
import { RecipePage } from "../recipe";
import { EatOutAction } from '../../actions/eat-out-action';
import { ReplaceMealAction } from '../../actions/replace-meal-action';
import { GenerateScheduleAction } from '../../actions/generate-schedule-action';

@IonicPage()
@Component({
  selector: 'schedule-page',
  templateUrl: 'list.html'
})
export class SchedulePage {
  schedule: Observable<MealScheduleEntry[]>;

  constructor(
    private schedules: SchedulesStore,
    private toaster: ToastController,
    public modal: ModalController,
    private eatOutAction: EatOutAction,
    private replaceMealAction: ReplaceMealAction,
    private generateScheduleAction: GenerateScheduleAction,
  ) {
    let today = new Date();

    this.schedule = schedules.getScheduleForWeekContaining(today);

    this.schedule.subscribe(entries => {
      
      if(!entries || !entries.length) {
        generateScheduleAction.execute({ date: today });
      }

    });
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

  eatOut(entry: MealScheduleEntry) {
      this.eatOutAction.execute({ date: entry.date });
  }

  regenerate() {
    this.generateScheduleAction.execute({ date: new Date() });
  }

  replace(entry: MealScheduleEntry) {
      this.replaceMealAction.execute({ date: entry.date });
  }

}
