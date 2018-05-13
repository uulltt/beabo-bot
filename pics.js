var Twitter = require('twitter');
var imgur = require('imgur');
var ExifImage = require('exif').ExifImage;
var Tumblr = require('tumblrwks');
const Discord = require('discord.js');
var tumblr = new Tumblr({
consumerKey: process.env.TUMBLR_CONSUMER_KEY,
});
var tweeter = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = (message, content) => {
	if (content.startsWith('📷 ') || content.startsWith('!pics ')) { //all the camera commands go in here
	if (content.includes('twitter.com/') && content.includes('/status/')) {
		var tweetId = content.substring(content.indexOf('/status/') + ('/status/').length).match(/[0-9]+/gm)[0];
		tweeter.get('statuses/show/' + tweetId, { tweet_mode: 'extended' }, function (error, tweet, response) {
			if (!error) {
				if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media')) {
					for (var i = 1; i < tweet.extended_entities.media.length; message.channel.send({ embed: { image: { url: tweet.extended_entities.media[i++].media_url } } }));
				}
			} else {
				message.channel.send(error);
			}
		});
	}
	if (content.includes('imgur.com/') && content.includes('/a/')) {
		var theAlbum = content.substring(content.indexOf('/a/') + ('/a/').length).match(/[0-9a-zA-Z]+/gm)[0];
		imgur.getAlbumInfo(theAlbum)
		.then(function (json) {
			for (var i = 0; i < Math.min(json.data.images.length, 10); message.channel.send({ embed: { image: { url: json.data.images[i++].link } } }));
		}).catch(function (err) { message.channel.send(err.message); });
	}
	if (content.includes('tumblr.com/post/')) {
		var hasBlogId = content.substring(0, content.indexOf('.tumblr')).match(/[A-Za-z0-9\-]+/gm);
		var blogId = hasBlogId[hasBlogId.length - 1];
		var postId = parseInt(content.substring(content.indexOf('/post/') + ('/post/').length).match(/[0-9]+/gm)[0]);
		tumblr.get('/posts', { hostname: blogId + '.tumblr.com', id: postId }, function (err, json) {
			if (json.total_posts > 0 && json.posts[0].type === 'photo') {
				for (var i = 1; i < json.posts[0].photos.length; message.channel.send({ embed: { image: { url: json.posts[0].photos[i++].original_size.url } } }));
			}
		});
	}
	if (content.toLowerCase().includes('.jpg') || content.toLowerCase().includes('.jpeg')) {
		var request = require('request').defaults({
encoding: null
		});
		request.get(encodeURI(content.substring(content.startsWith('!pics ') ? 6 : 3).replace(/ /gm, '')), function (err, res, body) {
			var exifString = ':frame_photo: EXIF data:\n';
			try {
				new ExifImage({ image: body }, function (error, exifData) {
					if (error)
					message.channel.send('Error: ' + error.message);
					else {
						var propValue;
						for (var propName in exifData.image) {
							propValue = exifData.image[propName];
							if (typeof propValue !== "undefined") {
								var field = propName.toString() + ": " + propValue.toString() + "\n";
								if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
								exifString += field;
							}
						}
						for (var propName in exifData.thumbnail) {
							propValue = exifData.image[propName];
							if (typeof propValue !== "undefined") {
								var field = propName.toString() + ": " + propValue.toString() + "\n";
								if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
								exifString += field;
							}
						}
						for (var propName in exifData.exif) {
							propValue = exifData.exif[propName];
							if (typeof propValue !== "undefined") {
								var field = propName.toString() + ": " + propValue.toString() + "\n";
								if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
								exifString += field;
							}
						}
						for (var propName in exifData.gps) {
							propValue = exifData.gps[propName];
							if (typeof propValue !== "undefined") {
								var field = propName.toString() + ": " + propValue.toString() + "\n";

								if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
								exifString += field;
							}
						}
						for (var propName in exifData.interoperability) {
							propValue = exifData.interoperability[propName];
							if (typeof propValue !== "undefined") {
								var field = propName.toString() + ": " + propValue.toString() + "\n";

								if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
								exifString += field;
							}
						}
						if (exifString.length > 2000) {
							message.channel.send(exifString.substring(0, 2000));
						} else {
							message.channel.send(exifString, { embed: { image: { url: encodeURI(content.substring(content.startsWith('!pics ') ? 6 : 3).replace(/ /gm, ''))}}});
						}
					}
				});
			} catch (error) {
				message.channel.send('Error: ' + error.message);
			}
		});
	}
	if (content.includes('watch?v=')){
		var videocode = content.substring(content.indexOf('v=')+2).match(/[0-9a-zA-Z_\-]+/gm)[0];
		const attachment = new Discord.Attachment('https://i.ytimg.com/vi/'+videocode+'/maxresdefault.jpg');
		message.channel.send(attachment);
	}
	if (content.includes('youtu.be/')){
		var videocode = content.substring(content.indexOf('.be/')+4).match(/[0-9a-zA-Z_\-]+/gm)[0];
		const attachment = new Discord.Attachment('https://i.ytimg.com/vi/'+videocode+'/maxresdefault.jpg');
		message.channel.send(attachment);
	}
}
}