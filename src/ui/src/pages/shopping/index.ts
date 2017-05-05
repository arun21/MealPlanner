import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ShoppingListEntry } from '../../model';
import { Observable } from "rxjs/Observable";
import { ShoppingListStore } from '../../services/shopping-list-store';

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
      <shopping-list [shoppingList]="shoppingList | async"></shopping-list>
    </ion-content>
  `
})
export class ShoppingPage {

  shoppingList: Observable<ShoppingListEntry[]>;

  constructor(private shoppingLists: ShoppingListStore) {
    this.shoppingList = shoppingLists.getShoppingListForWeekContaining(new Date());
  }

}
