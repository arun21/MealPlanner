export interface Recipe {
    id: string;
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
    ingredients: string[];
    directions: string[];
    notes?: string;
}

export interface MealSchedule {
    year: number;
    week: number;
    entries: MealScheduleEntry[];
}

export interface MealScheduleEntry {
    date: number;
    recipeId: string;
    recipeName: string;
    recipeImageUrl: string;
}

export interface User {
    uid: string;
}

export interface ShoppingListEntry {
    name: string;
    amount: string;
}