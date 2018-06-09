const Discord = require('discord.js');
const customfonts = require('./customfonts.js')
var concat = require('./concat.js');
function gameText(game, style, size, text) {
	if (text.charAt(text.length - 1) === '\n') {
		text = text.substring(0, text.length - 1);
	}
	var request = require('request').defaults({
encoding: null
		});
		request.get('https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(text + '\u200B'), function (err, res, body) {
			return body;
		});
}

function bubbleText(game, dir, pos, style, size, text) {
	if (text.charAt(text.length - 1) === '\n') {
		text = text.substring(0, text.length - 1);
	}
	return 'https://nfggames.com/system/arcade/arcade.php/b-' + dir + '/bp-' + pos + '/y-' + game + '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(text + '\u200B');
}

function font(message) {
	var arg = ' ';
	var game = ' ';
	var style = '0';
	var size = '2';
	var args = [];
	var urls = [];
	for (var i = 0; i < 5; i++) {
		if (new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}\\W', 'gm').test(message.substring(5, 8 + i)) || new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}[0-9]{2}\\W', 'gm').test(message.substring(5, 10 + i))) {
			arg = message.substring(8 + i) + '\u200B';
			game = message.substring(5, 7 + i);
			if (new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}[0-9]{2}\\W', 'gm').test(message.substring(5, 10 + i))) {
				arg = arg.substring(2);
				style = message.charAt(7 + i);
				size = message.charAt(8 + i);
			}
			break;
		}
	}
	if (game === 'kof2k')
		game = 'KoF2k';
	if (game.substring(0, 5) === 'kof2k')
		game = 'KoF2k' + game.charAt(5);
	if (game === 'ketsui')
		game = 'KETSUI';
	if (game === 'ddr')
		game = 'DDR';
	if (game === 'njgd')
		game = 'niga';
	if (game === 'sfa3')
		game = 'sfz3';
	if (game === 'smb3')
		game = 'smar';
	args = arg.match(/.{1,24}\W/gm);
	if (game === 'pubu')
		args = arg.match(/.{1,34}\W/gm);
	if (game === 'sfz3' || game === 'vict' || game === 'moma')
		args = arg.match(/.{1,23}\W/gm);
	if (game !== 'kof' && new RegExp(/[a-zA-Z0-9]+/gm).test(game)) {
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			urls[i] = gameText(game, style, size, args[i]);
		}
	}
	return urls;

}

function bubble(message) {
	var arg = ' ';
	var game = ' ';
	var style = '0';
	var size = '2';
	var args = [];
	var urls = [];
	var pos = message.substring(2, 4);
	var dir = message.charAt(1);
	for (var i = 0; i < 5; i++) {
		if (new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}\\W', 'gm').test(message.substring(5, 8 + i)) || new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}[0-9]{2}\\W', 'gm').test(message.substring(5, 10 + i))) {
			arg = message.substring(8 + i) + '\u200B';
			game = message.substring(5, 7 + i);
			if (new RegExp('[A-Za-z0-9]{' + (2 + i).toString() + '}[0-9]{2}\\W', 'gm').test(message.substring(5, 10 + i))) {
				arg = arg.substring(2);
				style = message.charAt(7 + i);
				size = message.charAt(8 + i);
			}
			break;
		}
	}
	if (game === 'kof'){
		game = 'kof97';
		style = '0';
		size = '2';
	}
	if (game === 'ddr')
		game = 'DDR';
	if (game === 'kof2k')
		game = 'KoF2k';
	if (game.substring(0, 5) === 'kof2k')
		game = 'KoF2k' + game.charAt(5);
	if (game === 'ketsui')
		game = 'KETSUI';
	if (game === 'njgd')
		game = 'niga';
	if (game === 'sfa3')
		game = 'sfz3';
	if (game === 'smb3')
		game = 'smar';
	args = arg.match(/.{1,24}\W/gm);
	if (game === 'pubu')
		args = arg.match(/.{1,34}\W/gm);
	if (game === 'sfz3' || game === 'vict' || game === 'moma')
		args = arg.match(/.{1,23}\W/gm);
	if (new RegExp(/[a-zA-Z0-9]+/gm).test(game)) {
		for (var i = 0; i < args.length; i++) {
			urls[i] = bubbleText(game, dir, pos, style, size, args[i]);
		}
	}
	return urls;

}

module.exports = (message) => {
	if (new RegExp(/[Ff]ont!/gm).test(message.cleanContent.substring(0, 5)) && !(new RegExp(/[Ff]ont!(mk2)\W/gm).test(message.cleanContent.substring(0, 9))) && !(new RegExp(/[Ff]ont!(ecco|puyo|doom)\W/gm).test(message.cleanContent.substring(0, 10))) && !(new RegExp(/[Ff]ont!(mario64)\W/gm).test(message.cleanContent.substring(0, 13))) && !(new RegExp(/[Ff]ont!(crash|wario)\W/gm).test(message.cleanContent.substring(0, 11))) && !(new RegExp(/[Ff]ont!(ms)\W/gm).test(message.cleanContent.substring(0, 8)))) {
		var urls = font(message.cleanContent);
		/*for (var i = 0; i < Math.min(urls.length, 5); i++) {
			if (urls[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: urls[i]
						}
					}
				});
		}*/
		
				concat.v({
					images: urls, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'gamefont.png'}]
					});
				});
			
	}
	
	
	if (new RegExp(/[Bb][du][0-9][0-9]!/gm).test(message.cleanContent.substring(0, 5)) && !(new RegExp(/[Bb][du][0-9][0-9]!kof97\W/gm).test(message.cleanContent.substring(0, 11)))) {
		var urls = bubble(message.cleanContent);
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
	customfonts(message);
}
