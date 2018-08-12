
const Discord = require('discord.js');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var fs = require('fs');
var fonts = require('./fonts.js');
var pics = require('./pics.js');
const movies = require('./rotten.js');
const giantbomb = require('./gb.js');
var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;
var path = require('path');
Canvas.registerFont('./fonts/COOPBL.TTF', {
	family: 'Cooper Black'
});
Canvas.registerFont('./fonts/Futura Std Heavy Oblique.otf', {
	family: 'Supreme'
});
Canvas.registerFont('./fonts/Textile.ttf', {
	family: 'Textile'
});
Canvas.registerFont('./fonts/Korinna Bold.ttf', {
	family: 'Jeopardy'
});
//var coopbl = new Font('cooper black', ('./fonts/COOPBL.ttf'));


var EarthBoundText = require('./scripts/lib/ebtext.js');
var timestuff = require('./timestuff.js');
const {
	Client
} = require('pg');

const herokupg = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

client.on('ready', () => {
	console.log('Beabo!');
	herokupg.connect();
	client.user.setUsername("Beabo");
	client.user.setActivity('type b!help for commands', {
		type: 'WATCHING'
	});
	/*var guilds = client.guilds.array().map(function(item){
	return item.id;
	});
	for(var i = 0; i < guilds.length; i++){
	herokupg.query("INSERT INTO permissions (guild_id, voice, picsglobal) VALUES (\'"+guilds[i].toString()+"\',false,false) ON CONFLICT (guild_id) DO NOTHING;", (err, res) => {
	if (!err)
	console.log(res);
	else
	console.log(err);
	});
	}*/
});

client.on('guildCreate', (guild) => {
	herokupg.query("INSERT INTO permissions (guild_id, voice, picsglobal, greeting) VALUES (\'" + guild.id.toString() + "\',false,false,false) ON CONFLICT (guild_id) DO NOTHING;", (err, res) => {
		if (!err)
			console.log(res);
		else
			console.log(err);
	});
});

var lines = [" beabo", " bee", " bii", " be", " beeb"];

function beeb() {
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

function getDirections(result) {
	var dir = '';
	for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
		dir += (i + 1).toString() + '. ' + result.routes[0].legs[0].steps[i].html_instructions.replace(/<\/?b>/gm, '**').replace(/<div style="font-size:0.9em">/gm, ' `(').replace(/<\/div>/gm, ')`') + ' (' + result.routes[0].legs[0].steps[i].distance.text + ', ' + result.routes[0].legs[0].steps[i].duration.text + ')\n';
	}
	return dir + 'And you\'re there! :smiley:';
}

