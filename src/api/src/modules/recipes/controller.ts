import { Router } from 'express';
import { Recipe, Recipes } from './model';

const router = Router();

router.route('/recipes')

    .get((req, res) => {
        Recipes
            .find()
            .sort('title')
            .then((recipes) => res.send(recipes.map(applyLink)))
            .catch(err => res.send(500, err))
    })

    .post((req, res) => {

        Recipes.create({
            title: req.body.title,
            url: req.body.url,
        }).then(newRecipe => {
            let recipe = applyLink(newRecipe);
            res.setHeader("Location", recipe._link);
            res.status(201).json(recipe);
        });

    });


router.route('/recipes/:id')
    
    .get((req, res) => {
        console.log(`finding recipe by id ` + req.params.id);

        Recipes.findById(req.params.id, function(err, recipe){
            console.log('got response... ', err, recipe)

                if(err) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(applyLink(recipe));
                }
            });
    })
    
    .delete((req, res) => {
        Recipes.findByIdAndRemove(req.params.id)
            .then((err) => res.sendStatus(err ? 500 : 200));
    })


function applyLink(recipe: Recipe) {
    if(!recipe) return;

    let copy = JSON.parse(JSON.stringify(recipe));
    copy._link = `/recipes/${recipe._id}`;
    return copy;
}


export = router;