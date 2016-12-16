var twit = require('twit');
var config = require('./config.json');

var Twitter = new twit(config);

// set up a user stream
var stream = Twitter.stream('user');
// listen for events on this stream.
stream.on("follow", onFollow);



// main program start.

welcomeMsg();

// main program end.


// callback functions

function onFollow(event) {
	//get user's twitter handler (screen name)
	var name = event.source.name;
	var screenName = event.source.screen_name;
	// function that replies back to the user who followed
	tweetNow('@' + screenName + ` Thanks for following Meek Chat. Happy to see you around.
	We will keep you posted about future updates.`);
}


// helper functions

function welcomeMsg() {
	console.log('===========================================');
	console.log('Meek chat bot started succesfully');
	console.log('===========================================');
	console.log('');
	console.log('Listening for events ...');
	console.log('');
}

function tweetNow(tweetTxt) {
	var tweet = {
		status: tweetTxt
	}
	Twitter.post('statuses/update', tweet, function (err, data, response) {
		if (err) {
			console.log(err.message);
		}
	});
}