var twit = require('twit');
var config = require('./config.json');

var Twitter = new twit(config);

module.exports = Twitter;