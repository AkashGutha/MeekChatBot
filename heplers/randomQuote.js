 var unirest = require('unirest');

 function getRandomQuote() {
     var content;
     unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
         .header("X-Mashape-Key", "lNzJ60W1wfmshdbNCHarQVa2yOzYp1GCICRjsnsIhFM5zUuokz")
         .header("Content-Type", "application/x-www-form-urlencoded")
         .header("Accept", "application/json")
         .end(function (result) {
             if (typeof result.error === 'object')
                 content = "error";
             content = JSON.parse(result.body).quote;

             return content;
         });
 }

 exports.getRandomQuote = getRandomQuote;