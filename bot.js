
const Discord = require('discord.js');
const client = new Discord.Client();
var fonts = require('./fonts.js');
var music = require('./music.js');
var pics = require('./pics.js');
var quiz = require('./quiz.js');
var textboxes = require('./textboxes.js');
var Tesseract = require('tesseract.js')
var request = require('request').defaults({
		encoding: null
	});

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
	/*var guilds = client.guilds.array();
	for(var i = 0; i < guilds.length; i++){
	client.guilds.array()[i].me.setNickname('Bea-boo');
	}*/
});

client.on('guildCreate', (guild) => {
	herokupg.query("INSERT INTO permissions (guild_id, voice, picsglobal, greeting) VALUES (\'" + guild.id + "\',false,false,false) ON CONFLICT (guild_id) DO NOTHING;", (err, res) => {
		if (!err)
			console.log(res);
		else
			console.log(err);
	});
});

var lines = [" beabo", " bee", " bii", " be", " beeb", " bibi"];

var servers = {};

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

function helpMessage(message) {
	message.author.createDM().then(chnl => {
						    chnl.send('http://ultdev.tumblr.com/beabo', {
		embed: {
			fields: [{
					name: 'Album Embedding (b!pics followed by)',
					value: 'twitter, imgur, or tumblr album - posts the rest of the images from that album\na link to a youtube vid - gets the thumbnail of that youtube vid\na jpg image on the web - gets the EXIf data of that image\nmention a user - get user\'s avatar image\ngelbooru/e621/e926/vinebooru/grognard/vidyart/etc. link - posts linked image from that booru'
				}, {
					name: 'Other Embedding Commands',
					value: 'b!vids (tumblr post) - embeds a video post from tumblr\nb!song (tumblr post) - embeds an audio post from tumblr (with its album art)\nb!thread (twitter link) - links to threadreaderapp version of linked twitter thread\n'
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
					` + '`b!ut_[character name]` - creates an Undertale text box with that character (i.e. b!utsans [Hey guys it\'s me Sans Undertale])\n`b!ut_[character name]_[expression]` - same as above but uses a specific expression for that character (i.e. b!utundyne_funny)'
				}, {
					name: 'More Text Box Commands',
					value: `b!jeopardy - makes a Jeopardy answer screen with user input 
b!supreme - supreme logo generator
b!sunny - generates an always sunny title card. also works with b!iasip
b!goosebumps (w/ image attachment) - generates a goosebumps cover with the attached image. first typed line is the title, every line after is the tagline.`
				}, {
					name: "Transcription commands",
					value: "b!transcribe (w/ image attachment) - transcribes text from that image into english plaintext\nb!transcribe-(eng/spa/fra/por/jpn/kor/chi_sim/chi_tra) - transcribes text from image attachment into given language parameter"
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
	});
}
var messageNum = 0;
var messageCount = 150;
const steamlink = 'https://store.steampowered.com/app/';
const steamgames = ['514340', '514340', '514340', '658150', '658150', '522490', '598640'];
const favegames = [steamlink + steamgames[0], steamlink + steamgames[1], steamlink + steamgames[2], steamlink + steamgames[3], steamlink + steamgames[4], steamlink + steamgames[5], steamlink + steamgames[6], 'https://dustinbragg.itch.io/yo-noid-was-ahead-of-its-time']
const webcomics = ['http://dreamrise-comic.com', 'http://endlesshallscomic.tumblr.com', 'http://www.monster-lands.com'];
client.on('message', async message => {
	if ((message.content.toLowerCase().includes('@y\'all') || message.content.toLowerCase().includes('@yall')) && !(new RegExp(/`[^`]*@y('?)all[^`]*`/gm)).test(message.content.toLowerCase())) {
		if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel) {
			message.channel.send(message.member.voiceChannel.members.array().map(function (item) {
					return '<@' + item.id + '>';
				}).filter(function (item, pos, self) {
					return self.indexOf(item) == pos;
				}).toString())
		}
	}
	if (message.author.id !== client.user.id) {
		messageNum++;
		if (messageNum >= messageCount) {
			if (Math.random() <= 0.33) {
				message.channel.send(beeb()).then().catch(console.error);
				if (messageCount < 200)
					messageCount += 10;

			} else {
				if (messageCount > 100)
					messageCount -= 10;

			}
			messageNum = 0;
		}
	}

	if ((message.cleanContent.toLowerCase().startsWith("thank") || message.cleanContent.toLowerCase().startsWith("thn")) && message.cleanContent.toLowerCase().match(/th(a?)(n?)(x|(k(( (((yo)?)u|(ya(h?))))|s)))(,?) (@?)beabo/gm)) {
		if (Math.random() <= 0.6) {
		if (Math.random() <= 0.5){
			message.channel.send('Beabo bii! :+1:');
		} else {
		message.react('👍');
		}
		}

	}
	if (message.content === "b!counter" && message.author.id == process.env.BOT_ADMIN) {
		message.channel.send(messageNum.toString());

	}
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
	if (message.author.id !== client.user.id && (message.cleanContent.toLowerCase().match(/(bii)|(beeb)/gm)) && (!message.cleanContent.toLowerCase().match(/[cdfghjklmnpqrstuvwxyz0-9]/gm) || (message.cleanContent.toLowerCase().match(/:[cdfghjklmnpqrstuvwxyz0-9]/gm) && !message.cleanContent.toLowerCase().match(/[cdfghjklmnpqrstuvwxyz0-9]./gm)))) {

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
						if (Math.random() < 0.5){
							message.channel.send("bee bee biiiii! :heart:");
						} else {
						var hearts = '♥💕💞';
						message.react('💕');
						}
						}
					});
				} else {
					if (Math.random() < 0.5){
							message.channel.send("bee bee biiiii! :heart:");
						} else {
						var hearts = '♥💕💞';
						message.react('💕');
						}
				}
			} else if (message.content.toLowerCase().includes("help")) {
				helpMessage(message);
			} else if (message.content.toLowerCase().match(/w(h?)(a|u)t((('?)s)|( is)) (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a)(\?)?/gm) || message.content.toLowerCase().match(/w(h?)(a|u)t (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a) ((should i (get|buy|play|dl|download))|(is (yo)?ur fav((e|orite)?)))(\?)?/gm)) {
				message.channel.send(favegames[(Math.floor(Math.random() * ((message.content.toLowerCase().includes("steam") || message.content.toLowerCase().includes("buy")) ? 7 : 8)))] + '/');
			} else if (message.content.toLowerCase().match(/w(h?)(a|u)t ((are)|r) (yo)?ur fav((e|orite)?) (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a)s(\?)?/gm) || message.content.toLowerCase().match(/w(h?)(a|u)t (steam|pc|computer|video|vid(y|j)a)?( )?((ga([me]{2}))|vid(y|j)a)s ((should i (get|buy|play|dl|download))|((r|(are)) (yo)?ur fav((e|orite)?))|(do (yo)?u li([ek]{2})))(\?)?/gm)) {
				var games = favegames[0] + '/\n' + favegames[3] + '/\n' + favegames[5] + '/\n' + favegames[6] + '/\n'
					if (!message.content.toLowerCase().includes("steam") && !message.content.toLowerCase().includes("buy")) {
						games += favegames[7] + '/'
					}
					message.channel.send(games);
			} else if (message.content.toLowerCase().match(/w(h?)(a|u)t((('?)s)|( is)) (yo)?ur fav((e|orite)?) ((web(( |(\-))?))?)(comic)(\?)?/gm) || message.content.toLowerCase().match(/w(h?)(a|u)t ((web(( |\-)?))?)(comic) is (yo)?ur fav((e|orite)?)(\?)?/gm)) {
				message.channel.send(webcomics[(Math.floor(Math.random() * (3)))] + '/');
			} else {

				if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel && message.guild.voiceConnection == null) {
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

	fonts(message);
	pics(message, message.content, herokupg);
	quiz(message, message.content.toLowerCase());
	music(client, message, message.content, herokupg);
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

	if (message.content.includes('vocaroo.com/i/')) {
		var vocId = message.content.substring(content.indexOf('/i/') + 3).match(/[A-Za-z0-9]+/gm)[0];
		request.get('https://vocaroo.com/media_command.php?media=' + vocId + '&command=download_mp3', function (err, res, body) {
			message.channel.send({
				files: [{
						attachment: body,
						name: vocId + '.mp3'
					}
				]
			}).then().catch(console.error);
		});
	}

	if (message.content.toLowerCase().startsWith('b!')) {
	if (beaboMessage.toLowerCase() == "test"){
	message.channel.send("?en Hola");
	
	}
		var beaboMessage = message.content.substring(2);
		
		if ((beaboMessage.toLowerCase().startsWith("transcribe")) && message.attachments.array().length > 0 && message.attachments.array()[0].width > 0 && message.attachments.array()[0].url.toLowerCase().match(/\.((png)|(jp(e?)g))/gm)){
		request.get(message.attachments.array()[0].url, function(err, res, body){
		message.channel.send("(one moment please)");
		if (beaboMessage.toLowerCase().match(/transcribe-[a-z_]+/gm)){
		Tesseract.recognize(body, {lang: beaboMessage.toLowerCase().match(/-[a-z_]+/gm)[0].substring(1)})
         .progress(function  (p) { console.log('progress', p)    })
         .then(function (result) { if (result.text.length > 2048){
			 message.channel.send( {embed : { description : result.text.substring(0, 2048) }});
		 } else {
		 message.channel.send ( {embed : {description: result.text }});
		 }
		 })
		} else {
			Tesseract.recognize(body)
         .progress(function  (p) { console.log('progress', p)    })
         .then(function (result) { if (result.text.length > 2048){
			 message.channel.send( {embed : { description : result.text.substring(0, 2048) }});
		 } else {
		 message.channel.send ( {embed : {description: result.text }});
		 }
		 })
			
		}
		});
		
		}
		if (message.channel.hasOwnProperty('guild') && (new RegExp(/set ([a-z]+) ((true)|(false))/gm)).test(beaboMessage) && message.member.hasPermission("ADMINISTRATOR")) {
			var fields = beaboMessage.split(' ');
			herokupg.query("UPDATE permissions SET " + fields[1] + " = " + fields[2] + " WHERE guild_id = \'" + message.guild.id.toString() + "\';", (err, res) => {
				if (!err)
					message.react('✅');
				else
					console.log(err);
			});
		}
		if (beaboMessage.startsWith('day')) {
			message.channel.send('biiiii! 🎉 🎂');
		}
		if (beaboMessage.startsWith('pg ') && message.author.id === process.env.BOT_ADMIN) {
			herokupg.query(beaboMessage.substring(3), (err, res) => {
				if (!err)
					console.log(res);
				else
					console.log(err);
			});
		}
		timestuff(message, beaboMessage, herokupg);
		textboxes(message, beaboMessage);
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
			if (!channel)
				return;
			// Send the message, mentioning the member
			channel.send(`Beabo bee Beabo!!! (Welcome to the server, ${member})`).then().catch(console.error);
		}
	});
	// Send the message to a designated channel on a server:

});

client.login(process.env.BOT_TOKEN);
