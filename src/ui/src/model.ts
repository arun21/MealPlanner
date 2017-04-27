export interface Recipe {
    _id: string;
    _link: string;
    title: string;
    url: string;
    imageUrl: string;
    thumbnailUrl: string;
}

export interface MealSchedule {
    entries: MealScheduleEntry[];
}

export interface MealScheduleEntry {
    date: number;
    recipeId: string;
    recipeName: string;
    recipeImageUrl: string;
}