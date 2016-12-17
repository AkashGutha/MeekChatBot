var Twitter = require('../twitter');
var tweet = require('./tweet');
var messages = require('../messages.json');
var rng = require('random-number-generator');

// REST functions

// follow the specified user
function follow(screenName, id) {
    var query = {
        screen_name: screenName,
        user_id: id
    }
    Twitter.post('friendships/create', query, function (err, data, response) {
        if (err) {
            console.log(err.message);
        }
    });
}

// Streaming API helper functions

// event that shows gratitude on follow
function gratitudeOnFollow(event) {
    //get user's twitter handler (screen name)
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var user_id = event.source.user_id;
    // function that replies back to the user who followed
    tweet.sendTweet('@' + screenName + ' ' + messages.followGratitude[rng(messages.followGratitude.length)]);
    follow(screenName, user_id);
}

exports.follow = follow;
exports.gratitudeOnFollow = gratitudeOnFollow;