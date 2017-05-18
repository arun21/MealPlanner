import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Recipe } from '../model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { default as stubData } from './stubData';

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

const mapToRecipe = (src: Food2ForkRecipeSearchResult): Recipe => {
    return {
        imageUrl: src.image_url,
        thumbnailUrl: src.image_url,
        url: src.source_url,
        id: src.f2f_url,
        title: src.title,
        socialRating: src.social_rank,
        ingredients: src.ingredients
    }
}

@Injectable()
export class RecipeSearchService {

    constructor(private http: Http) {
    }

    get({ id }): Observable<Recipe> {
        return Observable.of(new Response({ url: '', merge: null, status: 200, body: stubData.searchResult.recipes.find(x => x.f2f_url == id), headers: new Headers() }))
        //return this.http.get(`https://buffetbot.azurewebsites.net/api/HttpTriggerJS1?code=ymRrKp/2a5uVuBL49rI2LKlMjYaJohpP9cKVfRvt5tc2TTBUHvx73Q==&page=${page}&q=${query}`)
                .map<Response, Food2ForkRecipeSearchResult>(resp => resp.json())
                .map<Food2ForkRecipeSearchResult, Recipe>(mapToRecipe);
    }

    search(query: string, page: number = 1): Observable<RecipeSearchResult> {

        console.log('recipe search for '+ query)

        return Observable.of(new Response({ url: '', merge: null, status: 200, body: stubData.searchResult, headers: new Headers() }))
        //return this.http.get(`https://buffetbot.azurewebsites.net/api/HttpTriggerJS1?code=ymRrKp/2a5uVuBL49rI2LKlMjYaJohpP9cKVfRvt5tc2TTBUHvx73Q==&page=${page}&q=${query}`)
                .map<Response, Food2ForkSearchResult>(resp => resp.json())
                .map<Food2ForkSearchResult, RecipeSearchResult>(result => ({
                    page: page,
                    count: result.count,
                    recipes: result.recipes.map(mapToRecipe)
                }));
    }
}