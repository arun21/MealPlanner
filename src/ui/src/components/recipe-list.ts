import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model';

@Component({
    selector: 'recipe-list',
    template: `
        <ion-list>

            <button ion-item *ngFor="let recipe of recipes" (click)="selectRecipe(recipe)">
            
            <div item-note>
                <img height="200px" [src]="recipe.thumbnailUrl"/>
                <h3>{{recipe.title}}</h3>
            </div>
            
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
