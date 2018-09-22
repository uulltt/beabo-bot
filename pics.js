var Twitter = require('twitter');
var imgur = require('imgur');
var ExifImage = require('exif').ExifImage;
var Tumblr = require('tumblrwks');
const Discord = require('discord.js');
const soundcloud = require('soundcloud-dl');
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
		if (content.includes('://') && content.match(/\/post\/[0-9]+/gm)) {
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
					if (json.posts[0].type === 'text' && message.content.toLowerCase().includes("b!pics")) {
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
					
					if (json.posts[0].type === 'video') {
					message.channel.send(json.posts[0].video_url);
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
	
	
	function tumblrsong(message, content){
	var blogId = content.substring(content.indexOf('://')+3, content.indexOf('/post/'));
			var postId = content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0];
			tumblr.get('/posts', {
				hostname: blogId,
				id: postId
			}, function (err, json) {
				if (json.total_posts > 0 && json.posts[0].type === 'audio') {
					//console.log(json.posts[0]);
					//console.log(json.posts[0].caption);
					//console.log(json.posts[0].trail);
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

module.exports = (message, content, herokupg) => {
	if (!content.includes('b!pics') && !content.includes('b!vids') && !content.includes('b!song') && message.channel.hasOwnProperty('guild')){
	herokupg.query("SELECT picsglobal FROM permissions WHERE guild_id = \'" + message.guild.id + "\';", (err, res) => {
	if (res.rows.length > 0 && res.rows[0].picsglobal){
		TwitImgTumb(message, content);
		if (content.includes('://') && content.match(/\/post\/[0-9]+/gm)) {
			tumblrsong(message, content);
		}
	}
	});
	}
	if (content.includes('b!pics')) { //all the camera commands go in here
		TwitImgTumb(message, content);
		if (content.toLowerCase().includes('.jpg') || content.toLowerCase().includes('.jpeg')) {
			request.get(encodeURI(message.embeds[0].image.url), function (err, res, body) {
				var exifString = '';
				try {
					new ExifImage({
						image: body
					}, function (error, exifData) {
						if (error)
							message.channel.send('Error: ' + error.message);
						else {
							var propValue;
							const propholders = [exifData.image, exifData.thumbnail, exifData.exif, exifData.gps, exifData.interoperability];
							for (var i = 0; i < 5; i++) {
								for (var propName in propholders[i]) {
									propValue = propholders[i][propName];
									if (typeof propValue !== "undefined") {
										var field = propName.toString() + ": " + propValue.toString() + "\n";
										if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
											exifString += field;
									}
								}
							}
							message.channel.send({
								embed: {
									title: ':frame_photo: EXIF data:\n',
									description: (exifString.length > 2048 ? exifString.substring(0, 2048) : exifString),
									image: {
										url: encodeURI(content.substring(7).replace(/ /gm, ''))
									}
								}
							});
						}
					});
				} catch (error) {
					message.channel.send('Error: ' + error.message);
				}
			});
		}
		if (content.includes('watch?v=') || content.includes('youtu.be/')) {
			var videocode = content.substring(content.indexOf('v=') + 2).match(/[0-9a-zA-Z_\-]+/gm)[0];
			if (message.embeds[0].url.includes('youtu.be/')) {
				videocode = content.substring(content.indexOf('.be/') + 4).match(/[0-9a-zA-Z_\-]+/gm)[0];
			}
			var attachment = new Discord.Attachment('https://i.ytimg.com/vi/' + videocode + '/maxresdefault.jpg');
			message.channel.send(attachment).catch(err => message.channel.send(new Discord.Attachment('https://img.youtube.com/vi/' + videocode + '/0.jpg')));
		}
		if (message.embeds.length > 0){
		if (message.embeds[0].url.includes("gelbooru.com/")){
		message.channel.send({ embed: {
			image: {
			url: message.embeds[0].thumbnail.url
			}
		}
		});
		}
		if (message.embeds[0].url.includes("e621.net/post/show") || message.embeds[0].url.includes("e926.net/post/show")){
		request.get(message.embeds[0].thumbnail.url.replace(/\/preview/gm, ""), function(err, res, body) {
		if (res.statusCode == 404){
		message.channel.send({ embed: {
			image: {
			url: message.embeds[0].thumbnail.url.replace(/\/preview/gm, "").replace(/\.jpg/gm, ".png")
			}
		}
		});
		} else {
		message.channel.send({ embed: {
			image: {
			url: message.embeds[0].thumbnail.url.replace(/\/preview/gm, "")
			}
		}
		});
		}
		});
		}
		if (message.embeds[0].url.includes("booru.vineshroom.net/post/view")){
		request.get(message.embeds[0].url, function(err, res, body) {
		console.log(body);
		console.log(body.toString());
		});
		}
		}
		if (message.content.toLowerCase().startsWith('b!pics') && message.mentions.users.array().length > 0){
		var len = message.mentions.users.array().length
			for(var i = 0; i < len; i++){
			message.channel.send({embed: { image: { url: message.mentions.users.array()[i].displayAvatarURL}}});
			}
			
		}
	}
	if (content.includes('b!vids')) {
		/*if (content.includes('watch?v=') || content.includes('youtu.be/')){ //backup if youtubemp3api ever goes down
		request.get(encodeURI('https://you-link.herokuapp.com/?url=' + content.substring(6).replace(/ /gm, '')), function (err, res, body) {
		message.channel.send(JSON.parse(body.toString())[0].url);
		});
		}*/
		
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
		if (content.includes('://') && content.match(/\/post\/[0-9]+/gm)) {
			var blogId = content.substring(content.indexOf('://')+3, content.indexOf('/post/'));
			var postId = parseInt(message.embeds[0].url.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
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
	if (content.includes('b!song')) {
		if (content.includes('://') && content.match(/\/post\/[0-9]+/gm)) {
			tumblrsong(message, message.embeds[0].url);
		}
		if (message.embeds[0].url.includes('soundcloud.com/')) {
			soundcloud.getSongDlById(content.substring(message.embeds[0].url.indexOf('soundcloud.com/') + 15).match(/[0-9]+/gm)[0]).then(function (song) {
				message.channel.send(song.http_mp3_128_url);
			});
		}
		if (message.embeds[0].url.includes('twitter.com/') && message.embeds[0].url.includes('/status/')) {
			var tweetId = message.embeds[0].url.substring(message.embeds[0].url.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
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
		
		
	}

	if (content.startsWith('b!thread ')) {
		if (content.includes('twitter.com/') && content.includes('/status/')) {
			var tweetId = content.substring(content.indexOf('/status/') + 8).match(/[0-9]+/gm)[0];
			message.channel.send('https://threadreaderapp.com/thread/' + tweetId + '.html');
		}
	}

}
