
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
var pics = require('./pics.js');
var concat = require('concat-image');
const rm = require('rotten-movies');
const giantbomb = require('giantbomb');
const metacritic = require('metacritic-scraper');
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
//a
client.on('ready', () => {
	console.log('I am ready!');
	client.user.setUsername("Beabo");
	client.user.setActivity('type b!commands for help', { type: 'WATCHING'});
});

function parallel (message, content){
	if ((content.startsWith('🍅 ') || content.startsWith('!rt ')) && content.length > 3){
	var com = content.startsWith('🍅 ') ? 3 : 4;
	if (!content.includes('coming soon') && !content.includes('box office') && !content.includes('opening')){
		var movieurl = 'https://www.rottentomatoes.com/m/' + encodeURI(content.substring(com).toLowerCase().replace(/ /gm, '_').replace(/[^a-z0-9_]/gm, ''));
		rm.info(movieurl, function(err, info) {
			rm.scores(movieurl, function(err2, scores) {
				message.channel.send({
embed: {
title: info.name,
description: info.description,
url: movieurl,
footer: {
text: 'From RottenTomatoes'
						},
color: 0xa81717,
fields: [{
name: "🍅 Critic Score",
value: scores.critic + '%',
inline: true
						}, {
name: "🍿 Audience Score",
value: scores.audience + '%',
inline: true
						}
						]
					}
				});
			});
		});
	} else {
		var rtscraper = require('rt-scraper');
		rtscraper.getRottenTomatoesScraperData( function(error, data) {
			if (!error) {
				console.log(data);
				if (content.includes('coming soon')){
					const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Coming Soon').setColor(0xa81717);
					for(var i = 0; i < data.comingSoon.length; i++){
						RTembed.addField(data.comingSoon[i].title, data.comingSoon[i].date + '; ' + data.comingSoon[i].meter);
					}
					console.log(RTembed);
					message.channel.send({embed: RTembed});
				}
				if (content.includes('opening')){
					const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Opening This Week').setColor(0xa81717);
					for(var i = 0; i < data.openingThisWeek.length; i++){
						RTembed.addField(data.openingThisWeek[i].title, data.openingThisWeek[i].date + '; ' + data.openingThisWeek[i].meter);
					}
					message.channel.send({embed: RTembed});
				}
				if (content.includes('box office')){
					const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Box Office').setColor(0xa81717);
					for(var i = 0; i < data.boxOffice.length; i++){
						RTembed.addField(data.boxOffice[i].title, data.boxOffice[i].gross + '; ' + data.boxOffice[i].meter);
					}
					message.channel.send({embed: RTembed});
				}				
			}
			else {
				message.channel.send('Some error occured.');
			}
		});
	}
}
	/*if (content.startsWith('📷 ') || content.startsWith('!pics ')) { //all the camera commands go in here
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
}*/
}
	
	

