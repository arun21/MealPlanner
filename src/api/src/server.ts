import config = require("./config");
import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import mongoose = require("mongoose");
import { Recipe, Recipes } from "./model";

const app = express();

// console logging
app.use(morgan("short"));

// enable request body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ 
            "_links": [
                "/recipes"
            ] 
        });
    });

router.post("/reset", (req, res) => {
    Recipes.remove({})
        .then(() => 
            Recipes.create([
                { title: 'Chicken Parmesan', url:'http://allrecipes.com/chicken_parmesan' },
                { title: 'Boston Baked Beans', url:'http://allrecipes.com/baked_beans' },
            ])
        )
        .then(_ => {
            res.sendStatus(200);
        })
});


router.get("/recipes", (req, res) => {
    Recipes.find().exec(function(err, recipes){
        res.send(recipes);
    });
});

router.post("/recipes", (req, res) => {

    Recipes.create({
        title: req.body.title,
        url: req.body.url,
    }).then(recipe => {
        res.setHeader("Location", recipe._link);
        res.status(201).json(recipe);
    });

});

router.get("/recipes/:id", (req, res) => {
    console.log(`finding recipe by id ` + req.params.id);

    Recipes.findById(req.params.id, function(err, recipe){
        console.log('got response... ', err, recipe)

            if(err) {
                res.sendStatus(404);
                return;
            } else {
                res.send(recipe);
            }
        });
});

app.use("/", router);

console.log(`connecting to mongodb at ${config.mongoDbUrl}...`);

mongoose.connection.on('error', console.error.bind(console, "MongoDB connection error:"));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbUrl).then(
        () => {
            console.log("connected to mongodb");

            app.listen(config.port);
            console.log(`Listening for requests on port ${config.port}`);
        },
        console.error.bind(console, "MongoDB connection error:"),
    );
