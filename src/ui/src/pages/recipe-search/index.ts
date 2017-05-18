import { Component, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IonicPage, ModalController } from 'ionic-angular';
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
    private store: RecipeSearchService,
    public modal: ModalController,
    private addRecipe: AddRecipeAction,
  ) {
    this.applyFilter(this.filter);
  }

  applyFilter(filter: string) {
    this.searchResult = this.store.search(filter);
  }

  onRecipeSelected(result: Recipe) {
    this.store.get(result).first().toPromise().then(recipe => {
      this.addRecipe.execute(recipe);
    })
  }

}
