import { Component } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { Observable } from "rxjs/Observable";
import { IonicPage, ModalController } from 'ionic-angular';
import { RecipePage } from "../recipe";

@IonicPage()
@Component({
  selector: 'recipes-page',
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

  recipes: Observable<Recipe[]>;

  constructor(
    private recipesStore: RecipesStore,
    public modal: ModalController
  ) {
    this.recipes = recipesStore.recipes;
  }

  onRecipeSelected(recipe: Recipe) {
    this.modal.create(RecipePage, { 
        recipeId: recipe.id 
      })
      .present();
  }

}
