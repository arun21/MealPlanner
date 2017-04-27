import { Component } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  template: `
    <ion-header>
      <main-nav></main-nav>
    </ion-header>
    <ion-content padding>
      <h2>Recipes</h2>
      <recipe-list [recipes]="recipes | async" (recipeSelected)="onRecipeSelected"></recipe-list>
    </ion-content>
  `
})
export class RecipesPage {

  recipes: FirebaseListObservable<Recipe[]>;

  constructor(private recipesStore: RecipesStore) {
    this.recipes = recipesStore.recipes;
  }

  onRecipeSelected(recipe: Recipe) {
    console.log('Recipe selected: ', recipe);
  }

}
