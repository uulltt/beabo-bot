

module.exports.gameText = (game, style, size, text) => {
	if (text.charAt(text.length - 1) === '\n'){
				text = text.substring(0, text.length - 1);
			}
return 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-' + style + '/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}

module.exports.bubble = (game, dir, pos, style, size, text) => {
	if (text.charAt(text.length - 1) === '\n'){
				text = text.substring(0, text.length - 1);
			}
return 'https://nfggames.com/system/arcade/arcade.php/b-' + dir + '/bp-' + pos + '/y-' + game + '/z-'+ style +'/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}

module.exports.pad = (n) => { 
if ( n < 10) 
	return "0" + n.toString();
else
	return n.toString();
}

var lines = [" beabo", " bee", " bii", " be", " beeb"];

module.exports.beeb = () => {
	var len = Math.floor(Math.random() * 6) + 1;
		var sentence = "";
		for(var i = 0; i < len; i++){
			sentence += lines[Math.floor(Math.random() * lines.length)];
			var ex = Math.floor(Math.random() * 3);
			if (ex === 0){
				sentence += "!";
			}
		}
		return sentence + "!";
	
}

const Discord = require('discord.js');
var Twitter = require('twitter');
var tweeter = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});
module.exports.twitterAlbum = (tweetId) => {
	var tweets = [];
	tweeter.get('statuses/show/' + tweetId, {
			tweet_mode: 'extended'
		}, function (error, tweet, response) {

			if (!error) {
				//console.log(tweet);
				if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media')) {
					for (var i = 1; i < tweet.extended_entities.media.length; i++) {
						tweets[i-1] = tweet.extended_entities.media[i].media_url;
							}
				}
			} else {
				console.log(error);
			}
		})
		console.log(tweets);
		return tweets;
	
}