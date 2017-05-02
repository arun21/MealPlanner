import { Component } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { Observable } from "rxjs/Observable";
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'recipe-page',
  template: `
    <ion-header>
      <button ion-button navPop>Go Back</button>
    </ion-header>
    <ion-content padding>
      <h2>Recipe</h2>
      <recipe [recipe]="recipe | async"></recipe>
    </ion-content>
  `
})
export class RecipePage {

  recipe: Observable<Recipe>;

  constructor(
    private recipesStore: RecipesStore,
    private navParams: NavParams
  ) {
    let recipeId = navParams.get("recipeId");
    this.recipe = recipesStore.getRecipe(recipeId);
  }

}
