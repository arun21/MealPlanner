import * as mongoose from 'mongoose';

export interface Recipe extends mongoose.Document {
    _link?: string;
    title: string;
    url: string;
}

const RecipeSchema = new mongoose.Schema({
    title: String,
    url: String
});

RecipeSchema
    .virtual('_link')
    .get(function () {
        return '/recipes/' + this._id;
    })

export const Recipes = mongoose.model<Recipe>('Recipe', RecipeSchema);