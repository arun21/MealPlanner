import config = require("./config");
import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import mongoose = require("mongoose");
import recipesModule = require("./modules/recipes");
import fs = require('fs')
import path = require('path')


const app = express();

// console logging
app.use(morgan("short"));

// enable request body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

app.use("/", router);

const moduleNames = fs.readdirSync('./src/modules').filter(file => fs.statSync(path.join('./src/modules', file)).isDirectory());

moduleNames.forEach((moduleName: string) => {

    let module = require(`./modules/${moduleName}`);

    if(module.controller) {
        router.use('/',module.controller);
        return moduleName;
    }

});

router.get("/", (req, res) => {
    res.json({ 
            "_links": moduleNames.map(x => `/${x}`)
        });
    });


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
