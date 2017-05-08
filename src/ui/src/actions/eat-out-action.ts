import { Injectable } from '@angular/core';
import { IAction } from './action';
import { ReplaceMealAction } from './replace-meal-action';
import { RecipesStore } from '../services/recipes-store';

export interface EatOutActionParams {
    date: number;
}

@Injectable()
export class EatOutAction implements IAction<EatOutActionParams> {

    constructor(private replaceMeal: ReplaceMealAction) {
    }

    async execute(params: EatOutActionParams): Promise<void> {
        this.replaceMeal.execute({
            date: params.date,
            recipeId: RecipesStore.EatOutRecipe.id
        });
    }

}
