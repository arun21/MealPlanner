import { Injectable } from '@angular/core';
import { Ingredient } from '../model';

@Injectable()
export class IngredientParser {

    parse(ingredient: string): Ingredient {

        if(ingredient === undefined || ingredient === null || !ingredient.length) {
            return null;
        }

        const matches = /(\S*) (\S*)(.*)/gi.exec(ingredient);

        if(!matches || matches.length < 4) {
            return { name: ingredient };
        }

        let parsed = {
            quantity: matches[1],
            unit: matches[2],
            name: matches[3],
        };

        if(!parsed.name) {
            parsed.name = parsed.unit;
            parsed.unit = null;
        }

        parsed.name = parsed.name.charAt(0).toUpperCase() + parsed.name.slice(1);

        return parsed;
    }

}