const steamgames = ['514340', '514340','514340', '658150', '658150', '522490', '598640'];
const crashfontString = 'abcdefghijklmnopqrstuvwxyz0123456789.:! ';
const metalslugString = ' ?!abcdefghijklmnopqrstuvwxyz0123456789';
const mario64String = '1234567890abcdefghijklmnopqrstuvwxyz ?\'\".,%&!⭐';
const wariowareString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ?+-=#✏$^<%&⭐>/abcdefghijklmnopqrstuvwxyz,.:;\'\"()!';
client.on('message', message => {
	if (message.isMentioned(client.user)) {
		if (message.content.toLowerCase().match(/w(h?)(a|u)t('?)s (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vidya)?( )?((ga([me]{2}))|vidya)(\?)?/gm)){
			message.channel.send('https://store.steampowered.com/app/' + steamgames[(Math.floor(Math.random() * 7))] + '/');
					} else {
						message.channel.send(xtra.beeb());
					}
				}
				if (new RegExp(/[Ff]ont!/gm).test(message.content.substring(0, 5)) && !(new RegExp(/[Ff]ont!(mario64)\W/gm).test(message.content.substring(0, 13))) && !(new RegExp(/[Ff]ont!(kof97|crash|wario)\W/gm).test(message.content.substring(0, 11))) && !(new RegExp(/[Ff]ont!(ms)\W/gm).test(message.content.substring(0, 8)))) {
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

if (new RegExp(/[Ff]ont!wario\W/gm).test(message.content.substring(0, 11)) && message.content.length > 11){
	var text = message.content.substring(11).replace(/[^A-Za-z0-9\.!\:\n\?'",\+\-= %&;:\(\)⭐✏]/gm, '') + ' ';
		//console.log(text);
		var texts = text.match(/.{1,24}\W/gm);
		
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length; cursor++){
	paths[cursor] = fs.readFileSync('./warioware/warioware_' + (wariowareString.indexOf(texts[t].charAt(cursor))+1).toString() + '.png');
}
if (cursor === texts[t].length){
	concat({
images: paths,
margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
		message.channel.send({
files: [{
	attachment: canvas.toBuffer(),
	name: 'warioware.png'
}]
});
});	
}
		}
	}
	
	if (new RegExp(/[Ff]ont!mario64\W/gm).test(message.content.substring(0, 13)) && message.content.length > 13){
		var text = message.content.substring(13).toLowerCase().replace(/[^a-z0-9\.!\n\?'", %&;:⭐]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length;paths[cursor] = fs.readFileSync('./mario64/mario64_' + (mario64String.indexOf(texts[t].charAt(cursor))+1).toString() + '.png'), cursor++);
if (cursor === texts[t].length){
	concat({
images: paths,
margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
		message.channel.send({
files: [{
	attachment: canvas.toBuffer(),
	name: 'mario64.png'
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
	
	parallel(message, message.content);
	pics(message, message.content);
if (message.content.charAt(0) === 'b' || message.content.charAt(0) === 'B'){
var beaboMessage = message.content.substring(1);

	
				
				if (new RegExp(/!hex#[0-9A-Fa-f]{6}/gm).test(beaboMessage.substring(0, 11))) {
	message.channel.send({ embed: { image: { url: 'https://www.colorcombos.com/images/colors/' + beaboMessage.substring(5, 11) + '.png'}}});
}

if (beaboMessage.substring(0, 8) === '!places ') {
	parameters = {
query: beaboMessage.substring(8).split('\"')[1]
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
if (beaboMessage.substring(0, 5) === '!dir ') {
	var args = beaboMessage.substring(5).split('\"');
	var ori = args[1];
	var dest = args[3];
	direction({ origin: ori, destination: dest }).then(function (result) {
		var dirTitle = ':motorway: **' + ori + '** to **' + dest + '**'
		var dir = xtra.getDirections(result);
		message.channel.send({embed: { title: dirTitle, description: dir.length <= 2048 ? dir : 'Too many directions. Just Google it.' }});
	}).catch(console.error);
}
parallel(message, beaboMessage);
pics(message, beaboMessage);


	
	if (beaboMessage.substring(0, 6) === '!time ') {
		xtra.cityTime(message);
	}
	if (beaboMessage.substring(0, 4) === '!gb '){
		console.log(beaboMessage);
		var choice = 0;
	for (var g = 0; g < 7; g++) {
		if (beaboMessage.substring(4, 4 + gbStrings[g].length) === gbStrings[g]) {
			choice = g;
			console.log(gbStrings[g]);
			var typequery = beaboMessage.substring(4 + gbStrings[g].length)
				var query = typequery.substring(0, typequery.indexOf(' '));
			var title = typequery.substring(typequery.indexOf(' ') + 1);
			gbSearchGet[choice].search(title, {
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
								query = 'info,characters,friends,enemies,concepts,franchises,games,developed,published,locations,objects,people,similar,companies';
							}
							gbSearchGet[choice].get(id, function (err2, res2, json2) {
							xtra.gbWiki(json2, query, message, 0);	
							});
						}

					});
				}
			});

		} 
	}
	}
	
	if (beaboMessage.substring(0, 8) === '!ZiV-id ') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + beaboMessage.substring(8) + '#summary');
	}
	if (beaboMessage.substring(0, 8) === '!numpad ' && beaboMessage.length > 8) {
		var command = '**' + beaboMessage.substring(8) + '**';
		command = command.replace(/1/gm, ':arrow_lower_left:').replace(/2/gm, ':arrow_down:').replace(/3/gm, ':arrow_lower_right:').replace(/4/gm, ':arrow_left:')
		.replace(/7/gm, ':arrow_upper_left:').replace(/8/gm, ':arrow_up:').replace(/9/gm, ':arrow_upper_right:').replace(/6/gm, ':arrow_right:').replace(/5/gm, 'neutral');
		message.channel.send(command);
	}
	if (beaboMessage.substring(0, 11) === '!ZiV-random') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000) + 2).toString() + '#summary');
	}
	if (beaboMessage.substring(0, 9) === '!commands') {
		message.channel.send({embed : {fields: [{name: 'Font Commands', value: 'To find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
		'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n'},
		{name: 'Google Maps Commands', value: 'b!dir \"origin\" \"destination\" - prints directions from origin to destination\nb!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\nb!time cityname - gets local time of that city\n'},
		{name:	'Giant Bomb Wiki Commands', value: 'b!gb game/character/company/etc. info/characters/concepts/locations/people/etc. name of thing - returns the info searched for relating to a game/character/company/etc.'},
		{name: '📷 Commands (📷 or b!pics followed by)', value: 'twitter, imgur, or tumblr album - posts the rest of the images from that album\na jpg image on the web - gets the EXIf data of that image\na link to a youtube vid - gets the thumbnail of that youtube vid'},
		{name: 'Other Commands', value: '🍅 or b!rt movietitle - gets RottenTomatoes movie name, description, and critic/audience scores for a movie. type coming soon, opening, or box office instead of a movie title and it will bring up the top lists for those\nb!hex#hexCode - displays image of a color pertaining to the hex code'+
		'\nb!numpad command - turns fighting game numpad notation into emoji\nb!list or b!todo - separates a discord message into a list based on either line breaks or commas'}]}});
	}
}
});

client.login(process.env.BOT_TOKEN);