function helpMessage(message) {
	message.channel.send('http://ultdev.tumblr.com/beabo', {
		embed: {
			fields: [{
					name: 'Album Embedding (b!pics followed by)',
					value: 'twitter, imgur, or tumblr album - posts the rest of the images from that album\na link to a youtube vid - gets the thumbnail of that youtube vid\na jpg image on the web - gets the EXIf data of that image'
				}, {
					name: 'Other Embedding Commands',
					value: 'b!vids (tumblr post) - embeds a video post from tumblr\nb!song (tumblr or vocaroo post) - embeds an audio post from tumblr (with its album art) or vocaroo.\nlink to 4chan post - embeds said 4chan post. Be safe out there kids.'
				}, {
					name: 'Funny Fonts',
					value: 'b!font [game name] [message] (without brackets) - allows you to have beabo pop out a funny message using the font of your favorite game.\n(Game list here: https://nfggames.com/games/fontmaker/ the text after the "y-" in the image url is what you input for [game name])\n'
					 + 'Custom Fonts: font!crash, font!ms (metal slug), font!mario64, font!wario (warioware), font!puyo (Puyo Puyo), font!mk2 (mortal kombat 2), font!doom, font!ecco, font!wh2 (world heroes 2), font!ddpt (dodonpachi tall font), font!rr (road rash font), font!mvc (marvel vs capcom 1)'
				}, {
					name: 'VG Text Box Commands (type the command followed by your message.)',
					value: `b!eb - creates EarthBound-style text box. Also available in all 5 flavors; Normal, mint, strawberry, banana, and peanut. 
(Just add m,s,b,or p after b!eb with no spaces to flavor your textbox. the default is normal flavor.)
b!pkmn - creates a pokemon styled text box.
b!sb - creates a Skeleton Boomerang text box.
b!ut - creates an Undertale text box.
`+'`b!ut_[character name]` - creates an Undertale text box with that character (i.e. b!utsans [Hey guys it\'s me Sans Undertale])\n`b!ut_[character name]_[expression]` - same as above but uses a specific expression for that character (i.e. b!utundyne_funny)'
				}, {
					name: 'More Text Box Commands',
					value: `b!jeopardy - makes a Jeopardy answer screen with user input
b!nirvanna - nirvanna the band the word 
b!supreme - supreme logo generator
b!sunny - generates an always sunny title card. also works with b!iasip`
				}, {
					name: 'Local Time Commands',
					value: 'b!time cityname - gets local time of that city\nb!settime cityname - sets the local time for you based on the given city name\nb!gettime @user - fetches the local time for that user based on the city they set for themself\n'
				}, {
					name: 'Admin Commands (b!set followed by)',
					value: 'voice true/false - turns audio stuff on or off\npicsglobal true/false - automatically does pics command for any posted twitter/imgur/tumblr link if true\ngreeting true/false - does a server greeting for new members'
					/*}, {
					name: 'Google Maps Commands',
					value: 'b!dir \"origin\" \"destination\" - prints directions from origin to destination\nb!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\n'

					/*}, {
					name: 'Giant Bomb Wiki Commands',
					value: 'b!gb game/character/company/etc. info/characters/concepts/locations/people/etc. name of thing - returns the info searched for relating to a game/character/company/etc.'


					}, {
					name: 'Other Commands',
					value: ':tomato: or b!rt movietitle - gets RottenTomatoes movie name, description, and critic/audience scores for a movie. type coming soon, opening, or box office instead of a movie title and it will bring up the top lists for those\nb!hex#hexCode - displays image of a color pertaining to the hex code' +
					'\nb!rhyme word - find words that rhyme with a given word\nb!numpad command - turns fighting game numpad notation into emoji\n\nb!hex# - gets color for that specific hex'
					 */
				}
			]
		}
	});
}

