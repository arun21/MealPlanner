import * as Raven from 'raven-js';
import { Component, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IonicPage, ToastController } from 'ionic-angular';
import { RecipeSearchService, RecipeSearchResult } from '../../services/recipe-search-service';
import { AddRecipeAction } from '../../actions/add-recipe-action';
import { Recipe } from '../../model';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'recipe-search-page',
  template: `
    <ion-header no-border>
      <ion-toolbar>
        <ion-buttons start> 
          <button ion-button icon-left navPop>
            <ion-icon name="arrow-back"></ion-icon>
            Done
          </button>
        </ion-buttons>
        <ion-title>Recipe Search</ion-title>
      </ion-toolbar>
      <ion-toolbar>
      <ion-searchbar [(ngModel)]="filter" (search)="applyFilter($event.target.value)" showCancelButton="true"> </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <recipe-list [recipes]="(searchResult | async)?.recipes" (recipeSelected)="onRecipeSelected($event)"></recipe-list>
    </ion-content>
  `
})
export class RecipeSearchPage {

  @Input() filter: string = '';
  searchResult: Observable<RecipeSearchResult>;

  constructor(
    private recipeSearchService: RecipeSearchService,
    private addRecipeAction: AddRecipeAction,
    private toast: ToastController,
  ) {
    this.applyFilter(this.filter);
  }

  applyFilter(filter: string) {
    this.searchResult = this.recipeSearchService.search(filter);
  }

  onRecipeSelected(result: Recipe) {
    this.recipeSearchService.get(result).then(this.addRecipe.bind(this));
  }

  addRecipe(recipe: Recipe) {
      this.addRecipeAction.execute(recipe)
        .then(() => {
          this.toast.create({
            message: `Added ${recipe.title} to your recipe box.`,
            duration: 1000
          }).present();
        })
        .catch((err) => {
          Raven.captureException(err);
          Raven.showReportDialog({});
        });
  }

}
