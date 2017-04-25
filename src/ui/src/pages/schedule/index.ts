import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MealScheduleEntry } from '../../model';
import { RecipesService } from '../../services/recipes-service';
import { MealScheduleService } from '../../services/meal-schedule-service';

@Component({
  selector: 'schedule-page',
  templateUrl: 'list.html'
})
export class SchedulePage {

  entries: MealScheduleEntry[];
  selectedDay = new Date().getDay();

  constructor(
    private recipesService: RecipesService,
    private mealsScheduleService: MealScheduleService,
    private toaster: ToastController
  ) {
    this.loadSchedule(new Date());
  }

  async loadSchedule(date: Date) {
    let schedule = await this.mealsScheduleService.getScheduleForWeekContaining(date);
    let recipes = await this.recipesService.getRecipes();

    this.entries = schedule.entries.map(entry => {

      let recipe = recipes.find(x => x._id == entry.recipeId);

      return {
        recipeName: recipe.title,
        recipeImageUrl: recipe.thumbnailUrl,
        ...entry
      }
    });
  }

  selectDay(entry: MealScheduleEntry) {
    this.toaster.create({
      message: 'Meal details coming soon!',
      duration: 3000,
      position: 'top'
    }).present()
  }
}
