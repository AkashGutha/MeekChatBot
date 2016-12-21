var Twitter = require('../twitter');
var messages = require('../messages.json');

// REST functions

// send a tweet
function sendTweet(tweetTxt) {
    var tweet = {
        status: tweetTxt
    }
    return Twitter.post('statuses/update', tweet);
}

// Streaming API helper functions

exports.sendTweet = sendTweet;