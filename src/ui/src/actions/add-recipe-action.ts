import { Injectable } from '@angular/core';
import { IAction } from './action';
import { Recipe, Ingredient } from '../model';
import { UserDataService } from '../services/user-data-service';

export interface AddRecipeActionParams {
    title: string;
    url: string;
    imageUrl: string;
    thumbnailUrl?: string;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    servings?: number;
    calories?: number;
    myRating?: number;
    socialRating?: number;
    ingredients?: (string | Ingredient)[];
    directions?: string[];
    notes?: string;
}

@Injectable()
export class AddRecipeAction implements IAction<AddRecipeActionParams> {

    constructor(private userData: UserDataService) {
    }

    async execute(params: AddRecipeActionParams): Promise<void> {
        
        if(!params || !params.title || !params.url || !params.imageUrl)
            throw 'Invalid Add Recipe Request: ' + JSON.stringify(params);

        console.debug('[AddRecipeAction::execute] ', params);

        const newRecipe: Recipe = {
            id: params.url,
            imageUrl: params.imageUrl,
            title: params.title,
            url: params.url,
            ingredients: params.ingredients,

            calories: params.calories,
            cookTime: params.cookTime,
            directions: params.directions,
            myRating: params.myRating,
            notes: params.notes,
            prepTime: params.prepTime,
            servings: params.servings,
            socialRating: params.socialRating,
            thumbnailUrl: params.thumbnailUrl,
            totalTime: params.totalTime,
        };

        console.info('Adding recipe '+ JSON.stringify(newRecipe));

        return this.userData
                .list<Recipe[]>('/recipes')
                .push(newRecipe)
                .then(() => console.log('Successfully added recipe'))
                .catch((error) => console.error('Error adding recipe: ' + JSON.stringify(error)));

    }

}
