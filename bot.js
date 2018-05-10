
const Discord = require('discord.js');
const xtra = require('./xtra.js');
var Twitter = require('twitter');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var imgur = require('imgur');
var ExifImage = require('exif').ExifImage;
var cityTimezones = require('city-timezones');
var Tumblr = require('tumblrwks');
const giantbomb = require('giantbomb');
const gb = giantbomb(process.env.GIANT_BOMB);
var tumblr = new Tumblr({
  consumerKey: process.env.TUMBLR_CONSUMER_KEY,
});
var timezone = require('node-google-timezone');
var tweeter = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setUsername("Beabo");
	client.user.setActivity('type !commands for help', { type: 'WATCHING' });
});



client.on('message', message => {
	
	if (message.isMentioned(client.user)){	
		message.channel.send(xtra.beeb());
	}
	if (message.content.substring(0, 6) === '!exif '){
		var request = require('request').defaults({ encoding: null });
request.get(message.content.substring(6), function (err, res, body) {
var exifString = ':frame_photo: EXIF data:\n';
try {
    new ExifImage({ image : body }, function (error, exifData) {
        if (error)
            message.channel.send('Error: '+ error.message);
        else{
			var propValue;
            for(var propName in exifData.image) {
    propValue = exifData.image[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
			}
 for(var propName in exifData.thumbnail) {
    propValue = exifData.image[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
 }
for(var propName in exifData.exif) {
    propValue = exifData.exif[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
}
for(var propName in exifData.gps) {
    propValue = exifData.gps[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";

if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
   exifString += field;
}
}
for(var propName in exifData.interoperability) {
    propValue = exifData.interoperability[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";

if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
   exifString += field;
}
}
if (exifString.length > 2000){
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
			message.channel.send(dir.length <= 2000 ? dir : 'Too many directions. Just Google it.');
		}).catch(console.error);
	}
	if (message.content.substring(0, 6) == '!pics ' || message.content.substring(0, 6) == '!full ' || message.content.substring(0, 7) == '!album '){
	if(message.content.includes('twitter.com/') && message.content.includes('/status/')) {
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
				message.channel.send (error);
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
        message.channel.send(err.message);
    });		
	}
	if (message.content.includes('tumblr.com/post/')) {
		var hasBlogId = message.content.substring(0, message.content.indexOf('.tumblr')).match(/[A-Za-z0-9\-]+/gm);
		var blogId = hasBlogId[hasBlogId.length - 1];
		var postId = parseInt(message.content.substring(message.content.indexOf('/post/') + ('/post/').length).match(/[0-9]+/gm)[0]);
		tumblr.get('/posts', {hostname: blogId + '.tumblr.com', id : postId }, function(err, json){
			if (json.total_posts > 0 && json.posts[0].type === 'photo'){
	  for(var i = 1; i < json.posts[0].photos.length; i++){
		  message.channel.send({embed: {
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
if (new RegExp(/[Ff]ont!/gm).test(message.content.substring(0, 5))){
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
if (new RegExp(/[Bb][du][0-9][0-9]!/gm).test(message.content.substring(0, 5))){
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
							url: 'https://nfggames.com/system/arcade/arcade.php/b-'+dir+'/bp-'+pos+'y-kof97/z-0/dbl-2/x-' + encodeURI(args[i] + '\u200B')
						}
					}
				})
		}
	}
	if (message.content.substring(0, 6) === '!time '){
		var city = message.content.substring(6);
		const citydata = cityTimezones.lookupViaCity(city);
		try{
		var lati = citydata[city === 'London' ? 1 : 0].lat;
		var lngi = citydata[city === 'London' ? 1 : 0].lng;
		var timestamp = Date.now()/1000;
		timezone.data(lati, lngi, timestamp, function (err, tz) {
 if (!err){
  var d = new Date(tz.local_timestamp * 1000);
  message.channel.send(d.toDateString() + ' - ' + xtra.pad(d.getHours()) + ':' + xtra.pad(d.getMinutes()) + ':' + xtra.pad(d.getSeconds()));
 } else {
	 console.log(err);
 }
 
});
		} catch (error) {
   message.channel.send('Error: ' + error.message);
		}
	}
	if (message.content.substring(0, 9) === '!gb game ' || message.content.substring(0, 9) === '!gb game '){
		var typequery = message.content.substring(9)
		var query = typequery.substring(0, typequery.indexOf(' '));
		var title = typequery.substring(typequery.indexOf(' ')+1);
gb.games.search(title, {limit : 1}, (err, res, json) => {
	if (json.hasOwnProperty('results') && json.results.hasOwnProperty('length') && json.results.length > 0){
	var id = json.results[0].id;
gb.games.get(id, function (err2, res2, json2) {
	var embedTitle = title + ' ';
	var embedString = '';
	//var embedImage = json2.results.image.original_url;
  if (query === 'characters'){
		embedTitle += 'Characters';
		for(var i = 0; i < json2.results.characters.length; i++){
			if ((embedString + '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'concepts'){
		embedTitle += 'Concepts';
		for(var i = 0; i < json2.results.concepts.length; i++){
			if ((embedString + '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'locations'){
		embedTitle += 'Locations';
		for(var i = 0; i < json2.results.locations.length; i++){
			if ((embedString + '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'objects'){
		embedTitle += 'Objects';
		for(var i = 0; i < json2.results.objects.length; i++){
			if ((embedString + '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'similar'){
		embedTitle += 'Similar Games';
		for(var i = 0; i < json2.results.similar_games.length; i++){
			if ((embedString + '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'themes'){
		embedTitle += 'Themes';
		for(var i = 0; i < json2.results.themes.length; i++){
			if ((embedString + '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n';
		}
	}
	if (embedString.length > 2048){
		embedString = embedString.substring(0, 2048);
	}
	message.channel.send({
			embed: {
				title: embedTitle,
				description: embedString,
				color: 0xa81717//, 
				/*thumbnail: {
					url : embedImage
				}*/
			}
		});
});
}
});
	}
	
		if (message.content.substring(0, 12) === '!gb concept ' || message.content.substring(0, 12) === '!gb concept '){
		var typequery = message.content.substring(12)
		var query = typequery.substring(0, typequery.indexOf(' '));
		var title = typequery.substring(typequery.indexOf(' ')+1);
gb.concepts.search(title, {limit : 1}, (err, res, json) => {
	if (json.hasOwnProperty('results') && json.results.hasOwnProperty('length') && json.results.length > 0){
	var id = json.results[0].id;
gb.concepts.get(id, function (err2, res2, json2) {
	var embedTitle = title + ' ';
	var embedString = '';
	//var embedImage = json2.results.image.original_url;
	if (query === 'locations'){
		embedTitle += 'Locations';
		for(var i = 0; i < json2.results.locations.length; i++){
			if ((embedString + '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'objects'){
		embedTitle += 'Objects';
		for(var i = 0; i < json2.results.objects.length; i++){
			if ((embedString + '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'info'){
		embedString += '**Description: ' + json2.results.deck + '**\n';
		embedString += '**First Appearance: [' + json2.results.first_appeared_in_game.name + '](' + json2.results.first_appeared_in_game.site_detail_url + ')**';
		/*for(var i = 0; i < json2.results.objects.length; i++){
			if ((embedString + '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n';
		}*/
	}
  if (query === 'franchises'){
		embedTitle += 'Franchises';
		for(var i = 0; i < json2.results.franchises.length; i++){
			if ((embedString + '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'games'){
		embedTitle += 'Games';
		for(var i = 0; i < json2.results.games.length; i++){
			if ((embedString + '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'characters'){
		embedTitle += 'Characters';
		for(var i = 0; i < json2.results.characters.length; i++){
			if ((embedString + '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'concepts'){
		embedTitle += 'Concepts';
		for(var i = 0; i < json2.results.concepts.length; i++){
			if ((embedString + '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n';
		}
	}
	
	/*if (query === 'similar'){
		embedTitle += 'Similar Games';
		for(var i = 0; i < json2.results.similar_games.length; i++){
			if ((embedString + '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'themes'){
		embedTitle += 'Themes';
		for(var i = 0; i < json2.results.themes.length; i++){
			if ((embedString + '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n';
		}
	}*/
	if (embedString.length > 2048){
		embedString = embedString.substring(0, 2048);
	}
	message.channel.send({
			embed: {
				title: embedTitle,
				description: embedString,
				color: 0xa81717//, 
				/*thumbnail: {
					url : embedImage
				}*/
			}
		});
});
}
});
	}
	
	if (message.content.substring(0, 14) === '!gb character ' || message.content.substring(0, 14) === '!gb character '){
		var typequery = message.content.substring(14)
		var query = typequery.substring(0, typequery.indexOf(' '));
		var title = typequery.substring(typequery.indexOf(' ')+1);
gb.characters.search(title, {limit : 1}, (err, res, json) => {
	if (json.hasOwnProperty('results') && json.results.hasOwnProperty('length') && json.results.length > 0){
	var id = json.results[0].id;
gb.characters.get(id, function (err2, res2, json2) {
	var embedTitle = title + ' ';
	var embedString = '';
	//var embedImage = json2.results.image.original_url;
	if (query === 'locations'){
		embedTitle += 'Locations';
		for(var i = 0; i < json2.results.locations.length; i++){
			if ((embedString + '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.locations[i].name + '](' + json2.results.locations[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'objects'){
		embedTitle += 'Objects';
		for(var i = 0; i < json2.results.objects.length; i++){
			if ((embedString + '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'info'){
		embedString += '**Description: ' + json2.results.deck + '**\n';
		embedString += '**First Appearance: [' + json2.results.first_appeared_in_game.name + '](' + json2.results.first_appeared_in_game.site_detail_url + ')**';
		embedString += '**Gender: ' + json2.results.gender + '**';
		embedString += '**Birthday: ' + json2.results.birthday + '**';
		/*for(var i = 0; i < json2.results.objects.length; i++){
			if ((embedString + '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.objects[i].name + '](' + json2.results.objects[i].site_detail_url + ')**\n';
		}*/
	}
  if (query === 'franchises'){
		embedTitle += 'Franchises';
		for(var i = 0; i < json2.results.franchises.length; i++){
			if ((embedString + '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'games'){
		embedTitle += 'Games';
		for(var i = 0; i < json2.results.games.length; i++){
			if ((embedString + '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'friends'){
		embedTitle += 'Friends';
		for(var i = 0; i < json2.results.friends.length; i++){
			if ((embedString + '**•[' + json2.results.friends[i].name + '](' + json2.results.friends[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.friends[i].name + '](' + json2.results.friends[i].site_detail_url + ')**\n';
		}
	}
	
	 if (query === 'enemies'){
		embedTitle += 'Enemies';
		for(var i = 0; i < json2.results.enemies.length; i++){
			if ((embedString + '**•[' + json2.results.enemies[i].name + '](' + json2.results.enemies[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.enemies[i].name + '](' + json2.results.enemies[i].site_detail_url + ')**\n';
		}
	}
	 if (query === 'concepts'){
		embedTitle += 'Concepts';
		for(var i = 0; i < json2.results.concepts.length; i++){
			if ((embedString + '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.concepts[i].name + '](' + json2.results.concepts[i].site_detail_url + ')**\n';
		}
	}
	
	/*if (query === 'similar'){
		embedTitle += 'Similar Games';
		for(var i = 0; i < json2.results.similar_games.length; i++){
			if ((embedString + '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'themes'){
		embedTitle += 'Themes';
		for(var i = 0; i < json2.results.themes.length; i++){
			if ((embedString + '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json2.results.themes[i].name + '](' + json2.results.themes[i].site_detail_url + ')**\n';
		}
	}*/
	if (embedString.length > 2048){
		embedString = embedString.substring(0, 2048);
	}
	message.channel.send({
			embed: {
				title: embedTitle,
				description: embedString,
				color: 0xa81717//, 
				/*thumbnail: {
					url : embedImage
				}*/
			}
		});
});
}
});
	}
	if (message.content.substring(0, 8) === '!ZiV-id ') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + message.content.substring(8) + '#summary');
	}
	if (message.content.substring(0, 11) === '!ZiV-random') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000)+2).toString() + '#summary');
	}
	if (message.content.substring(0, 9) === '!commands') {
		message.channel.send('font commands\nTo find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
			'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n' +
			/*'[Ff]ont!arcade - classic arcade\n[Ff]ont!bios - BioShipPaladin\n[Ff]ont!chiki - chiki chiki boys\n[Ff]ont!ddcrew - DDCrew\n[Ff]ont!DDR - Dance Dance Revolution\n[Ff]ont!ddux - dynamite dux\n[Ff]ont!fz - fantasy zone\n[Ff]ont!gain - gain ground\n[Ff]ont!garou - fatal fury\n' +
			'[Ff]ont!gradius - shoot the core\n[Ff]ont!guar - guardians\n[Ff]ont!kais - kaiser knuckle\n[Ff]ont!kiki - kiki kaikai\n[Ff]ont!kof97 - king of fighters 97\n[Ff]ont!kof2k - king of fighters 2000\n[Ff]ont!kof2k1 - king of fighters 2001\n' +
			'[Ff]ont!kof2k2 - king of fighters 2002\n[Ff]ont!kof2k3 - king of fighters 2003\n[Ff]ont!mt - major title\n[Ff]ont!moma = monster maulers\n[Ff]ont!namco2 - namco classic gradient\n[Ff]ont!njgd - ninja gaiden\n[Ff]ont!pabom - panic bomber\n[Ff]ont!paro - parodius da\n' +
			'[Ff]ont!pubu - puzzle bobble\n[Ff]ont!quake - quack\n[Ff]ont!raph - rapid hero\n[Ff]ont!robot - robotron\n[Ff]ont!rtl - rtype leo\n[Ff]ont!sexy - parodius\n[Ff]ont!sf2 - street fighter 2\n[Ff]ont!ssf2 - super street fighter 2\n[Ff]ont!sfz3 or !sfa3 - street fighter zero\alpha 3\n[Ff]ont!simp - the simpsons\n' +
			'[Ff]ont!sold - soldam\n[Ff]ont!tetris - tetris (sega)\n[Ff]ont!vict - victory road\n*/
			'\ngoogle maps commands\n!dir \"origin\" \"destination\" - prints directions from origin to destination\n!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\n!time cityname - gets local time of that city\n'+
			'\nother commands\n!full or !pics or !album followed by twitter/imgur/tumblr link - displays full photo album of tweet or imgur/tumblr post\n'+
			'hex#hexCode - displays image of a color pertaining to the hex cde\n!exif followed by link to jpg image - prints out exif data of image\n'+
			'!list or !todo - splits discord message into a to-do list\n!ZiV-id (number) - gets arcade on Zenius-i-Vanisher with that number\n!ZiV-random - gets a random arcade on Zenius-i-Vanisher');
	}

});

client.login(process.env.BOT_TOKEN);
