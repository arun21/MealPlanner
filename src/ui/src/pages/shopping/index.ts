import { Component } from '@angular/core';

@Component({
  selector: 'shopping-page',
  template: `
    <ion-header>
      <main-nav></main-nav>
    </ion-header>
    <ion-content padding>
      <h2>Shopping List</h2>
      <h3 ion-text color="primary">Coming Soon!</h3>
      <shopping-list [shoppingItems]="recipes | async" (itemSelected)="onRecipeSelected"></shopping-list>
    </ion-content>
  `
})
export class ShoppingPage {}
