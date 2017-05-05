import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model';

@Component({
    selector: 'recipe-list',
    template: `
        <ion-list>
            <button ion-item *ngFor="let recipe of recipes" (click)="selectRecipe(recipe)">
                <div item-label>
                    <div>{{ recipe.title }}</div>
                </div>
                <ion-thumbnail item-content>
                    <img [src]="recipe.thumbnailUrl" />
                </ion-thumbnail>
            </button>
        </ion-list>
    `
})
export class RecipeList {

    @Input() recipes: Recipe[] = [];
    @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter();

    selectRecipe(recipe: Recipe) {
        console.log('selectRecipe: ', recipe);
        this.recipeSelected.emit(recipe);
    }
}
