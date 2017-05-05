import { Component, Input } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { Observable } from "rxjs/Observable";
import { IonicPage, ModalController } from 'ionic-angular';
import { RecipePage } from "../recipe";
import { RecipeBrowserPage } from "../recipe-browser";

@IonicPage()
@Component({
  selector: 'recipes-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-title>Recipes</ion-title>
        <ion-buttons end>
          <button ion-button icon-only (click)="importFromWeb()">
            <ion-icon name="add" role="img" class="icon icon-ios ion-ios-add" aria-label="add"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
      <ion-searchbar [(ngModel)]="filter" (ionInput)="applyFilter($event.target.value)" showCancelButton="true"> </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <recipe-list [recipes]="recipes | async" (recipeSelected)="onRecipeSelected($event)"></recipe-list>
    </ion-content>
  `
})
export class RecipesPage {

  @Input()filter: string = '';
  recipes: Observable<Recipe[]>;

  constructor(
    private store: RecipesStore,
    public modal: ModalController
  ) {
    this.applyFilter(this.filter);
  }

  applyFilter(filter: string) {
    this.recipes = this.store.search(this.filter);
  }

  onRecipeSelected(recipe: Recipe) {
    this.modal.create(RecipePage, { 
        recipeId: recipe.id 
      })
      .present();
  }

  importFromWeb() {
    this.modal.create(RecipeBrowserPage).present();
  }

}
