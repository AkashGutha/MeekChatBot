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
    return Twitter.post('friendships/create', query);
}

// Streaming API helper functions

// event that shows gratitude on follow
function gratitudeOnFollow(event) {
    //get user's twitter handler (screen name)
    var name = event.source.name;
    var screen_name = event.source.screen_name;
    var user_id = event.source.user_id;

    console.log('you have been followed by @' + screen_name);
    // function that replies back to the user who followed
    tweet.sendTweet('@' + screen_name + ' ' + messages.followGratitude[rng(messages.followGratitude.length - 1)]);
    // follow back
    follow(screen_name, user_id);
}

exports.follow = follow;
exports.gratitudeOnFollow = gratitudeOnFollow;