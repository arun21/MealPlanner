
process.env.f2f_api_key = '0273dd6ab41e73d43192ab12ae52da26';

var express = require('express')
var app = express()
var getRecipe = require('./recipe-get');
var recipeSearch = require('./recipe-search');

function getContext(req, res) {
  let context = {
      log: console.log,
      bindingData: req.params || {},
      req: req,
      res: {},
      done: function() {
          res.send(context.res);
      }
  };
  return context;
}

app.get('/', function (req, res) {
  res.send({
    'search': '/recipes/search',
    'get': '/recipes/:id'
  })
})
  
app.get('/recipes/search', function (req, res) {
  recipeSearch(getContext(req, res), req)
})

app.get('/recipes/:id', function (req, res) {
  getRecipe(getContext(req, res), req)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})