var Twitter = require('../twitter');
var messages = require('../messages.json');

function searchByTerm(searchTerm) {
    var query = {
            q: searchTerm,
            count: 60
        }
        // search and return a promise
    return Twitter.get('search/tweets', query);
}

exports.searchByTerm = searchByTerm;