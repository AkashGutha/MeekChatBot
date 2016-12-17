var rng = require('random-number-generator');
var messages = require('../messages.json');

// REST functions

// follow the specified user
exports.follow = function follow(screenName, id) {
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
exports.gratitudeOnFollow = function gratitudeOnFollow(event) {
    //get user's twitter handler (screen name)
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var user_id = event.source.user_id;
    // function that replies back to the user who followed
    tweetNow('@' + screenName + messages.followGratitude[rng(messages.followGratitude.length)]);
    follow(screenName, user_id);
}