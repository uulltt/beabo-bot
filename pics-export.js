var Twitter = require('twitter');
var imgur = require('imgur');
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
var request = require('request').defaults({
		encoding: null
	});
	
	function TwitImgTumb(message, content) {
		if (content.includes('twitter.com/') && content.includes('/status/')) {
			var tweetId = content.substring(content.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
			tweeter.get('statuses/show/' + tweetId, {
				tweet_mode: 'extended'
			}, function (error, tweet, response) {
				if (!error) {
					if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media')) {
						for (var i = 1; i < tweet.extended_entities.media.length; message.channel.send({
								embed: {
									image: {
										url: tweet.extended_entities.media[i++].media_url
									}
								}
							}));
					}
				} else {
					message.channel.send(error);
				}
			});
		}
		if (content.includes('imgur.com/') && content.includes('/a/')) {
			var theAlbum = content.substring(content.indexOf('/a/') + 3).match(/[0-9a-zA-Z]+/gm)[0];
			var limit = 10;
			if (content.charAt(6) >= '0' && content.charAt(6) <= '9') {
				limit = Math.min(50, parseInt(content.substring(6, content.substring(6).indexOf(' ') + 6)));
			}
			imgur.getAlbumInfo(theAlbum)
			.then(function (json) {
				for (var i = 0; i < Math.min(json.data.images.length, limit); message.channel.send({
						embed: {
							image: {
								url: json.data.images[i++].link
							}
						}
					}));
			}).catch(function (err) {
				message.channel.send(err.message);
			});
		}
		if (content.includes('imgur.com/') && content.includes('/gallery/')) {
			var theAlbum = content.substring(content.indexOf('/gallery/') + 9).match(/[0-9a-zA-Z]+/gm)[0];
			var limit = 10;
			if (content.charAt(6) >= '0' && content.charAt(6) <= '9') {
				limit = Math.min(50, parseInt(content.substring(6, content.substring(6).indexOf(' ') + 6)));
			}
			imgur.getAlbumInfo(theAlbum)
			.then(function (json) {
				for (var i = 0; i < Math.min(json.data.images.length, limit); message.channel.send({
						embed: {
							image: {
								url: json.data.images[i++].link
							}
						}
					}));
			}).catch(function (err) {
				message.channel.send(err.message);
			});
		}
		if (content.includes('://') && content.includes('/post/')) {
			var blogId = content.substring(content.indexOf('://')+3, content.indexOf('/post/'));
			var postId = parseInt(content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
			tumblr.get('/posts', {
				hostname: blogId,
				id: postId
			}, function (err, json) {
				if (json.total_posts > 0) {	
					if (json.posts[0].type === 'photo') {
						for (var i = 1; i < json.posts[0].photos.length; message.channel.send({
								embed: {
									image: {
										url: json.posts[0].photos[i++].original_size.url
									}
								}
							}));
					}
					if (json.posts[0].type === 'text') {
						var images = json.posts[0].body.split(' src=\"').filter(function(item){
							return item.startsWith('http');
						}).map(function(item){
							return item.substring(0, item.indexOf('\"'));
						});
						for (var i = 0; i < Math.min(images.length, 10); i++) {
								message.channel.send({
									embed: {
										image: {
											url: images[i]
										}
									}
								});
						}
					}

					for (var j = 1; j < Math.min(json.posts[0].trail.length, 5); j++) {
						var img = json.posts[0].trail[j].content_raw.split(' src=\"').filter(function(item){
							return item.startsWith('http');
						}).map(function(item){
							return item.substring(0, item.indexOf('\"'));
						});
						for (var i = 0; i < Math.min(img.length, 10); i++) {
								message.channel.send({
									embed: {
										image: {
											url: img[i]
										}
									}
								});
						}
					}
				}
			});
		}
	}

module.exports = (message, content) => {
	if (content.startsWith('!pics ')) { //all the camera commands go in here
		TwitImgTumb(message, content);
		
		if (content.includes('watch?v=') || content.includes('youtu.be/')) {
			var videocode = content.substring(content.indexOf('v=') + 2).match(/[0-9a-zA-Z_\-]+/gm)[0];
			if (content.includes('youtu.be/')) {
				videocode = content.substring(content.indexOf('.be/') + 4).match(/[0-9a-zA-Z_\-]+/gm)[0];
			}
			var attachment = new Discord.Attachment('https://i.ytimg.com/vi/' + videocode + '/maxresdefault.jpg');
			message.channel.send(attachment).catch(err => message.channel.send(new Discord.Attachment('https://img.youtube.com/vi/' + videocode + '/0.jpg')));
		}
	}
	if (content.startsWith('!vids ')) {
		
		if (content.includes('watch?v=') || content.includes('youtu.be/')) {
			var videocode = content.substring(content.indexOf('v=') + 2).match(/[0-9a-zA-Z_\-]+/gm)[0];
			if (content.includes('youtu.be/')){
				videocode = content.substring(content.indexOf('.be/') + 4).match(/[0-9a-zA-Z_\-]+/gm)[0];
			}
			message.channel.send('https://youtubemp3api.com/@api/button/videos/' + videocode);
		}
		if (content.includes('twitter.com/') && content.includes('/status/')) {
			var tweetId = content.substring(content.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
			tweeter.get('statuses/show/' + tweetId, {
				tweet_mode: 'extended'
			}, function (error, tweet, response) {
				if (!error) {
					//console.log(tweet.entities);
					if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media') && tweet.extended_entities.media[0].hasOwnProperty('video_info')) {
						var qualities = tweet.extended_entities.media[0].video_info.variants.length;
						message.channel.send(tweet.extended_entities.media[0].video_info.variants[qualities - 1].url);
					} else {
						if (tweet.hasOwnProperty('entities') && tweet.entities.hasOwnProperty('urls') && tweet.entities.urls.length > 0)
						message.channel.send(tweet.entities.urls[0].expanded_url);
					}
				} else {
					message.channel.send(error);
				}
			});
		}
		if (content.includes('://') && content.includes('/post/')) {
			var blogId = content.substring(content.indexOf('://')+3, content.indexOf('/post/'));
			var postId = parseInt(content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
			tumblr.get('/posts', {
				hostname: blogId,
				id: postId
			}, function (err, json) {
				if (json.total_posts > 0 && json.posts[0].type === 'video') {
					message.channel.send(json.posts[0].video_url);
				}
			});
		}
	}
	if (content.startsWith('!song ')) {
		if (content.includes('://') && content.includes('/post/')) {
			var blogId = content.substring(content.indexOf('://')+3, content.indexOf('/post/'));
			var postId = parseInt(content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
			tumblr.get('/posts', {
				hostname: blogId,
				id: postId
			}, function (err, json) {
				if (json.total_posts > 0 && json.posts[0].type === 'audio') {
					
					var images = json.posts[0].caption.split(' src=\"').filter(function(item){
							return item.startsWith('http');
						}).map(function(item){
							return item.substring(0, item.indexOf('\"'));
						});
					for (var i = 0; i < Math.min(images.length, 10); i++) {
							message.channel.send({
								embed: {
									image: {
										url: images[i]
									}
								}
							});
					}
					for (var j = 1; j < Math.min(json.posts[0].trail.length, 5); j++) {
						var img = json.posts[0].trail[j].content_raw.split(' src=\"').filter(function(item){
							return item.startsWith('http');
						}).map(function(item){
							return item.substring(0, item.indexOf('\"'));
						});
						for (var i = 0; i < Math.min(img.length, 10); i++) {
								message.channel.send({
									embed: {
										image: {
											url: img[i]
										}
									}
								});
						}
					}
					var r = request.get(json.posts[0].audio_source_url, function (err, res, body) {
							request.get(r.uri.href, function (err2, res2, body2) {
								console.log(json.posts[0]);
								message.channel.send({
									files: [{
											attachment: body2,
											name: json.posts[0].track_name + '.mp3'
										}
									]
								}).then().catch(message.channel.send(r.uri.href));
							});

						});

				}
			});
		}
		if (content.includes('watch?v=') || content.includes('youtu.be/')) {
			var videocode = content.substring(content.indexOf('v=') + 2).match(/[0-9a-zA-Z_\-]+/gm)[0];
			if (content.includes('youtu.be/')){
				videocode = content.substring(content.indexOf('.be/') + 4).match(/[0-9a-zA-Z_\-]+/gm)[0];
			}
			message.channel.send('https://youtubemp3api.com/@api/button/mp3/' + videocode);
		}
		if (content.includes('twitter.com/') && content.includes('/status/')) {
			var tweetId = content.substring(content.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
			tweeter.get('statuses/show/' + tweetId, {
				tweet_mode: 'extended'
			}, function (error, tweet, response) {
				if (!error) {
						if (tweet.hasOwnProperty('entities') && tweet.entities.hasOwnProperty('urls') && tweet.entities.urls.length > 0)
						message.channel.send(tweet.entities.urls[0].expanded_url);
				} else {
					message.channel.send(error);
				}
			});
		}
		
		if (content.includes('vocaroo.com/i/')){
			var vocId = content.substring(content.indexOf('/i/')+3).match(/[A-Za-z0-9]+/gm)[0];
			request.get('https://vocaroo.com/media_command.php?media='+vocId+'&command=download_mp3', function (err, res, body) {
								message.channel.send({
									files: [{
											attachment: body,
											name: vocId + '.mp3'
										}
									]
								}).then().catch(console.error);
							});
		}
	}

	if (content.startsWith('!thread ')) {
		if (content.includes('twitter.com/') && content.includes('/status/')) {
			var tweetId = content.substring(content.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
			message.channel.send('https://threadreaderapp.com/thread/' + tweetId + '.html');
		}
	}

}
