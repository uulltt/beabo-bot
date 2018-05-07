
const Discord = require('discord.js');
const nfgUrl = require('./nfgUrl.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setUsername("NagaevskyTron 60");
});

client.on('message', message => {
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
	
	} else if (new RegExp(/font![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8))) {
		var arg = message.content.substring((4) + 4) + '\u200B';
		var game = message.content.substring(5, 3 + 4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(10) + '\u200B';
		var style = message.content.charAt((3) + 4);
		var size = message.content.charAt((4) + 4);
		var game = message.content.substring(5, 3 + 4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameSSText(game, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt((4) + 4);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game === 'ddr')
			game = 'DDR';
		if (game === 'kof') {}
		else {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 6); i++) {

				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.gameSSText(game, style, size, args[i])
							}
						}

					}).then(console.log).catch(console.error);
			}
		}
	} else if (new RegExp(/font![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 6); i++) {

					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.gameText(game, args[i])
								}
							}
						})
				}
	} else if (new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(12) + '\u200B';
		var style = message.content.charAt(9);
		var size = message.content.charAt(10);
		var game = message.content.substring(5, 9);
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 6); i++) {

					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.gameSSText(game, style, size, args[i])
								}
							}
						})
				}
	} else if (new RegExp(/font![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(13) + '\u200B';
		var style = message.content.charAt(10);
		var size = message.content.charAt(11);
		var game = message.content.substring(5, 10);
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameSSText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);

		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(14) + '\u200B';
		var style = message.content.charAt(11);
		var size = message.content.charAt(12);
		var game = message.content.substring(5, 11);
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameSSText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(15) + '\u200B';
		var style = message.content.charAt(12);
		var game = message.content.substring(5, 12);
		var size = message.content.charAt(13);

		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameSSText(game, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8))) {
		var arg = message.content.substring((4) + 4) + '\u200B';
		var game = message.content.substring(5, 3 + 4);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, text)
						}
					}
				}).then(console.log).catch(console.error);

		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(10) + '\u200B';
		var style = message.content.charAt((3) + 4);
		var size = message.content.charAt((4) + 4);
		var game = message.content.substring(5, 3 + 4);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
						}
					}

				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, text)
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt((4) + 4);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'ddr')
			game = 'DDR';
		if (game === 'kof') {}
		else {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 6); i++) {
				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
							}
						}
					}).then(console.log).catch(console.error);
			}
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 6); i++) {
					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.bubble(game, dir, pos, text)
								}
							}
						}).then(console.log).catch(console.error);
				}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(12) + '\u200B';
		var style = message.content.charAt(9);
		var size = message.content.charAt(10);
		var game = message.content.substring(5, 9);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'njgd')
			game = 'niga'
		if (game === 'sfa3')
			game = 'sfz3'
		var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 6); i++) {
					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
								}
							}
						})
				}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, text)
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(13) + '\u200B';
		var style = message.content.charAt(10);
		var size = message.content.charAt(11);
		var game = message.content.substring(5, 10);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game === 'kof2k')
			game = 'KoF2k';

		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
						}
					}

				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, text)
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(14) + '\u200B';
		var style = message.content.charAt(11);
		var size = message.content.charAt(12);
		var game = message.content.substring(5, 11);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
						}
					}

				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, text)
						}
					}
				}).then(console.log).catch(console.error);

		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(15) + '\u200B';
		var style = message.content.charAt(12);
		var game = message.content.substring(5, 12);
		var size = message.content.charAt(13);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.SSbubble(game, dir, pos, style, size, text)
						}
					}

				}).then(console.log).catch(console.error);
		}
	}

	if (new RegExp(/font!kof97\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 6); i++) {
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
		message.channel.send('font commands\nThis list is incomplete. To find a font not listed, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.\n' +
			'\nreplace font with b(u or d)(two digits) to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!any game name followed by two digits - that game with the first digit determining font style and second digit determining font size\n' +
			'font!arcade - classic arcade\nfont!bios - BioShipPaladin\nfont!chiki - chiki chiki boys\nfont!ddcrew - DDCrew\nfont!DDR - Dance Dance Revolution\nfont!ddux - dynamite dux\nfont!fz - fantasy zone\nfont!gain - gain ground\nfont!garou - fatal fury\n' +
			'font!gradius - shoot the core\nfont!guar - guardians\nfont!kais - kaiser knuckle\nfont!kiki - kiki kaikai\nfont!kof97 - king of fighters 97\nfont!kof2k - king of fighters 2000\nfont!kof2k1 - king of fighters 2001\n' +
			'font!kof2k2 - king of fighters 2002\nfont!kof2k3 - king of fighters 2003\nfont!mt - major title\nfont!moma = monster maulers\nfont!namco2 - namco classic gradient\nfont!njgd - ninja gaiden\nfont!pabom - panic bomber\nfont!paro - parodius da\n' +
			'font!pubu - puzzle bobble\nfont!quake - quack\nfont!raph - rapid hero\nfont!robot - robotron\nfont!rtl - rtype leo\nfont!sexy - parodius\nfont!sf2 - street fighter 2\nfont!ssf2 - super street fighter 2\nfont!sfz3 or !sfa3 - street fighter zero\alpha 3\nfont!simp - the simpsons\n' +
			'font!sold - soldam\nfont!tetris - tetris (sega)\nfont!vict - victory road\n\nother commands\n!list or !todo - splits discord message into a to-do list');
	}

});

client.login(process.env.BOT_TOKEN);
