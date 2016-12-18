var twit = require('twit-promise');
var http = require('http');

if (process.argv[2] == '--local') {
    var config = require('./config.json');
} else {
    var config = {
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret,
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
    }

    var server = http.createServer();
    server.listen(process.env.PORT);

}

var Twitter = new twit(config);

module.exports = Twitter;