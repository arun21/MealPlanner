import { Component } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { Observable } from "rxjs/Observable";
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'recipe-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-buttons start> 
          <button ion-button icon-left navPop>
            <ion-icon name="arrow-back"></ion-icon>
            Back
          </button>
        </ion-buttons>
        <ion-title>{{(recipe | async)?.title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <recipe [recipe]="(recipe | async)"></recipe>
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
