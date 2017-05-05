import { Component, Input } from '@angular/core';
import { ShoppingListEntry } from '../model';

@Component({
    selector: 'shopping-list',
    template: `
        <ion-list>
            <button ion-item *ngFor="let item of shoppingList">
                {{ item.name }}
            </button>
        </ion-list>
    `
})
export class ShoppingList {
    @Input() shoppingList: ShoppingListEntry[] = [];
}
