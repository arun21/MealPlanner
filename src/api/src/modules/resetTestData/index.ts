import { Router } from 'express';
import { Recipe, Recipes } from '../recipes/model';

const recipes = [
    { title: 'Easy Parmesan Crusted Chicken', url:'http://allrecipes.com/recipe/222171/easy-parmesan-crusted-chicken/', imageUrl: 'http://images.media-allrecipes.com/userphotos/560x560/986167.jpg', thumbnailUrl: 'http://images.media-allrecipes.com/userphotos/250x250/986167.jpg' },
    { title: 'Greek Island Chicken Shish Kebabs', url:'http://allrecipes.com/recipe/218485/greek-island-chicken-shish-kebabs/', imageUrl: 'http://images.media-allrecipes.com/userphotos/560x315/683907.jpg', thumbnailUrl: 'http://images.media-allrecipes.com/userphotos/250x180/683907.jpg' },
    { title: 'Asian Beef with Snow Peas', url: 'http://allrecipes.com/recipe/15679/asian-beef-with-snow-peas/', imageUrl: 'http://images.media-allrecipes.com/userphotos/560x315/971360.jpg', thumbnailUrl: 'http://images.media-allrecipes.com/userphotos/250x180/971360.jpg' },
    { title: 'Citrus Broiled Alaskan Salmon', url: 'http://allrecipes.com/recipe/9337/citrus-broiled-alaska-salmon', imageUrl: 'http://images.media-allrecipes.com/userphotos/560x560/9183.jpg', thumbnailUrl: 'http://images.media-allrecipes.com/userphotos/250x250/9183.jpg' }
];

const controller = Router().all("/resetTestData", (req, res) => {
    Recipes.remove({})
        .then(() => Recipes.create(recipes))
        .then(_ => res.sendStatus(200))
});

export {
    controller
}