const steamlink = 'https://store.steampowered.com/app/';
const steamgames = ['514340', '514340', '514340', '658150', '658150', '522490', '598640'];
const favegames = [steamlink + steamgames[0], steamlink + steamgames[1], steamlink + steamgames[2], steamlink + steamgames[3], steamlink + steamgames[4], steamlink + steamgames[5], steamlink + steamgames[6], 'https://dustinbragg.itch.io/yo-noid-was-ahead-of-its-time']
const webcomics = ['http://dreamrise-comic.com', 'http://endlesshallscomic.tumblr.com', 'http://www.monster-lands.com'];
client.on('message', async message => {
	/*if ((message.content.toLowerCase().includes('@y\'all') || message.content.toLowerCase().includes('@yall')) && !(new RegExp(/`[^`]*@y('?)all[^`]*`/gm)).test(message.content.toLowerCase())){
	message.channel.fetchMessages({ limit: 15 })
	.then(messages => message.channel.send(messages.array().map(function(item){
	return '<@' + item.author.id  + '>';
	}).filter(function(item, pos, self) {
	return self.indexOf(item) == pos;
	}).toString()
	))
	.catch(console.error);
	}*/

	if (message.content.includes('@everyone')) {
		var chance = Math.floor(Math.random() * 100);
		if (chance === 0) {
			message.channel.send('***BEEEEEEEEEEEE!!!***', {
				files: [{
						attachment: './everyone.png',
						name: 'everyone.png'
					}
				]
			}).then().catch(console.error);
		}
	}
	if (message.content.toLowerCase().includes('despacito 2')) {
		var chance = Math.floor(Math.random() * 20);
		if (chance === 0) {
			message.channel.send({
				files: [{
						attachment: './despabeabo2.png',
						name: 'despabeabo2.png'
					}
				]
			}).then().catch(console.error);
		}
	}

	if (message.content.toLowerCase() === "right about now" || message.content.toLowerCase() === "check it out now") {
		message.channel.send('\"the funk soul brother\"').then().catch(console.error);
	}
	if (message.content.toLowerCase() === "right about now, the funk soul brother") {
		message.channel.send('\"check it out now, the funk soul brother\"').then().catch(console.error);
	}
	if (message.content.toLowerCase() === "check it out now, the funk soul brother") {
		message.channel.send('\"right about now, the funk soul brother\"').then().catch(console.error);
	}
	if (message.author.id !== client.user.id && (message.cleanContent.toLowerCase().match(/(bii)|(beeb)/gm)) && !message.cleanContent.toLowerCase().match(/[cdfghjklmnpqrstuvwxyz]/gm)) {
		message.channel.send("Biii!!!!! biiiiiii!! :revolving_hearts:");
	} else {
		if (message.isMentioned(client.user) && !message.cleanContent.toLowerCase().includes('🖕') && !(message.cleanContent.toLowerCase().match(/(not (cu|valid))|(do( ?)n(('|o)?)t l(o|u)v)/gm) && (message.cleanContent.toLowerCase().match(/((l(o|u)v(e?))|(<3)) (((yo)?)u|(ya(h?)))/gm) || message.cleanContent.toLowerCase().match(/c(u+)te/gm) || message.cleanContent.toLowerCase().includes("best") || message.cleanContent.toLowerCase().includes("valid"))) && !(message.cleanContent.toLowerCase().match(/((f(u|(ri))([ck]{1,2}))|(hate)) (yo)?u/gm) || message.cleanContent.toLowerCase().match(/(yo)?u su([ck]{1,2})/gm))) {

			if (!message.cleanContent.toLowerCase().match(/(not (cu|valid))|(do( ?)n(('|o)?)t l(o|u)v)/gm) && (message.cleanContent.toLowerCase().match(/((l(o|u)v(e?))|(<3)) (((yo)?)u|(ya(h?)))/gm) || message.cleanContent.toLowerCase().match(/c(u+)te/gm) || message.cleanContent.toLowerCase().includes("best") || message.cleanContent.toLowerCase().includes("valid"))) {
				if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel) {
					herokupg.query("SELECT voice FROM permissions WHERE guild_id = \'" + message.guild.id.toString() + "\';", async function (err, res) {
						if (res.rows[0].voice) {
							const connection = await message.member.voiceChannel.join();
							const dispatcher = connection.playFile('./beabo_' + (Math.floor(Math.random() * (7))) + '.mp3');
							dispatcher.setVolume(0.3); // half the volume
							dispatcher.on('end', () => {
								message.guild.voiceConnection.channel.leave();
							});
						} else {
							message.channel.send("bee bee biiiii! :heart:");
						}
					});
				} else {
					message.channel.send("bee bee biiiii! :heart:");
				}
			} else if (message.content.toLowerCase().includes("help")) {
				helpMessage(message);
			} else if (message.content.toLowerCase().match(/w(h?)(a|u)t((('?)s)|( is)) (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a)(\?)?/gm) || message.content.toLowerCase().match(/w(h?)(a|u)t (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a) should i (get|buy|play|dl|download|(is (yo)?ur fav((e|orite)?)))(\?)?/gm)) {
				message.channel.send(favegames[(Math.floor(Math.random() * ((message.content.toLowerCase().includes("steam") || message.content.toLowerCase().includes("buy")) ? 7 : 8)))] + '/');
			} else if (message.content.toLowerCase().match(/w(h?)(a|u)t((('?)s)|( is)) (yo)?ur fav((e|orite)?) ((web(( |(\-))?))?)(comic)(\?)?/gm) || message.content.toLowerCase().match(/w(h?)(a|u)t ((web(( |\-)?))?)(comic) is (yo)?ur fav((e|orite)?)(\?)?/gm)) {
				message.channel.send(webcomics[(Math.floor(Math.random() * (3)))] + '/');
			} else {

				if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel) {
					herokupg.query("SELECT voice FROM permissions WHERE guild_id = \'" + message.guild.id.toString() + "\';", async function (err, res) {
						if (res.rows[0].voice) {
							const connection = await message.member.voiceChannel.join();
							const dispatcher = connection.playFile('./beabo_' + (Math.floor(Math.random() * (7))) + '.mp3');
							dispatcher.setVolume(0.3); // half the volume
							dispatcher.on('end', () => {
								message.guild.voiceConnection.channel.leave();
							});
						} else {
							message.channel.send(beeb()).then().catch(console.error);
						}
					});
				} else {
					message.channel.send(beeb()).then().catch(console.error);
				}
			}
		}
	}

	if (message.hasOwnProperty('channel') && message.channel.hasOwnProperty('guild') && message.channel.guild.hasOwnProperty('id') && message.channel.guild.id === '439555383313301514' && message.channel.id === '450169522561875979' && !message.author.bot) {
		let role = message.guild.roles.array().filter(function (item) {
				return item.name === "Reader";
			});
		if (role.length > 0) {
			message.member.addRole(role[0]).then().catch(console.error);
		} else {
			message.channel.send("Beaboooooooo! (Error. There is no \"Reader\" role.)");
		}
	}
	fonts(message);
	//movies(message, message.content);
	pics(message, message.content, herokupg);
	if (message.content.match(/boards\.4chan\.org\/[3a-z]+\/thread\/[0-9]+/gm)) {
			var thread = message.content.substring(message.content.indexOf('.4cha') + 5);
			console.log(thread);
			var post = thread.match(/[0-9][0-9]+/gm)[0];
			if (thread.includes('#p')) {
				post = thread.substring(thread.indexOf('#p') + 2).match(/[0-9]+/gm)[0];
				thread = thread.substring(0, thread.indexOf('#p'));

			}
			thread = thread.match(/n\.org\/[3a-z]+\/thread\/[0-9]+/gm)[0];
			console.log(thread);
			var board = thread.substring(thread.indexOf('org/') + 4);
				board = board.substring(0, board.indexOf('/'));
			var request = require('request').defaults({
					encoding: null
				});
			request.get(encodeURI('https://a.4cd' + thread + '.json'), function (err, res, body) {
				var posts = JSON.parse(body.toString());
				var jsonpost = posts.posts.filter(function (item) {
						return item.no.toString() === post;
					})[0];
				var text = jsonpost.com.replace(/<br>/gm, '\n').replace(/&gt;/gm, '>').replace(/&lt;/gm, '<').replace(/&#039;/gm, '\'').replace(/&quot;/gm, '\"').replace(/<a href=".+" class="quotelink">/gm, '').replace(/<\/a>/gm, '').replace(/<wbr>/gm, '').replace(/<span class="quote">/gm, '').replace(/<\/span>/gm, '');
				
				const embed = new Discord.RichEmbed().setTitle(jsonpost.sub).setFooter(jsonpost.now).setDescription(text).setURL('https://boards.4cha' + thread).setAuthor(jsonpost.name);
				if (jsonpost.hasOwnProperty('ext')) {
					var fileUrl = 'https://is2.4chan.org/' + board + '/' + jsonpost.tim + jsonpost.ext;
					if (jsonpost.ext.toLowerCase().charAt(1) === 'w') {
						message.channel.send(embed).then(message.channel.send(fileUrl));

					} else {
						embed.setImage(fileUrl);
						message.channel.send(embed);
					}
				} else {
					message.channel.send(embed);
				}

			});
		}
	if (message.content.toLowerCase().startsWith('b!')) {
		var beaboMessage = message.content.substring(2);

		
		

		/*if (beaboMessage.substring(0, 4) === '!gb ') {
		giantbomb(message, beaboMessage);
		}*/
		if (message.channel.hasOwnProperty('guild') && (new RegExp(/set ([a-z]+) ((true)|(false))/gm)).test(beaboMessage) && message.member.hasPermission("ADMINISTRATOR")) {
			var fields = beaboMessage.split(' ');
			herokupg.query("UPDATE permissions SET " + fields[1] + " = " + fields[2] + " WHERE guild_id = \'" + message.guild.id.toString() + "\';", (err, res) => {
				if (!err)
					message.react('✅');
				else
					console.log(err);
			});
		}

		if (beaboMessage.substring(0, 3) === 'pg ' && message.author.id === process.env.BOT_ADMIN) {
			herokupg.query(beaboMessage.substring(3), (err, res) => {
				if (!err)
					console.log(res);
				else
					console.log(err);
			});
		}
		
		timestuff(message, beaboMessage, herokupg);

		if (beaboMessage.toLowerCase().startsWith("nirvanna ")) {
			var word = message.cleanContent.substring(message.cleanContent.indexOf(" ")).toLowerCase().trim();
			var textCanvas = new Canvas.createCanvas(600, 300);
			var ctx = textCanvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.rect(0, 0, 600, 300);
			ctx.fill();
			ctx.font = '60px "Cooper Black"';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("nirvanna", 300, 90);
			ctx.fillText("the band", 300, 150);
			ctx.fillText("the " + word, 300, 210);
			message.channel.send({
				files: [{
						attachment: textCanvas.toBuffer(),
						name: 'nirvanna.png'
					}
				]
			});
		}

		if (beaboMessage.toLowerCase().startsWith("jeopardy ")) {
			var word = message.cleanContent.substring(message.cleanContent.indexOf(" ")).trim().toUpperCase() + '\u200B';
			var textCanvas = new Canvas.createCanvas(1280, 720);
			var ctx = textCanvas.getContext("2d");
			ctx.fillStyle = "blue";
			ctx.rect(0, 0, 1280, 720);
			ctx.fill();
			ctx.font = '80px "Jeopardy"';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			ctx.shadowColor = "black";
			ctx.shadowOffsetX = 10; // integer
			ctx.shadowOffsetY = 10; // integer
			ctx.shadowBlur = 10; // integer
			var words = word.match(/.{1,22}\W/gm);

			for (var i = 0; i < words.length; ctx.fillText(words[i], 640, (i * 120) - ((words.length - 1) * 60) + 360), i++);

			message.channel.send({
				files: [{
						attachment: textCanvas.toBuffer(),
						name: 'jeopardy.png'
					}
				]
			});
		}

		if (beaboMessage.toLowerCase().startsWith("sunny ") || beaboMessage.toLowerCase().startsWith("iasip ")) {
			var word = '\"' + message.cleanContent.substring(message.cleanContent.indexOf(" ")).trim() + '\"';
			var textCanvas = new Canvas.createCanvas(1280, 720);
			var ctx = textCanvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.rect(0, 0, 1280, 720);
			ctx.fill();
			ctx.font = '60px "Textile"';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var words = word.match(/.{1,36}\W/gm);

			for (var i = 0; i < words.length; ctx.fillText(words[i], 640, (i * 120) - ((words.length - 1) * 60) + 360), i++);
			message.channel.send({
				files: [{
						attachment: textCanvas.toBuffer(),
						name: 'sunny.png'
					}
				]
			});
			if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel) {
				herokupg.query("SELECT voice FROM permissions WHERE guild_id = \'" + message.guild.id.toString() + "\';", async function (err, res) {
					if (res.rows[0].voice) {
						const connection = await message.member.voiceChannel.join();
						const dispatcher = connection.playFile('./sunny.mp3');
						dispatcher.setVolume(0.2); // half the volume

						dispatcher.on('end', () => {
							message.guild.voiceConnection.channel.leave();
						});
					}
				});
			}

		}

		if (beaboMessage.toLowerCase().startsWith("supreme ")) {
			var word = message.cleanContent.substring(message.cleanContent.indexOf(" ")).trim();
			var textCanvas = new Canvas.createCanvas((110 * word.length), 220);
			var ctx = textCanvas.getContext("2d");
			ctx.fillStyle = '#DA2727';
			ctx.fillRect(0, 0, (110 * word.length), 220);
			//ctx.fill();
			ctx.font = '180px "Supreme"';
			ctx.fillStyle = "white";
			ctx.textAlign = "left";
			ctx.fillText(word, 55, 160);
			message.channel.send({
				files: [{
						attachment: textCanvas.toBuffer(),
						name: 'supreme.png'
					}
				]
			});
		}

		if (new RegExp(/eb(n|m|s|b|p|N|M|S|B|P)\W/gm).test(beaboMessage.substring(0, 4))) {
			const flavors = ['plain', 'mint', 'strawberry', 'banana', 'peanut'];
			const flavorstring = 'nmsbp'
				var Flavor = flavors[flavorstring.indexOf(beaboMessage.charAt(3).toLowerCase())];
			var Text = message.cleanContent.substring(6);
			var textCanvas = new Canvas.createCanvas(608, 256);
			textCanvas.imageSmoothingEnabled = false;
			EarthBoundText.preload_assets();
			EarthBoundText.render({
				canvas: textCanvas,
				flavor: Flavor,
				text: Text,
				Message: message
			});
		}

		if (new RegExp(/eb\W/gm).test(beaboMessage.substring(0, 3))) {
			var Text = message.cleanContent.substring(5);
			var textCanvas = new Canvas.createCanvas(608, 256);
			textCanvas.imageSmoothingEnabled = false;
			EarthBoundText.preload_assets();
			EarthBoundText.render({
				canvas: textCanvas,
				flavor: 'plain',
				text: Text,
				Message: message
			});
		}

		if (new RegExp(/ut\W/gm).test(beaboMessage.substring(0, 3))) {
			var text = message.cleanContent.substring(5);
			message.channel.send({
				embed: {
					image: {
						url: 'https://www.demirramon.com/gen/undertale_box.png?text=' + encodeURI(text)
					}
				}
			});
		} else {
			if ((beaboMessage).match(/ut_.+\W/gm)) {
				var characterText = message.cleanContent.substring(message.cleanContent.indexOf('t') + 2);
				var characterexp = characterText.substring(0, characterText.search(/\W/gm)).split('_');
				var character = characterexp[0];
				var text = characterText.substring(characterText.search(/\W/gm) + 1);
				if (characterexp.length <= 1) {
					message.channel.send({
						embed: {
							image: {
								url: 'https://www.demirramon.com/gen/undertale_box.png?character=' + encodeURI(character) + '&text=' + encodeURI(text)
							}
						}
					});
				} else {
					var expression = characterexp[1];
					message.channel.send({
						embed: {
							image: {
								url: 'https://www.demirramon.com/gen/undertale_box.png?character=' + encodeURI(character) + '&expression=' + encodeURI(expression) + '&text=' + encodeURI(text)
							}
						}
					});
				}
			}
		}

		

		if (beaboMessage.substring(0, 8) === 'commands' || beaboMessage.substring(0, 4) === 'help') {
			helpMessage(message);
		}

	}
});

client.on('guildMemberAdd', member => {
herokupg.query("SELECT greeting FROM permissions WHERE guild_id = \'" + member.guild.id.toString() + "\';", async function (err, res) {
						if (res.rows[0].greeting) {
							const channel = member.guild.channels.find('name', 'general');
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Beabo bee Beabo!!! (Welcome to the server, ${member})`).then().catch(console.error);
						}
					});
// Send the message to a designated channel on a server:

});

client.login(process.env.BOT_TOKEN);
