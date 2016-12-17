var Twitter = require('../twitter');
var messages = require('../messages.json');

function searchByTerm(searchTerm) {
    var query = {
            q: searchTerm,
            count: 100
        }
        // search and return a promise
    return Twitter.post('search/tweets', query);
}

exports.searchByTerm = searchByTerm;