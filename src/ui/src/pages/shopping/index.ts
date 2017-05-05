import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'shopping-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-title>Shopping List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <h3 ion-text color="primary">Coming Soon!</h3>
      <shopping-list [shoppingItems]="recipes | async" (itemSelected)="onRecipeSelected"></shopping-list>
    </ion-content>
  `
})
export class ShoppingPage {}
