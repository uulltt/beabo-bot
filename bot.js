
const Discord = require('discord.js');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var fs = require('fs');
var fonts = require('./fonts.js');
var pics = require('./pics.js');
const rm = require('rotten-movies');
const giantbomb = require('./gb.js');

const { Client } = require('pg');

const herokupg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


client.on('ready', () => {
	console.log('I am ready!');
	herokupg.connect();
	client.user.setUsername("Beabo");
	client.user.setActivity('type b!help for commands', {
		type: 'WATCHING'
	});
});

function pad(n) {
	if (n < 10)
		return "0" + n.toString();
	else
		return n.toString();
}

var lines = [" beabo", " bee", " bii", " be", " beeb"];

function beeb () {
	var len = Math.floor(Math.random() * 6) + 1;
	var sentence = "";
	for (var i = 0; i < len; i++) {
		sentence += lines[Math.floor(Math.random() * lines.length)];
		var ex = Math.floor(Math.random() * 3);
		if (ex === 0) {
			sentence += "!";
		}
	}
	var hasEmote = Math.floor(Math.random() * 6);
	if (hasEmote === 0) {
		return sentence + "! ^^";
	}
	return sentence + "!";

}

var cityTimezones = require('./citytime.js');
var timezone = require('node-google-timezone');
function cityTime (message) {
	var city = message.content.substring(7);
	const citydata = cityTimezones.lookupViaCity(city);
	try {
		var lati = citydata[city === 'London' ? 1 : 0].lat;
		var lngi = citydata[city === 'London' ? 1 : 0].lng;
		var timestamp = Date.now() / 1000;
		timezone.data(lati, lngi, timestamp, function (err, tz) {
			if (!err) {
				var d = new Date(tz.local_timestamp * 1000);
				message.channel.send(d.toDateString() + ' - ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
			} else {
				message.channel.send(err);
			}

		});
	} catch (error) {
		message.channel.send('Error: ' + error.message);
	}

}

function localcityTime (message, city) {
	const citydata = cityTimezones.lookupViaCity(city);
	try {
		var lati = citydata[city === 'London' ? 1 : 0].lat;
		var lngi = citydata[city === 'London' ? 1 : 0].lng;
		var timestamp = Date.now() / 1000;
		timezone.data(lati, lngi, timestamp, function (err, tz) {
			if (!err) {
				var d = new Date(tz.local_timestamp * 1000);
				message.channel.send(d.toDateString() + ' - ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
			} else {
				message.channel.send(err);
			}

		});
	} catch (error) {
		message.channel.send('Error: ' + error.message);
	}

}

function getDirections (result) {
	var dir = '';
	for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
		dir += (i + 1).toString() + '. ' + result.routes[0].legs[0].steps[i].html_instructions.replace(/<\/?b>/gm, '**').replace(/<div style="font-size:0.9em">/gm, ' `(').replace(/<\/div>/gm, ')`') + ' (' + result.routes[0].legs[0].steps[i].distance.text + ', ' + result.routes[0].legs[0].steps[i].duration.text + ')\n';
	}
	return dir + 'And you\'re there! :smiley:';
}

function helpMessage (message) {
	message.channel.send('http://uulltt.tumblr.com/beabo', {
				embed: {
					fields: [{
							name: 'Font Commands',
							value: 'To find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
							'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n'
							 + 'Custom Fonts: font!crash, font!ms (metal slug), font!mario64, font!wario (warioware), font!puyo (Puyo Puyo), font!mk2 (mortal kombat 2)'
						}, {
							name: 'Google Maps Commands',
							value: 'b!dir \"origin\" \"destination\" - prints directions from origin to destination\nb!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\n'
						}, {
							name: 'Local Time Commands',
							value: 'b!time cityname - gets local time of that city\nb!settime cityname - sets the local time for you based on the given city name\nb!gettime @user - fetches the local time for that user based on the city they set for themself\n'
						}, {
							name: 'Giant Bomb Wiki Commands',
							value: 'b!gb game/character/company/etc. info/characters/concepts/locations/people/etc. name of thing - returns the info searched for relating to a game/character/company/etc.'
						}, {
							name: ':camera: Commands (:camera: or b!pics followed by)',
							value: 'twitter, imgur, or tumblr album - posts the rest of the images from that album\na jpg image on the web - gets the EXIf data of that image\na link to a youtube vid - gets the thumbnail of that youtube vid'
						}, {
							name: 'Other Commands',
							value: ':tomato: or b!rt movietitle - gets RottenTomatoes movie name, description, and critic/audience scores for a movie. type coming soon, opening, or box office instead of a movie title and it will bring up the top lists for those\nb!hex#hexCode - displays image of a color pertaining to the hex code' +
							'\nb!numpad command - turns fighting game numpad notation into emoji\nb!list or b!todo your list here - separates a discord message into a list based on either line breaks or commas'
						}
					]
				}
			});
}

function movies(message, content) {
	if ((content.startsWith('🍅 ') || content.startsWith('!rt ')) && content.length > 3) {
		var com = content.startsWith('🍅 ') ? 3 : 4;
		if (!content.includes('coming soon') && !content.includes('box office') && !content.includes('opening')) {
			var movieurl = 'https://www.rottentomatoes.com/m/' + encodeURI(content.substring(com).toLowerCase().replace(/ /gm, '_').replace(/[^a-z0-9_]/gm, ''));
			rm.info(movieurl, function (err, info) {
				rm.scores(movieurl, function (err2, scores) {
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
			rtscraper.getRottenTomatoesScraperData(function (error, data) {
				if (!error) {
					if (content.includes('coming soon')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Coming Soon').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.comingSoon.length; i++) {
							RTembed.addField(data.comingSoon[i].title, data.comingSoon[i].date + '; ' + data.comingSoon[i].meter);
						}
						console.log(RTembed);
						message.channel.send({
							embed: RTembed
						});
					}
					if (content.includes('opening')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Opening This Week').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.openingThisWeek.length; i++) {
							RTembed.addField(data.openingThisWeek[i].title, data.openingThisWeek[i].date + '; ' + data.openingThisWeek[i].meter);
						}
						message.channel.send({
							embed: RTembed
						});
					}
					if (content.includes('box office')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Box Office').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.boxOffice.length; i++) {
							RTembed.addField(data.boxOffice[i].title, data.boxOffice[i].gross + '; ' + data.boxOffice[i].meter);
						}
						message.channel.send({
							embed: RTembed
						});
					}
				} else {
					message.channel.send('Some error occured.');
				}
			});
		}
	}
}
const steamlink = 'https://store.steampowered.com/app/';
const steamgames = ['514340', '514340', '514340', '658150', '658150', '522490', '598640'];
const favegames = [steamlink + steamgames[0], steamlink + steamgames[1], steamlink + steamgames[2], steamlink + steamgames[3], steamlink + steamgames[4], steamlink + steamgames[5], steamlink + steamgames[6], 'https://dustinbragg.itch.io/yo-noid-was-ahead-of-its-time']
client.on('message', message => {
	if (message.isMentioned(client.user)) {
		
		if (message.content.toLowerCase().includes("help")){
		helpMessage(message);
		} else {
		if (message.content.toLowerCase().match(/w(h?)(a|u)t('?)s (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vidya)?( )?((ga([me]{2}))|vidya)(\?)?/gm)) {
			if (message.content.toLowerCase().includes("steam")){
			message.channel.send(favegames[(Math.floor(Math.random() * 7))] + '/');
			} else {
				message.channel.send(favegames[(Math.floor(Math.random() * 8))] + '/');
			}
		} else {
			message.channel.send(beeb());
		}
		}
	}
	fonts(message);
	movies(message, message.content);
	pics(message, message.content);
	if (message.content.toLowerCase().charAt(0) === 'b') {
		var beaboMessage = message.content.substring(1);

		if (new RegExp(/!hex#[0-9A-Fa-f]{6}/gm).test(beaboMessage.substring(0, 11))) {
			message.channel.send({
				embed: {
					image: {
						url: 'https://www.colorcombos.com/images/colors/' + beaboMessage.substring(5, 11) + '.png'
					}
				}
			});
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
							open = response.results[i].opening_hours.open_now ? ':large_blue_circle: ***OPEN NOW!***' : ':red_circle: Sorry, closed.';
					}
					message.channel.send('**' + response.results[i].name + '**\n`' + response.results[i].formatted_address + '`\n:star: ' + response.results[i].rating + '\n' + open);
				}
			});

		}
		if (beaboMessage.substring(0, 5) === '!dir ') {
			var args = beaboMessage.substring(5).split('\"');
			var ori = args[1];
			var dest = args[3];
			direction({
				origin: ori,
				destination: dest
			}).then(function (result) {
				var dirTitle = ':motorway: **' + ori + '** to **' + dest + '**'
					var dir = getDirections(result);
				message.channel.send({
					embed: {
						title: dirTitle,
						description: dir.length <= 2048 ? dir : 'Too many directions. Just Google it.'
					}
				});
			}).catch(console.error);
		}
		movies(message, beaboMessage);
		pics(message, beaboMessage);

		if (beaboMessage.substring(0, 6) === '!time ') {
			cityTime(message);
		}
		if (beaboMessage.substring(0, 4) === '!gb ') {
			giantbomb(message, beaboMessage);
		}
		if (beaboMessage.substring(0, 4) === '!pg ' && message.author.id === process.env.BOT_ADMIN) {
			herokupg.query(beaboMessage.substring(4), (err, res) => {
				if (!err)
				console.log(res);
			else
				console.log(err);
});
		}
		if (beaboMessage.toLowerCase().substring(0, 9) === '!settime ' && beaboMessage.length > 9) {
			var city = beaboMessage.substring(9);
			console.log('INSERT INTO localtimes(user_id, city_name) VALUES (\''+message.author.id+'\',\''+city+'\')ON CONFLICT (user_id) DO UPDATE SET city_name = EXCLUDED.city_name;');
			herokupg.query('INSERT INTO localtimes(user_id, city_name) VALUES (\''+message.author.id+'\',\''+city+'\')ON CONFLICT (user_id) DO UPDATE SET city_name = EXCLUDED.city_name;', (err, res) => {
				if (!err){
				console.log(res);
				message.channel.send('Beabo bee! (Local time set for <@' + message.author.id + '>)');
				}
			else
				console.log(err);
});
		}
		
		if (beaboMessage.toLowerCase().substring(0, 9) === '!gettime ' && beaboMessage.length > 9) {
			var id = beaboMessage.substring(9).replace(/[^0-9]/gm, '');
			herokupg.query('SELECT city_name FROM localtimes WHERE user_id = \'' + id + '\';', (err, res) => {
				if (!err){
				console.log(res);
				localcityTime(message, res.rows[0].city_name);
				}else
				console.log(err);
});
		}
		
		if (beaboMessage.substring(0, 8) === '!numpad ' && beaboMessage.length > 8) {
			var command = '**' + beaboMessage.substring(8) + '**';
			command = command.replace(/1/gm, ':arrow_lower_left:').replace(/2/gm, ':arrow_down:').replace(/3/gm, ':arrow_lower_right:').replace(/4/gm, ':arrow_left:')
				.replace(/7/gm, ':arrow_upper_left:').replace(/8/gm, ':arrow_up:').replace(/9/gm, ':arrow_upper_right:').replace(/6/gm, ':arrow_right:').replace(/5/gm, 'neutral');
			message.channel.send(command);
		}
		if (beaboMessage.substring(0, 8) === '!ZiV-id ') {
			message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + beaboMessage.substring(8) + '#summary');
		}
		
		if (beaboMessage.substring(0, 11) === '!ZiV-random') {
			message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000) + 2).toString() + '#summary');
		}
		if (beaboMessage.substring(0, 9) === '!commands' || beaboMessage.substring(0, 5) === '!help') {
			helpMessage(message);
		}
	}
});

client.login(process.env.BOT_TOKEN);
