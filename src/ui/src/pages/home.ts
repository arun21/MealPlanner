import { Component } from '@angular/core';
import { SchedulePage } from './schedule';
import { RecipesPage } from './recipes';
import { ShoppingPage } from './shopping';

@Component({
  selector: 'home-page',
  template: `
    <ion-tabs selectedIndex="1">
      <ion-tab [root]="recipes" tabTitle="Recipes" tabIcon="paper"></ion-tab>
      <ion-tab [root]="schedule" tabTitle="Schedule" tabIcon="calendar"></ion-tab>
      <ion-tab [root]="shopping" tabTitle="Shopping" tabIcon="cart"></ion-tab>
    </ion-tabs>
  `
})
export class HomePage {
  recipes = RecipesPage
  schedule = SchedulePage
  shopping = ShoppingPage
}
