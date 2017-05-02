import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../model';

@Component({
    selector: 'recipe',
    template: `
        <div>
            <h3>{{recipe.title}}</h3>
            <p><a [href]="recipe.url">{{urlDisplayName(recipe)}}</a></p>
            <ion-img [src]="recipe.imageUrl" width="80%" [alt]="recipe.title"></ion-img>
        </div>
        <div>
            <h4>Ingredients</h4>
            <em>Coming soon...</em>
        </div>
        <div>
            <h4>Directions</h4>
            <em>Coming soon...</em>
        </div>
    `
})
export class RecipeViewer {
    @Input() recipe: Recipe;

    urlDisplayName(recipe: Recipe) {
        return /\/\/([^\/]*)/.exec(recipe.url)[1];
    }
}
