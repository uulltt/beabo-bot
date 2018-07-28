
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
					name: ':camera: Commands (b!pics followed by)',
					value: 'twitter, imgur, or tumblr album - posts the rest of the images from that album\na jpg image on the web - gets the EXIf data of that image\na link to a youtube vid - gets the thumbnail of that youtube vid'
				}, {
					name: 'Other Media Commands',
					value: 'b!song (tumblr or vocaroo post) - embeds the audio from that tumblr/vocaroo post\nb!vids (tumblr post) - embeds the video from that tumblr post\nb!4chan (link to 4chan post) - embeds said 4chan post'
				}, {
					name: 'Font Commands',
					value: 'To find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
					'\nfont!gamename your text here - creates image of your text in the game\'s font\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size.\n'
					 + 'Custom Fonts: font!crash, font!ms (metal slug), font!mario64, font!wario (warioware), font!puyo (Puyo Puyo), font!mk2 (mortal kombat 2), font!doom, font!ecco, font!wh2 (world heroes 2), font!ddpt (dodonpachi tall font), font!rr (road rash font), font!mvc (marvel vs capcom 1)'
				}, {
					name: 'Text Box Commands',
					value: 'b!eb your text here - creates EarthBound-style text box.\nb!eb(n,m,s,b,or p) - creates text box in that specific style. default is n.'
					 + '\nb!pkmn text - Pokemon Text box\nb!sb text - Skeleton Boomerang Text Box\nb!ut text - creates Undertale text box\nb!utcharactername text - creates Undertale text box with that character (i.e. b!utsans Hey guys it\'s me Sans Undertale\nb!utcharacter_expression text - same but uses a specific expression for that character (i.e. b!utundyne_funny)'
				}, {
					name: 'More Text Box Commands',
					value: 'b!jeopardy text - make Jeopardy clue screen\nb!nirvanna word - nirvanna the band the word\nb!supreme word - supreme logo generator\nb!sunny or b!iasip sentence - always sunny title card generator\nb!wof - makes a wheel of fortune meme'
				}, {
					name: 'Local Time Commands',
					value: 'b!time cityname - gets local time of that city\nb!settime cityname - sets the local time for you based on the given city name\nb!gettime @user - fetches the local time for that user based on the city they set for themself\n'
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
				*/}
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
	
	if (message.content.includes('@everyone')){
		var chance = Math.floor(Math.random() * 100);
		if (chance === 0){
			message.channel.send('***BEEEEEEEEEEEE!!!***', {files: [{
      attachment: './everyone.png',
      name: 'everyone.png'
			}]}).then().catch(console.error);
		}
	}
	if (message.content.toLowerCase().includes('despacito 2')){
		var chance = Math.floor(Math.random() * 20);
		if (chance === 0){
			message.channel.send({files: [{
      attachment: './despabeabo2.png',
      name: 'despabeabo2.png'
			}]}).then().catch(console.error);
		}
	}
	
	if (message.content.toLowerCase() === "right about now" || message.content.toLowerCase() === "check it out now"){
			message.channel.send('\"the funk soul brother\"').then().catch(console.error);
	}
	if (message.content.toLowerCase() === "right about now, the funk soul brother"){
			message.channel.send('\"check it out now, the funk soul brother\"').then().catch(console.error);
	}
	if (message.content.toLowerCase() === "check it out now, the funk soul brother"){
			message.channel.send('\"right about now, the funk soul brother\"').then().catch(console.error);
	}
	if (message.author.id !== client.user.id && (message.cleanContent.toLowerCase().match(/(bii)|(beeb)/gm)) && !message.cleanContent.toLowerCase().match(/[cdfghjklmnpqrstuvwxyz]/gm)) {
		message.channel.send("Biii!!!!! biiiiiii!! :revolving_hearts:");
	} else {
		if (message.isMentioned(client.user) && !message.cleanContent.toLowerCase().includes('🖕') && !(message.cleanContent.toLowerCase().match(/(not (cu|valid))|(do( ?)n(('|o)?)t l(o|u)v)/gm) && (message.cleanContent.toLowerCase().match(/((l(o|u)v(e?))|(<3)) (((yo)?)u|(ya(h?)))/gm) || message.cleanContent.toLowerCase().match(/c(u+)te/gm) || message.cleanContent.toLowerCase().includes("best") || message.cleanContent.toLowerCase().includes("valid"))) && !(message.cleanContent.toLowerCase().match(/((f(u|(ri))([ck]{1,2}))|(hate)) (yo)?u/gm) || message.cleanContent.toLowerCase().match(/(yo)?u su([ck]{1,2})/gm))) {

			if (!message.cleanContent.toLowerCase().match(/(not (cu|valid))|(do( ?)n(('|o)?)t l(o|u)v)/gm) && (message.cleanContent.toLowerCase().match(/((l(o|u)v(e?))|(<3)) (((yo)?)u|(ya(h?)))/gm) || message.cleanContent.toLowerCase().match(/c(u+)te/gm) || message.cleanContent.toLowerCase().includes("best") || message.cleanContent.toLowerCase().includes("valid"))) {
				message.channel.send("bee bee biiiii! :heart:");
			}
				else if (message.content.toLowerCase().includes("help")) {
					helpMessage(message);
				} else if (message.content.toLowerCase().match(/w(h?)(a|u)t('?)(s?) (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a)(\?)?/gm)) {
						message.channel.send(favegames[(Math.floor(Math.random() * (message.content.toLowerCase().includes("steam") ? 7 : 8)))] + '/');
					} else if (message.content.toLowerCase().match(/w(h?)(a|u)t('?)(s?) (yo)?ur fav((e|orite)?) ((web(( |(\-))?))?)(comic)(\?)?/gm)) {
							message.channel.send(webcomics[(Math.floor(Math.random() * (3)))] + '/');
						} else {
								message.channel.send(beeb()).then().catch(console.error);
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
								var dir = getDirections(result);
								message.channel.send({
									embed: {
										title: ':motorway: **' + ori + '** to **' + dest + '**',
										description: dir.length <= 2048 ? dir : 'Too many directions. Just Google it.'
									}
								});
							}).catch(console.error);
						}
						movies(message, beaboMessage);
						pics(message, beaboMessage);
						if (beaboMessage.startsWith("!4chan ") && beaboMessage.includes('boards.4chan.org/')) {
							var thread = beaboMessage.substring(beaboMessage.indexOf('.4cha') + 5);
							var post = thread.match(/[0-9][0-9]+/gm)[0];
							if (thread.includes('#p')){
								post = thread.substring(thread.indexOf('#p')+2).match(/[0-9]+/gm)[0];
								thread = thread.substring(0, thread.indexOf('#p'));
								
							}
							var request = require('request').defaults({
									encoding: null
								});
							request.get(encodeURI('https://a.4cd' + thread + '.json'), function (err, res, body) {
								var posts = JSON.parse(body.toString());
								var jsonpost = posts.posts.filter(function (item){
									return item.no.toString() === post;
								})[0];
								var text = jsonpost.com.replace(/<br>/gm, '\n').replace(/&gt;/gm, '>').replace(/<a href="#p[0-9]+" class="quotelink">/gm, '').replace(/<\/a>/gm, '').replace(/<wbr>/gm, '').replace(/<span class="quote">/gm, '').replace(/<\/span>/gm, '');
								var board = thread.substring(thread.indexOf('org/')+4);
								board = board.substring(0, board.indexOf('/'));
								if (jsonpost.hasOwnProperty('ext')){
									var fileUrl = 'https://is2.4chan.org/' + board + '/' + jsonpost.tim + jsonpost.ext;
									if (jsonpost.ext.toLowerCase().charAt(1) === 'w'){
										message.channel.send({embed: {
										title: jsonpost.sub,
										description: text,
										footer: {
											text: jsonpost.now
										},
										author: {
											name: jsonpost.name
										},
										url: 'https://boards.4cha' + thread
									}}).then(message.channel.send(fileUrl));
									
									} else {
									message.channel.send({embed: {
										title: jsonpost.sub,
										description: text,
										footer: {
											text: jsonpost.now
										},
										author: {
											name: jsonpost.name
										},
										url: 'https://boards.4cha' + thread,
										image: {
											url : fileUrl
										}
									}});
									}
								} else {
									message.channel.send({embed: {
										title: jsonpost.sub,
										description: text,
										footer: {
											text: jsonpost.now
										},
										author: {
											name: jsonpost.name
										},
										url: 'https://boards.4cha' + thread
									}});
								}
								
								
							});
						}
						if (beaboMessage.startsWith("!rhyme ")) {
							var word = beaboMessage.substring(beaboMessage.indexOf(' ') + 1).replace(/\W/gm, '');
							var request = require('request').defaults({
									encoding: null
								});
							request.get(encodeURI('https://api.datamuse.com/words?rel_rhy=' + word), function (err, res, body) {
								var rhymes = JSON.parse(body.toString()).map(function (item) {
										return ' ' + item.word;
									}).toString();

								message.channel.send({
									embed: {
										title: 'Words that Rhyme with ' + word,
										description: rhymes.length > 2048 ? rhymes.substring(0, 2048) : rhymes,
										footer: {
											text: 'From RhymeZone/Datamuse API'
										}
									}
								});
							});
						}

						/*if (beaboMessage.substring(0, 4) === '!gb ') {
						giantbomb(message, beaboMessage);
						}*/
						
						

						if (beaboMessage.substring(0, 4) === '!pg ' && message.author.id === process.env.BOT_ADMIN) {
							herokupg.query(beaboMessage.substring(4), (err, res) => {
								if (!err)
									console.log(res);
									else
										console.log(err);
								});
							}
							if (new RegExp(/!wof\W/gm).test(beaboMessage.substring(0, 5))) {
								var text = message.cleanContent.substring(6).split('\n');
								var ln = ['', '', '', '', ''];
								for (var i = 0; i < Math.min(5, text.length); i++) {
									ln[i] = encodeURI(text[i]);
								}
								message.channel.send({
									embed: {
										image: {
											url: 'https://www.thewordfinder.com/wof-puzzle-generator/puzzle-thumb.php?bg=1&ln1=' + ln[0] + '&ln2=' + ln[1] + '&ln3=' + ln[2] + '&ln4=' + ln[3] + '&cat=' + ln[4] + '&'
										}
									}
								});
							}
							timestuff(message, beaboMessage, herokupg);

							if (beaboMessage.toLowerCase().startsWith("!nirvanna ")) {
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

							if (beaboMessage.toLowerCase().startsWith("!jeopardy ")) {
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

							if (beaboMessage.toLowerCase().startsWith("!sunny ") || beaboMessage.toLowerCase().startsWith("!iasip ")) {
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
 if (message.member.voiceChannel) {
      const connection = await message.member.voiceChannel.join();
	  const dispatcher = connection.playFile('./sunny.mp3');
	  dispatcher.setVolume(0.4); // half the volume

dispatcher.on('end', () => {
  message.member.voiceChannel.leave();
});
    }
	
								
							}

							if (beaboMessage.toLowerCase().startsWith("!supreme ")) {
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

							if (new RegExp(/!eb(n|m|s|b|p|N|M|S|B|P)\W/gm).test(beaboMessage.substring(0, 5))) {
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

							if (new RegExp(/!eb\W/gm).test(beaboMessage.substring(0, 4))) {
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

							if (new RegExp(/!ut\W/gm).test(beaboMessage.substring(0, 4))) {
								var text = message.cleanContent.substring(5);
								message.channel.send({
									embed: {
										image: {
											url: 'https://www.demirramon.com/gen/undertale_box.png?text=' + encodeURI(text)
										}
									}
								});
							} else {
								if ((beaboMessage).match(/!ut.+\W/gm)) {
									var characterText = message.cleanContent.substring(message.cleanContent.indexOf('t') + 1);
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
							
							

							if (beaboMessage.substring(0, 8) === '!numpad ' && beaboMessage.length > 8) {
								var command = '**' + beaboMessage.substring(8) + '**';
								command = command.replace(/(2)([a-zA-Z\W])/gm, function (match) {
										return "crouching " + match.substring(1);
									}).replace(/1/gm, ':arrow_lower_left:').replace(/2/gm, ':arrow_down:').replace(/3/gm, ':arrow_lower_right:').replace(/4/gm, ':arrow_left:')
									.replace(/7/gm, ':arrow_upper_left:').replace(/8/gm, ':arrow_up:').replace(/9/gm, ':arrow_upper_right:').replace(/6/gm, ':arrow_right:').replace(/5/gm, ' neutral ')
									.replace(/j((u|m|p)?)\./gm, ' jumping ').replace(/cr\./gm, ' crouching ').replace(/cl\./gm, ' close ');
								message.channel.send(command);
							}
							/*if (beaboMessage.substring(0, 8) === '!ZiV-id ') {
							message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + beaboMessage.substring(8) + '#summary');
							}

							if (beaboMessage.substring(0, 11) === '!ZiV-random') {
							message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000) + 2).toString() + '#summary');
							}*/
							
							if (beaboMessage.substring(0, 9) === '!commands' || beaboMessage.substring(0, 5) === '!help') {
								helpMessage(message);
							}
							
						}
					});
					
					/*client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Beabo bee Beabo!!! (Welcome to the server, ${member})`).then().catch(console.error);
});*/


					client.login(process.env.BOT_TOKEN);
