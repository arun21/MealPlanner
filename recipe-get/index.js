var fetch = require('node-fetch');

var apiKey = process.env.f2f_api_key;

module.exports = function (context, req) {

    let id = context.bindingData.id;

    return fetch(`http://food2fork.com/api/get?key=${apiKey}&rId=${id}`)
        .then(function(x) { return x.json() })
        .then(function(x) { 
            context.res = x;
            context.done();
        });
};