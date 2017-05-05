import * as moment from 'moment';
import { range } from '../util';
import { Recipe, MealSchedule, MealScheduleEntry } from '../model';

let recipes: Recipe[] = [
    { id: "4138", title: "Asian Beef with Snow Peas", url: "http://allrecipes.com/recipe/15679/asian-beef-with-snow-peas/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x315/971360.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x180/971360.jpg", ingredients: [ "3 tablespoons soy sauce", "2 tablespoons rice wine", "1 tablespoon brown sugar", "1/2 teaspoon cornstarch", "1 tablespoon vegetable oil", "1 tablespoon minced fresh ginger root", "1 tablespoon minced garlic", "1 pound beef round steak, cut into thin strips", "8 ounces snow peas" ], directions: [ "In a small bowl, combine the soy sauce, rice wine, brown sugar and cornstarch. Set aside.", "Heat oil in a wok or skillet over medium high heat.", "Stir-fry ginger and garlic for 30 seconds.", "Add the steak and stir-fry for 2 minutes or until evenly browned.", "Add the snow peas and stir-fry for an additional 3 minutes.", "Add the soy sauce mixture, bring to a boil, stirring constantly.", "Lower heat and simmer until the sauce is thick and smooth.", "Serve immediately" ], prepTime: 5, cookTime: 10, totalTime: 15, socialRating: 4.5, calories: 203 },
    { id: "4139", title: "Citrus Broiled Alaskan Salmon", url: "http://allrecipes.com/recipe/9337/citrus-broiled-alaska-salmon", imageUrl: "http://images.media-allrecipes.com/userphotos/560x560/9183.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x250/9183.jpg", ingredients: [ "3 tablespoons soy sauce", "2 tablespoons rice wine", "1 tablespoon brown sugar", "1/2 teaspoon cornstarch", "1 tablespoon vegetable oil", "1 tablespoon minced fresh ginger root", "1 tablespoon minced garlic", "1 pound beef round steak, cut into thin strips", "8 ounces snow peas" ], directions: [ "In a small bowl, combine the soy sauce, rice wine, brown sugar and cornstarch. Set aside.", "Heat oil in a wok or skillet over medium high heat.", "Stir-fry ginger and garlic for 30 seconds.", "Add the steak and stir-fry for 2 minutes or until evenly browned.", "Add the snow peas and stir-fry for an additional 3 minutes.", "Add the soy sauce mixture, bring to a boil, stirring constantly.", "Lower heat and simmer until the sauce is thick and smooth.", "Serve immediately" ], prepTime: 5, cookTime: 10, totalTime: 15, socialRating: 4.5, calories: 203 },
    { id: "4136", title: "Easy Parmesan Crusted Chicken", url: "http://allrecipes.com/recipe/222171/easy-parmesan-crusted-chicken/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x560/986167.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x250/986167.jpg", ingredients: [ "3 tablespoons soy sauce", "2 tablespoons rice wine", "1 tablespoon brown sugar", "1/2 teaspoon cornstarch", "1 tablespoon vegetable oil", "1 tablespoon minced fresh ginger root", "1 tablespoon minced garlic", "1 pound beef round steak, cut into thin strips", "8 ounces snow peas" ], directions: [ "In a small bowl, combine the soy sauce, rice wine, brown sugar and cornstarch. Set aside.", "Heat oil in a wok or skillet over medium high heat.", "Stir-fry ginger and garlic for 30 seconds.", "Add the steak and stir-fry for 2 minutes or until evenly browned.", "Add the snow peas and stir-fry for an additional 3 minutes.", "Add the soy sauce mixture, bring to a boil, stirring constantly.", "Lower heat and simmer until the sauce is thick and smooth.", "Serve immediately" ], prepTime: 5, cookTime: 10, totalTime: 15, socialRating: 4.5, calories: 203 },
    { id: "4137", title: "Greek Island Chicken Shish Kebabs", url: "http://allrecipes.com/recipe/218485/greek-island-chicken-shish-kebabs/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x315/683907.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x180/683907.jpg", ingredients: [ "3 tablespoons soy sauce", "2 tablespoons rice wine", "1 tablespoon brown sugar", "1/2 teaspoon cornstarch", "1 tablespoon vegetable oil", "1 tablespoon minced fresh ginger root", "1 tablespoon minced garlic", "1 pound beef round steak, cut into thin strips", "8 ounces snow peas" ], directions: [ "In a small bowl, combine the soy sauce, rice wine, brown sugar and cornstarch. Set aside.", "Heat oil in a wok or skillet over medium high heat.", "Stir-fry ginger and garlic for 30 seconds.", "Add the steak and stir-fry for 2 minutes or until evenly browned.", "Add the snow peas and stir-fry for an additional 3 minutes.", "Add the soy sauce mixture, bring to a boil, stirring constantly.", "Lower heat and simmer until the sauce is thick and smooth.", "Serve immediately" ], prepTime: 5, cookTime: 10, totalTime: 15, socialRating: 4.5, calories: 203 },
];

function generateSchedules() {
    let year = new Date().getFullYear();
    let schedules = [];

    for (let i = 1; i <= 52; i++) {
        let schedule = generateSchedule(year, i);
        schedules.push(schedule);
    }

    return schedules;
}

function generateSchedule(year: number, week: number): MealSchedule {

    let entries: MealScheduleEntry[] = 
        range(0, 7)
            .map(day => {
                let recipe = randomRecipe(),
                    date = moment().year(year).week(week).day(day).utc().valueOf();
                return <MealScheduleEntry>{
                    date: date,
                    recipeId: recipe.id,
                    recipeName: recipe.title,
                    recipeImageUrl: recipe.imageUrl
                }
            });

    return { 
        year,
        week,
        entries
    };
}

function randomRecipe(): Recipe {
    return recipes[Math.floor(Math.random() * recipes.length)];
}

export default {
    recipes: <Recipe[]>recipes,
    schedules: <MealSchedule[]>generateSchedules()
};