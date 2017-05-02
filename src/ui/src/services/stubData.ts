import * as moment from 'moment';
import { range } from '../util';
import { Recipe, MealSchedule, MealScheduleEntry } from '../model';

let recipes: Recipe[] = [
    { id: "4138", title: "Asian Beef with Snow Peas", url: "http://allrecipes.com/recipe/15679/asian-beef-with-snow-peas/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x315/971360.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x180/971360.jpg" },
    { id: "4139", title: "Citrus Broiled Alaskan Salmon", url: "http://allrecipes.com/recipe/9337/citrus-broiled-alaska-salmon", imageUrl: "http://images.media-allrecipes.com/userphotos/560x560/9183.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x250/9183.jpg" },
    { id: "4136", title: "Easy Parmesan Crusted Chicken", url: "http://allrecipes.com/recipe/222171/easy-parmesan-crusted-chicken/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x560/986167.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x250/986167.jpg" },
    { id: "4137", title: "Greek Island Chicken Shish Kebabs", url: "http://allrecipes.com/recipe/218485/greek-island-chicken-shish-kebabs/", imageUrl: "http://images.media-allrecipes.com/userphotos/560x315/683907.jpg", thumbnailUrl: "http://images.media-allrecipes.com/userphotos/250x180/683907.jpg" }
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