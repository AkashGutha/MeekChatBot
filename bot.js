// set up twiiter app with configurations.
var Twitter = require('./twitter');

// import required library
var Follow = require('./lib/follow');

// include helper library for predefined messages.
var helperMessages = require('./heplers/messages');

// set up a user stream
var stream = Twitter.stream('user');

// main program start.

helperMessages.welcomeMsg();

// listen for events on this stream.
stream.on('follow', Follow.gratitudeOnFollow);

// main program end.