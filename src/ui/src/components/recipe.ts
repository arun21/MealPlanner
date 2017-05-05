import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model';

@Component({
    selector: 'recipe',
    template: `
        <div text-center>
            <ion-img [src]="recipe.imageUrl" [alt]="recipe.title"></ion-img>
            <h3>{{recipe.title}}</h3>
            <p><a [href]="recipe.url" target="_system">{{urlDisplayName}}</a></p>
        </div>
        <ion-list *ngIf="!!recipe.ingredients">
            <ion-list-header>
                Ingredients
            </ion-list-header>
            <ion-item *ngFor="let ingredient of recipe.ingredients" text-wrap>
                {{ingredient}}
            </ion-item>
        </ion-list>
        <ion-list *ngIf="!!recipe.directions">
            <ion-list-header>
                Directions
            </ion-list-header>
            <ion-item *ngFor="let direction of recipe.directions; let i = index;" text-wrap>
                <span item-left>{{i+1}}.</span>
                {{direction}}
            </ion-item>
        </ion-list>
        <ion-list *ngIf="!!recipe.notes">
            <ion-item text-wrap>
                {{recipe.notes}}
            </ion-item>
        </ion-list>
    `
})
export class RecipeViewer {
    @Input() recipe: Recipe;
    @Output() onViewExternal = new EventEmitter();

    get urlDisplayName() {
        return /\/\/([^\/]*)/.exec(this.recipe.url)[1];
    }
}
