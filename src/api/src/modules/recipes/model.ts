import * as mongoose from 'mongoose';

export interface Recipe extends mongoose.Document {
    _link?: string;
    title: string;
    url: string;
    imageUrl: string;
    thumbnailUrl: string;
}

const RecipeSchema = new mongoose.Schema({
    title: String,
    url: String,
    imageUrl: String,
    thumbnailUrl: String
});

export const Recipes = mongoose.model<Recipe>('Recipe', RecipeSchema);