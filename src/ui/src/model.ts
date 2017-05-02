export interface Recipe {
    id: string;
    title: string;
    url: string;
    imageUrl: string;
    thumbnailUrl: string;
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