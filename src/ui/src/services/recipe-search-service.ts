import { default as config } from '../config';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Recipe } from '../model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

export interface RecipeSearchResult {
    page: number;
    count: number;
    recipes: Recipe[];
}

/*
count: Number of recipes in result (Max 30)
recipes: List of Recipe Parameters ->
	image_url: URL of the image
	source_url: Original Url of the recipe on the publisher's site
	f2f_url: Url of the recipe on Food2Fork.com
	title: Title of the recipe
	publisher: Name of the Publisher
	publisher_url: Base url of the publisher
	social_rank: The Social Ranking of the Recipe (As determined by our Ranking Algorithm)
	page: The page number that is being returned (To keep track of concurrent requests)
*/
interface Food2ForkRecipeSearchResult {
    recipe_id: number;
    image_url: string;
    source_url: string;
    f2f_url: string;
    title: string;
    publisher: string;
    publisher_url: string;
    social_rank: number;
    page?: number;
    ingredients?: string[]
}

interface Food2ForkSearchResult {
    count: number;
    recipes: Food2ForkRecipeSearchResult[]
}

interface Food2ForkGetRecipeResult {
    recipe: Food2ForkRecipeSearchResult
}

const mapToRecipe = (src: Food2ForkRecipeSearchResult): Recipe => {
    return {
        imageUrl: src.image_url,
        thumbnailUrl: src.image_url,
        url: src.source_url,
        id: src.recipe_id ? src.recipe_id.toString() : null,
        title: src.title,
        socialRating: src.social_rank,
        ingredients: src.ingredients
    }
}

function opts() {
    return {
        headers: new Headers({
            "x-functions-key": config.recipeSearch.apiKey
        })
    }
}

@Injectable()
export class RecipeSearchService {

    constructor(private http: Http) {
    }

    get({ id }): Promise<Recipe> {
        return this.http.get(`https://buffetbot.azurewebsites.net/recipes/${id}`, opts())
                .map<Response, Food2ForkGetRecipeResult>(resp => resp.json())
                .map<Food2ForkGetRecipeResult, Recipe>(result => mapToRecipe(result.recipe))
                .first()
                .toPromise();
    }

    search(query: string, page: number = 1): Observable<RecipeSearchResult> {

        if(!query || !query.length) {
            return Observable.of({});
        }

        console.log('recipe search for '+ query)

        return this.http.post(`https://buffetbot.azurewebsites.net/recipes/search?page=${page}&q=${query}`, null, opts())
                .map<Response, Food2ForkSearchResult>(resp => resp.json())
                .map<Food2ForkSearchResult, RecipeSearchResult>(result => ({
                    page: page,
                    count: result.count,
                    recipes: result.recipes.map(mapToRecipe)
                }));
    }
}