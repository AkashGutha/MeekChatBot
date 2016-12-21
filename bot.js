// set up twiiter app with configurations.
var Twitter = require('./twitter');

// import required library
var Follow = require('./lib/follow');
var Tweet = require('./lib/tweet');
var Search = require('./lib/search');
var SearchTerms = require('./searchterms.json');
var randomQuote = require('./heplers/randomQuote');

// include helper library for predefined messages.
var helperMessages = require('./heplers/messages');

var rng = require('random-number-generator');

var queue = [];

// set up timed functions.
var searchInterval = setInterval(search, 60000);
var followInterval = setInterval(followFromQueue, 1000);
var reviveIterval = setInterval(revive, 1000 * 60 * 60);
var greetInterval = setInterval(greet, 1000 * 60 * 60 * 24);

// set up a user stream
var stream = Twitter.stream('user');

// main program start.

helperMessages.welcomeMsg();

// listen for events on this stream.
stream.on('follow', Follow.gratitudeOnFollow);

// main program end.

function search() {
    Search.searchByTerm(SearchTerms.terms[rng(SearchTerms.terms.length - 1)])
        .then(function (response) {
            response.data.statuses.forEach(function (element) {
                queue.push({
                    id: element.user.id,
                    screen_name: element.user.screen_name
                });
            }, this);
        }).catch(function (error) {
            console.log(error);
        });
    // console.log(queue);
}

function followFromQueue() {
    console.log(queue.length);
    if (queue.length > 0) {
        var user = queue.shift();
        console.log(user.screen_name);
        Follow.follow(user.screen_name, user.id)
            .then(function (response) {
                // do something
                if (response.errors !== undefined) {
                    for (var i = 0; i < response.errors.length; i++) {
                        var error = response.errors[i];
                        if (error.code == 161) {
                            clearInterval(followInterval);
                            clearInterval(searchInterval);
                        }
                    }
                } else {
                    console.log('sucessfully followed');
                }
            });
    }
}

function revive() {
    clearInterval(followInterval);
    clearInterval(searchInterval);
    searchInterval = setInterval(search, 60000);
    followInterval = setInterval(followFromQueue, 1000);
}

function greet() {
    var quote = randomQuote.getRandomQuote();
    if (quote == "error") return;
    else if(quote.length <= 130 )Tweet.sendTweet("#quote : " + quote);
    else if(quote.length <=140) Tweet.sendTweet(quote);
}