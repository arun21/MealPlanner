import { Injectable } from '@angular/core';
import { Ingredient } from '../model';

@Injectable()
export class IngredientParser {

    parse(ingredient: string): Ingredient {
        const matches = /(\S*) (\S*) (.*)/gi.exec(ingredient);

        if(matches.length < 4) {
            return { name: ingredient };
        }

        // Upper-case the first letter of the name
        let name = matches[3];
        name = name.charAt(0).toUpperCase() + name.slice(1);

        return {
            quantity: matches[1],
            unit: matches[2],
            name: name,
        };
    }

}