import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model';

@Component({
    selector: 'recipe-list',
    template: `
        <ion-list>
            <ion-item-sliding #entryContainer *ngFor="let recipe of recipes">
                <button ion-item (click)="selectRecipe(recipe)">
                    <ion-thumbnail item-left>
                        <img [src]="recipe.thumbnailUrl" />
                    </ion-thumbnail>
                    <ion-label text-wrap>
                        {{ recipe.title }}
                    </ion-label>
                </button>

                <ion-item-options side="right">
                    <button ion-button expandable (click)="onDelete(recipe); entryContainer.close();">
                        <ion-icon name="delete"></ion-icon>
                        Delete
                    </button>
                </ion-item-options>
            </ion-item-sliding>
        </ion-list>
    `
})
export class RecipeList {

    @Input() recipes: Recipe[] = [];
    @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter();
    @Output() deleteRecipe: EventEmitter<Recipe> = new EventEmitter();

    selectRecipe(recipe: Recipe) {
        console.log('selectRecipe: ', recipe);
        this.recipeSelected.emit(recipe);
    }

    onDelete(recipe: Recipe) {
        this.deleteRecipe.emit(recipe);
    }
}
