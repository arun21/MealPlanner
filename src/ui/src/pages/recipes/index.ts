import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Recipe } from '../../model';

@Component({
  selector: 'page-home',
  template: `
    <ion-header>
      <main-nav></main-nav>
    </ion-header>
    <ion-content padding>
      <h2>Recipes</h2>
      <recipe-list [recipes]="recipes" (recipeSelected)="onRecipeSelected"></recipe-list>
    </ion-content>
  `
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(public navCtrl: NavController) {
    this.loadRecipes()
  }

  loadRecipes() {
    fetch('http://localhost:8080/recipes')
      .then(resp => resp.json())
      .then((recipes: any) => this.recipes = recipes)
  }

  onRecipeSelected(recipe: Recipe) {
    console.log('Recipe selected: ', recipe);
  }

}
