import { Injectable } from '@angular/core';
import { Recipe } from '../model';
import { default as config } from '../config';

@Injectable()
export class RecipesService {

    static stubData: Recipe[] = [
        {"_id":"58fe4b3bedf0dc5a006c4138","title":"Asian Beef with Snow Peas","url":"http://allrecipes.com/recipe/15679/asian-beef-with-snow-peas/","imageUrl":"http://images.media-allrecipes.com/userphotos/560x315/971360.jpg","thumbnailUrl":"http://images.media-allrecipes.com/userphotos/250x180/971360.jpg","_link":"/recipes/58fe4b3bedf0dc5a006c4138"},
        {"_id":"58fe4b3bedf0dc5a006c4139","title":"Citrus Broiled Alaskan Salmon","url":"http://allrecipes.com/recipe/9337/citrus-broiled-alaska-salmon","imageUrl":"http://images.media-allrecipes.com/userphotos/560x560/9183.jpg","thumbnailUrl":"http://images.media-allrecipes.com/userphotos/250x250/9183.jpg","_link":"/recipes/58fe4b3bedf0dc5a006c4139"},
        {"_id":"58fe4b3bedf0dc5a006c4136","title":"Easy Parmesan Crusted Chicken","url":"http://allrecipes.com/recipe/222171/easy-parmesan-crusted-chicken/","imageUrl":"http://images.media-allrecipes.com/userphotos/560x560/986167.jpg","thumbnailUrl":"http://images.media-allrecipes.com/userphotos/250x250/986167.jpg","_link":"/recipes/58fe4b3bedf0dc5a006c4136"},
        {"_id":"58fe4b3bedf0dc5a006c4137","title":"Greek Island Chicken Shish Kebabs","url":"http://allrecipes.com/recipe/218485/greek-island-chicken-shish-kebabs/","imageUrl":"http://images.media-allrecipes.com/userphotos/560x315/683907.jpg","thumbnailUrl":"http://images.media-allrecipes.com/userphotos/250x180/683907.jpg","_link":"/recipes/58fe4b3bedf0dc5a006c4137"}
    ]

    getRecipes(): Promise<Recipe[]> {

        return config.stubMode
            ? Promise.resolve(RecipesService.stubData)
            : fetch('http://localhost:8080/recipes')
                .then(resp => <any>resp.json());
    }

}