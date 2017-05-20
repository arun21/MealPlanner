var fetch = require('node-fetch');

var apiKey = process.env.f2f_api_key;

module.exports = function (context, req) {

    let query = req.query.q, 
        page = req.query.page || 1;

    return fetch(`http://food2fork.com/api/search?key=${apiKey}&page=${page}&q=${query}`)
        .then(function(x) { return x.json() })
        .then(function(x) { 
            context.res = x;
            context.done();
        });
};