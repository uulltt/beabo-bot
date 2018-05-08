
const Discord = require('discord.js');
const nfgUrl = require('./nfgUrl.js');
var Twitter = require('twitter');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var imgur = require('imgur');

var Tumblr = require('tumblrwks');
var tumblr = new Tumblr({
  consumerKey: process.env.TUMBLR_CONSUMER_KEY,
});

var tweeter = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setUsername("NagaevskyTron");
	client.user.setPresence({ game: { name: 'type !commands for help' }, status: 'online' })
});

client.on('message', message => {
	if (new RegExp(/hex#[0-9A-Fa-f]{6}/gm).test(message.content.substring(0, 10))) {
		message.channel.send({
			embed: {
				image: {
					url: 'https://www.colorcombos.com/images/colors/' + message.content.substring(4, 10) + '.png'
				}
			}
		});
	}
	if (message.content.substring(0, 8) === '!places ') {
		parameters = {
			query: message.content.substring(8).split('\"')[1]
		};
		GPlaces.textSearch(parameters, function (error, response) {
			if (error)
				throw error;
			for(var i = 0; i < Math.min(response.results.length, 5); i++){
				var open = '';
				if (response.results[i].hasOwnProperty('opening_hours') && response.results[i].opening_hours.hasOwnProperty('open_now')){
				if (response.results[i].opening_hours.open_now){
					open = ':large_blue_circle: ***OPEN NOW!***';
				} else {
					open = ':red_circle: Sorry, closed.';
				}
				}
				message.channel.send('**' + response.results[i].name + '**\n`' + response.results[i].formatted_address + '`\n:star: ' + response.results[i].rating + '\n' + open);
			}
		});

	}
	if (message.content.substring(0, 5) === '!dir ') {
		var args = message.content.substring(5).split('\"');
		var ori = args[1];
		var dest = args[3];
		direction({
			origin: ori,
			destination: dest
		})
		.then(function (result) {
			var dir = ':motorway: **' + ori + '** to **' + dest + '**\n';
			for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
				dir = dir + (i + 1).toString() + '. ' + result.routes[0].legs[0].steps[i].html_instructions.replace(/<\/?b>/gm, '**').replace(/<div style="font-size:0.9em">/gm, ' `(').replace(/<\/div>/gm, ')`') + ' (' + result.routes[0].legs[0].steps[i].distance.text + ', ' + result.routes[0].legs[0].steps[i].duration.text + ')\n';
			}
			dir = dir + 'And you\'re there! :smiley:';
			if (dir.length <= 2000)
				message.channel.send(dir);
			else
				message.channel.send('Too many directions. Just Google it.');
		}).catch(console.error);
	}
	if (message.content.substring(0, 6) == '!pics ' || message.content.substring(0, 6) == '!full ' || message.content.substring(0, 7) == '!album '){
	if(message.content.includes('twitter.com/') && message.content.includes('/status/')) {
		var tweetId = message.content.substring(message.content.indexOf('/status/') + ('/status/').length).match(/[0-9]+/gm)[0];
		tweeter.get('statuses/show/' + tweetId, {
			tweet_mode: 'extended'
		}, function (error, tweet, response) {

			if (!error) {
				console.log(tweet);
				if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media')) {
					for (var i = 1; i < tweet.extended_entities.media.length; i++) {
						message.channel.send({
							embed: {
								image: {
									url: tweet.extended_entities.media[i].media_url
								}
							}
						});
					}
				}
			} else {
				console.log(error);
			}
		})
	}
	if (message.content.includes('imgur.com/') && message.content.includes('/a/')) {
		var theAlbum = message.content.substring(message.content.indexOf('/a/') + ('/a/').length).match(/[0-9a-zA-Z]+/gm)[0];
		imgur.getAlbumInfo(theAlbum)
    .then(function(json) {
		for (var i = 0; i < Math.min(json.data.images.length, 10); i++) {
						message.channel.send({
							embed: {
								image: {
									url: json.data.images[i].link
								}
							}
						});
					}
    })
    .catch(function (err) {
        console.error(err.message);
    });
		
					
			
	}
	if (message.content.includes('tumblr.com/post/')) {
		var hasBlogId = message.content.substring(0, message.content.indexOf('.tumblr')).match(/[A-Za-z0-9\-]+/gm);
		var blogId = hasBlogId[hasBlogId.length - 1];
		var postId = parseInt(message.content.substring(message.content.indexOf('/post/') + ('/post/').length).match(/[0-9]+/gm)[0]);
		console.log("am i doing this right?");
		tumblr.get('/posts', {hostname: blogId + '.tumblr.com', id : postId }, function(err, json){
			if (json.total_posts > 0){
  if (json.posts[0].type === 'photo'){
	  console.log(json.posts[0].photos);
	  for(var i = 1; i < json.posts[0].photos.length; i++){
		  message.channel.send({embed: {
			  image: {
				  url: json.posts[0].photos[i].original_size.url
			  }
		  }
		  });
	  }
  }
			}
});

		/*tumblrClient.blogPosts(blogId, {id : postId}, function(err, resp) {
			if (!err){
			resp.posts;
			} else {
				console.log(err);
			}
		}
		);*/
		/*imgur.getAlbumInfo(theAlbum)
    .then(function(json) {
		for (var i = 0; i < json.data.images.length; i++) {
						message.channel.send({
							embed: {
								image: {
									url: json.data.images[i].link
								}
							}
						});
					}
    })
    .catch(function (err) {
        console.error(err.message);
    });				
	*/		
	}
	}
	if (message.content.substring(0, 5) === '!list' || message.content.substring(0, 5) === '!todo') {
		var args = message.content.substring(5).split('\n'); //we split by line breaks
		if (args.length == 1) { //if there's no line breaks
			args = message.content.substring(5).split(','); //we split by commas
		}
		for (var i = 0; i < args.length; i++) { //go through each of the arguments
			if (args[i].length > 0 && (args[i].length < 3 || args[i].substring(0, 3) != '```')) //if the first character isn't an accent mark and the length of the argument is greater than 0
				message.channel.send('•' + args[i]); //send the list element
		}
	} else if (message.content.substring(0, 8) === '!ZiV-id ') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + message.content.substring(8) + '#summary');

	} else if (new RegExp(/font![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8)) || new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(8) + '\u200B';
		var game = message.content.substring(5, 7);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
			arg = arg.substring(2);
			style = message.content.charAt(7);
			size = message.content.charAt(8);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		var style = '0';
		var size = '2';
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt(8);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		if (game === 'ddr')
			game = 'DDR';
		if (game !== 'kof') {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 5); i++) {

				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.gameText(game, style, size, args[i])
							}
						}

					})
			}
		}
	} else if (new RegExp(/font![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10)) || new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
			arg = arg.substring(2);
			style = message.content.charAt(9);
			size = message.content.charAt(10);
		}
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 5); i++) {

					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.gameText(game, style, size, args[i])
								}
							}
						})
				}
	} else if (new RegExp(/font![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11)) || new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
			arg = arg.substring(2);
			style = message.content.charAt(10);
			size = message.content.charAt(11);
		}
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12)) || new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
			arg = arg.substring(2);
			style = message.content.charAt(11);
			size = message.content.charAt(12);
		}
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13)) || new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
			arg = arg.substring(2);
			style = message.content.charAt(2);
			size = message.content.charAt(13);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8)) || new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(8) + '\u200B';
		var game = message.content.substring(5, 7);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
			arg = arg.substring(2);
			style = message.content.charAt(7);
			size = message.content.charAt(8);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt(8);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'ddr')
			game = 'DDR';
		if (game === 'kof') {}
		else {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 5); i++) {
				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
							}
						}
					}).then(console.log).catch(console.error);
			}
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10)) || new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
			arg = arg.substring(2);
			style = message.content.charAt(9);
			size = message.content.charAt(10);
		}
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 5); i++) {
					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
								}
							}
						}).then(console.log).catch(console.error);
				}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
			arg = arg.substring(2);
			style = message.content.charAt(10);
			size = message.content.charAt(11);
		}
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
			arg = arg.substring(2);
			style = message.content.charAt(11);
			size = message.content.charAt(12);
		}
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
			arg = arg.substring(2);
			style = message.content.charAt(12);
			size = message.content.charAt(13);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	}

	if (new RegExp(/font!kof97\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].charAt(args[i].length - 1) === '\n') {
				args[i] = args[i].substring(0, args[i].length - 1);
			}
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: 'https://nfggames.com/system/arcade/arcade.php/y-kof97/z-0/dbl-2/x-' + encodeURI(args[i] + '\u200B')
						}
					}
				})
		}
	}

	if (message.content.substring(0, 9) === '!commands') {
		message.channel.send('font commands\nTo find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.\n' +
			'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n' +
			/*'font!arcade - classic arcade\nfont!bios - BioShipPaladin\nfont!chiki - chiki chiki boys\nfont!ddcrew - DDCrew\nfont!DDR - Dance Dance Revolution\nfont!ddux - dynamite dux\nfont!fz - fantasy zone\nfont!gain - gain ground\nfont!garou - fatal fury\n' +
			'font!gradius - shoot the core\nfont!guar - guardians\nfont!kais - kaiser knuckle\nfont!kiki - kiki kaikai\nfont!kof97 - king of fighters 97\nfont!kof2k - king of fighters 2000\nfont!kof2k1 - king of fighters 2001\n' +
			'font!kof2k2 - king of fighters 2002\nfont!kof2k3 - king of fighters 2003\nfont!mt - major title\nfont!moma = monster maulers\nfont!namco2 - namco classic gradient\nfont!njgd - ninja gaiden\nfont!pabom - panic bomber\nfont!paro - parodius da\n' +
			'font!pubu - puzzle bobble\nfont!quake - quack\nfont!raph - rapid hero\nfont!robot - robotron\nfont!rtl - rtype leo\nfont!sexy - parodius\nfont!sf2 - street fighter 2\nfont!ssf2 - super street fighter 2\nfont!sfz3 or !sfa3 - street fighter zero\alpha 3\nfont!simp - the simpsons\n' +
			'font!sold - soldam\nfont!tetris - tetris (sega)\nfont!vict - victory road\n*/
			'\nother commands\n!list or !todo - splits discord message into a to-do list\n!full or !pics or !album followed by twitter or imgur link - displays full photo album of tweet\n!dir \"origin\" \"destination\" - prints directions from origin to destination\n!places \"search query\" - finds places of a type near a location (e.g. \"arcades in kendall\")\nhex#hexCode - displays image of a color pertaining to the hex cde\n!ZiV-id (number) - gets arcade on Zenius-i-Vanisher with that number');
	}

});

client.login(process.env.BOT_TOKEN);
