var twit = require('twit');
var config = require('./config.json');

var Twitter = new twit(config);

// set up a user stream
var stream = Twitter.stream('user');

stream.on("follow", onFollow);

console.log('===========================================');
console.log('Meek chat bot started succesfully');
console.log('===========================================');
console.log('');
console.log('Listening for events ...');
console.log('');

// call backs
function onFollow(event) {
    //get user's twitter handler (screen name)
    var name = event.source.name;
    var screenName = event.source.screen_name;
    console.log('you have been followed by @' + screenName);
    // function that replies back to the user who followed
    tweetNow('@' + screenName + ' Welcome to Meek Chat. Happy to see you around.');
}

function tweetNow(tweetTxt) {
    var tweet = {
        status: tweetTxt
    }
    Twitter.post('statuses/update', tweet, function (err, data, response) {
        if (err) {
            console.log("Error in Replying");
        } else {
            console.log("Gratitude shown successfully");
        }
    });
}