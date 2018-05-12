
const Discord = require('discord.js');
const xtra = require('./xtra.js');
var Twitter = require('twitter');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var imgur = require('imgur');
var ExifImage = require('exif').ExifImage;
var Tumblr = require('tumblrwks');
var fs = require('fs');
var concat = require('concat-image');
const rm = require('rotten-movies');
const giantbomb = require('giantbomb');
const gb = giantbomb(process.env.GIANT_BOMB);
const gbSearchGet = [gb.games, gb.characters, gb.concepts, gb.franchises, gb.companies, gb.people, gb.objects];
const gbGet = [gb.games, gb.characters, gb.concepts, gb.franchises, gb.companies, gb.people, gb.objects];
const gbStrings = ['game ', 'character ', 'concept ', 'franchise ', 'company ', 'person ', 'object '];
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
	client.user.setUsername("Beabo");
	client.user.setActivity('type !commands for help', {
		type: 'WATCHING'
	});
});



const steamgames = ['514340', '658150', '522490', '598640'];
const crashfontString = 'abcdefghijklmnopqrstuvwxyz0123456789.:! ';
const metalslugString = ' ?!abcdefghijklmnopqrstuvwxyz0123456789';

client.on('message', message => {

	if (message.isMentioned(client.user)) {
		if (message.content.toLowerCase().match(/w(h?)(a|u)t('?)s (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vidya)?( )?((ga([me]{2}))|vidya)(\?)?/gm)){
			message.channel.send('https://store.steampowered.com/app/' + steamgames[(Math.floor(Math.random() * 4))] + '/');
		} else {
		message.channel.send(xtra.beeb());
		}
	}
	if (message.content.substring(0, 6) === '!exif ') {
		var request = require('request').defaults({
				encoding: null
			});
		request.get(message.content.substring(6), function (err, res, body) {
			var exifString = ':frame_photo: EXIF data:\n';
			try {
				new ExifImage({
					image: body
				}, function (error, exifData) {
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
							message.channel.send(exifString, {
								embed: {
									image: {
										url: message.content.substring(6)
									}
								}
							});
						}
					}
				});

			} catch (error) {
				message.channel.send('Error: ' + error.message);
			}
		});
	}
	if (new RegExp(/!hex#[0-9A-Fa-f]{6}/gm).test(message.content.substring(0, 11))) {
		message.channel.send({
			embed: {
				image: {
					url: 'https://www.colorcombos.com/images/colors/' + message.content.substring(5, 11) + '.png'
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
			for (var i = 0; i < Math.min(response.results.length, 5); i++) {
				var open = '';
				if (response.results[i].hasOwnProperty('opening_hours') && response.results[i].opening_hours.hasOwnProperty('open_now')) {
					if (response.results[i].opening_hours.open_now) {
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
			var dir = ':motorway: **' + ori + '** to **' + dest + '**\n' + xtra.getDirections(result);
			message.channel.send(dir.length <= 2000 ? dir : 'Too many directions. Just Google it.');
		}).catch(console.error);
	}
	if (message.content.substring(0, 6) == '!pics ' || message.content.substring(0, 6) == '!full ' || message.content.substring(0, 7) == '!album ') {
		if (message.content.includes('twitter.com/') && message.content.includes('/status/')) {
			var tweetId = message.content.substring(message.content.indexOf('/status/') + ('/status/').length).match(/[0-9]+/gm)[0];
			tweeter.get('statuses/show/' + tweetId, {
				tweet_mode: 'extended'
			}, function (error, tweet, response) {

				if (!error) {
					//console.log(tweet);
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
					message.channel.send(error);
				}
			})
		}
		if (message.content.includes('imgur.com/') && message.content.includes('/a/')) {
			var theAlbum = message.content.substring(message.content.indexOf('/a/') + ('/a/').length).match(/[0-9a-zA-Z]+/gm)[0];
			imgur.getAlbumInfo(theAlbum)
			.then(function (json) {
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
				message.channel.send(err.message);
			});
		}
		if (message.content.includes('tumblr.com/post/')) {
			var hasBlogId = message.content.substring(0, message.content.indexOf('.tumblr')).match(/[A-Za-z0-9\-]+/gm);
			var blogId = hasBlogId[hasBlogId.length - 1];
			var postId = parseInt(message.content.substring(message.content.indexOf('/post/') + ('/post/').length).match(/[0-9]+/gm)[0]);
			tumblr.get('/posts', {
				hostname: blogId + '.tumblr.com',
				id: postId
			}, function (err, json) {
				if (json.total_posts > 0 && json.posts[0].type === 'photo') {
					for (var i = 1; i < json.posts[0].photos.length; i++) {
						message.channel.send({
							embed: {
								image: {
									url: json.posts[0].photos[i].original_size.url
								}
							}
						});
					}
				}
			});
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

	}
	if (message.content.startsWith('!tomato')){
		console.log('tomato');
		//var title = message.content.substring(9).replace(/ /gm, '_');
		
		console.log(rm);
	}
	if (new RegExp(/[Ff]ont!/gm).test(message.content.substring(0, 5)) && !(new RegExp(/[Ff]ont!(kof97|crash)\W/gm).test(message.content.substring(0, 11))) && !(new RegExp(/[Ff]ont!(ms)\W/gm).test(message.content.substring(0, 8)))) {
		var urls = xtra.font(message.content);
		for (var i = 0; i < Math.min(urls.length, 5); i++) {
			if (urls[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: urls[i]
						}
					}
				});
		}
	}
	if (new RegExp(/[Bb][du][0-9][0-9]!/gm).test(message.content.substring(0, 5)) && !(new RegExp(/[Bb][du][0-9][0-9]!kof97\W/gm).test(message.content.substring(0, 11)))) {
		var urls = xtra.bubble(message.content);
		for (var i = 0; i < Math.min(urls.length, 5); i++) {
			if (urls[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: urls[i]
						}
					}
				});
		}
	}
	
	if (new RegExp(/[Ff]ont!kof97\W/gm).test(message.content.substring(0, 11))) {
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
	if (new RegExp(/[Bb][ud][0-9][0-9]!kof97\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var dir = message.content.charAt(1);
		var pos = message.content.substring(2, 4);
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].charAt(args[i].length - 1) === '\n') {
				args[i] = args[i].substring(0, args[i].length - 1);
			}
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: 'https://nfggames.com/system/arcade/arcade.php/b-' + dir + '/bp-' + pos + 'y-kof97/z-0/dbl-2/x-' + encodeURI(args[i] + '\u200B')
						}
					}
				})
		}
	}
	if (new RegExp(/[Ff]ont!crash\W/gm).test(message.content.substring(0, 11)) && message.content.length > 11){
		var text = message.content.substring(11).toLowerCase().replace(/[^a-z0-9\.!\:\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length;paths[cursor] = fs.readFileSync('./crashfont/crashfont_' + (crashfontString.indexOf(texts[t].charAt(cursor))+1).toString() + '.png'), cursor++);
if (cursor === texts[t].length){
	concat({
  images: paths,
  margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
  // canvas === https://github.com/LearnBoost/node-canvas
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'crash.png');
		//console.log(attachment);
		message.channel.send({
  files: [{
    attachment: canvas.toBuffer(),
    name: 'crash.png'
  }]
});
});
	
}

		
		}
	}
	if (new RegExp(/[Ff]ont!ms\W/gm).test(message.content.substring(0, 8)) && message.content.length > 8){
		var text = message.content.substring(8).toLowerCase().replace(/[^a-z0-9\?!\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length;paths[cursor] = fs.readFileSync('./metalslug/metalslug_' + (metalslugString.indexOf(texts[t].charAt(cursor))+1).toString() + '.png'), cursor++);
if (cursor === texts[t].length){
	concat({
  images: paths,
  margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
  // canvas === https://github.com/LearnBoost/node-canvas
		const attachment = new Discord.Attachment(canvas.toBuffer(), 'metalslug.png');
		//console.log(attachment);
		message.channel.send({
  files: [{
    attachment: canvas.toBuffer(),
    name: 'metalslug.png'
  }]
});
});
	
}

		
		}
	}
	if (message.content.substring(0, 6) === '!time ') {
		xtra.cityTime(message);
	}
	if (message.content.substring(0, 4) === '!gb '){
		//console.log('giant bomb');
		var choice = 0;
	for (var g = 0; g < 7; g++) {
		//console.log(g);
		if (message.content.substring(4, 4 + gbStrings[g].length) === gbStrings[g]) {
			choice = g;
			console.log(gbStrings[g]);
			var typequery = message.content.substring(4 + gbStrings[g].length)
				var query = typequery.substring(0, typequery.indexOf(' '));
			var title = typequery.substring(typequery.indexOf(' ') + 1);
			//console.log(query);
			//console.log(title);
			gbSearchGet[g].search(title, {
				limit: 1
			}, (err, res, json) => {
				if (json.hasOwnProperty('results') && json.results.hasOwnProperty('length') && json.results.length > 0) {
					var gamelist = ''
						for (var i = 0; i < json.results.length; i++) {
							gamelist += (i + 1).toString() + '. ' + json.results[i].name + '\n';
						}
						message.channel.send('Which did you mean? Please Reply with a number.\n' + gamelist);
					const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
							time: 10000
						});
					collector.on('collect', message2 => {
						if (message2.user === message.user && message2.channel === message.channel && parseInt(message2.content)) {
							var id = json.results[parseInt(message2.content) - 1].id;
							if (query === '*' || query === 'all'){
								query = 'info,characters,friends,enemies,concepts,franchises,games,developed,published,locations,objects,people,similar';
							}
							//console.log(g);
							switch(choice){
								case 0:
							gb.games.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 0);	
							});
							break;
							case 1:
							gb.characters.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 1);	
							});
							break;
							case 2:
							gb.concepts.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 2);	
							});
							break;
							case 3:
							gb.franchises.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 3);	
							});
							break;
							case 4:
							gb.companies.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 4);	
							});
							break;
							case 5:
							gb.people.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 5);	
							});
							break;
							case 6:
							gb.objects.get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 6);	
							});
							break;
							}
						}

					});
				}
			});

		} 
	}
	}
	if (message.content.substring(0, 8) === '!ZiV-id ') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + message.content.substring(8) + '#summary');
	}
	if (message.content.substring(0, 11) === '!ZiV-random') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000) + 2).toString() + '#summary');
	}
	if (message.content.substring(0, 9) === '!commands') {
		message.channel.send('**Font Commands**\nTo find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
			'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n' +
			'\n**Google Maps Commands**\n!dir \"origin\" \"destination\" - prints directions from origin to destination\n!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\n!time cityname - gets local time of that city\n' +
			'\n**Giant Bomb Wiki Commands**\n!gb game info/characters/concepts/franchises/locations/objects/people/similar gamename - returns the info/characters/etc. of that game from the Giant Bomb wiki\n' +
			'!gb company info/characters/concepts/locations/objects/people/developed/published companyname - returns the info/characterc/concepts/etc. from a given company\n!gb concept/person/franchise info/characters/concepts/locations/objects/people/games/franchises(concept/person only) name - returns that info but for a concept, person, or franchise\n' +
			'!gb character info/concepts/locations/objects/people/franchises/games/friends/enemies charactername - returns the given parameter for a video game character\n' +
			'\n**Other Commands**\n!full or !pics or !album followed by twitter/imgur/tumblr link - displays full photo album of tweet or imgur/tumblr post\n' +
			'!hex#hexCode - displays image of a color pertaining to the hex cde\n!exif followed by link to jpg image - prints out exif data of image\n' +
			'!list or !todo - splits discord message into a to-do list\n!ZiV-id (number) - gets arcade on Zenius-i-Vanisher with that number\n!ZiV-random - gets a random arcade on Zenius-i-Vanisher');
	}

});

client.login(process.env.BOT_TOKEN);
