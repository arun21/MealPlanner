import * as Raven from 'raven-js';
import { Component, Input } from '@angular/core';
import { Recipe } from '../../model';
import { RecipesStore } from '../../services/recipes-store';
import { Observable } from "rxjs/Observable";
import { IonicPage, ModalController, ToastController } from 'ionic-angular';
import { RecipePage } from "../recipe";
import { RecipeSearchPage } from "../recipe-search";
import { DeleteRecipeAction } from "../../actions/delete-recipe-action";

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
    <ion-content padding [ngSwitch]="(recipes | async)?.length">
      <ion-card *ngSwitchCase="0">

        <ion-card-header text-center>
          Your Recipe Box is empty!
        </ion-card-header>

        <ion-card-content text-center>
          <br>
          <p>You don't have any recipes yet.</p>
          <p>Why don't you use that "+" button up there to load some?</p>
        </ion-card-content>

      </ion-card>
      <recipe-list *ngSwitchDefault [recipes]="recipes | async" 
        (recipeSelected)="onRecipeSelected($event)"
        (deleteRecipe)="onDeleteRecipe($event)"
      ></recipe-list>
    </ion-content>
  `
})
export class RecipesPage {

  @Input() filter: string = '';
  recipes: Observable<Recipe[]>;

  constructor(
    private store: RecipesStore,
    private deleteRecipeAction: DeleteRecipeAction,
    public modal: ModalController,
    private toast: ToastController,
  ) {
    this.applyFilter(this.filter);
  }

  applyFilter(filter: string) {
    this.recipes = this.store.search(this.filter);
  }

  onDeleteRecipe(recipe: Recipe) {
    this.deleteRecipeAction.execute(recipe)
        .then(() => 
          this.toast.create({
            message: `Removed ${recipe.title} from your recipe box`,
            duration: 1000
          }).present()
        )
        .catch(err => {
          Raven.captureException(err);
          Raven.showReportDialog({});
        });
  }

  onRecipeSelected(recipe: Recipe) {
    this.modal.create(RecipePage, {
      recipeId: recipe.id
    })
      .present();
  }

  importFromWeb() {
    this.modal.create(RecipeSearchPage).present();
  }

}
