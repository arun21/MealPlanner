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
    @Output() onViewExternal = new EventEmitter();

    get urlDisplayName() {
        return /\/\/([^\/]*)/.exec(this.recipe.url)[1];
    }
}
