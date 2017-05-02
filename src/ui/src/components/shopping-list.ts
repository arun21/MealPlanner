import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  } from '../model';

@Component({
    selector: 'shopping-list',
    template: `
        <ion-list>

            <button ion-item *ngFor="let item of shoppingItems" (click)="itemSelected(item)">
            
            <div item-note>
                <img height="200px" [src]="recipe.thumbnailUrl"/>
                <h3>{{recipe.title}}</h3>
            </div>
            
            </button>

        </ion-list>
    `
})
export class ShoppingList {

    @Input() shoppingItems: any[] = [];
    @Output() itemSelected: EventEmitter<any> = new EventEmitter();

    selectItem(item: any) {
        console.log('selectItem: ', item);
        this.itemSelected.emit(item);
    }
}
