 var unirest = require('unirest');

 function getRandomQuote(cb) {
     var content;
     unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
         .header("X-Mashape-Key", "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
         .header("Content-Type", "application/x-www-form-urlencoded")
         .header("Accept", "application/json")
         .end(cb);
 }

 exports.getRandomQuote = getRandomQuote;