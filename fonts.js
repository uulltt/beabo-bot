const Discord = require('discord.js');
var fs = require('fs');
var concat = require('concat-image');

function gameText (game, style, size, text) {
	if (text.charAt(text.length - 1) === '\n'){
		text = text.substring(0, text.length - 1);
	}
	return 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-' + style + '/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}

function bubbleText (game, dir, pos, style, size, text) {
	if (text.charAt(text.length - 1) === '\n'){
		text = text.substring(0, text.length - 1);
	}
	return 'https://nfggames.com/system/arcade/arcade.php/b-' + dir + '/bp-' + pos + '/y-' + game + '/z-'+ style +'/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const crashfontString = alphabet + '0123456789.:! ';
const metalslugString = ' ?!'+alphabet+'0123456789.';
const mario64String = '1234567890'+alphabet+' ?\'\".,%&!⭐:';
const wariowareString = alphabet.toUpperCase() + '0123456789 ?+-=#✏$^<%&⭐>/'+alphabet+',.:;\'\"()!';
const puyoString = '0123456789'+alphabet+'. ';
const mk2String = '**1234567890 -\''+alphabet+'!.,';

function font (message) {
	var arg = ' ';
	var game = ' ';
	var style = '0';
	var size = '2';
	var args = [];
	var urls = [];
	console.log(new RegExp(/[a-z0-9]{2}\W/gm));
	console.log(new RegExp('[a-z0-9]{2}\W', 'gm'));
	/*if (new RegExp(/[a-z0-9]{2}\W/gm).test(message.substring(5, 8)) || new RegExp(/[a-z0-9]{2}[0-9]{2}\W/gm).test(message.substring(5, 10))) {
		arg = message.substring(8) + '\u200B';
		game = message.substring(5, 7);
		if (new RegExp(/[a-z0-9]{2}[0-9]{2}\W/gm).test(message.substring(5, 10))) {
			arg = arg.substring(2);
			style = message.charAt(7);
			size = message.charAt(8);
		}
	} */if (new RegExp('[a-z0-9]{2}\W', 'gm').test(message.substring(5, 8)) || new RegExp('[a-z0-9]{2}[0-9]{2}\W','gm').test(message.substring(5, 10))) {
		console.log("oh!");
		arg = message.substring(8) + '\u200B';
		game = message.substring(5, 7);
		if (new RegExp('[a-z0-9]{2}[0-9]{2}\W','gm').test(message.substring(5, 10))) {
			arg = arg.substring(2);
			style = message.charAt(7);
			size = message.charAt(8);
		}
	} else if (new RegExp(/[A-Za-z0-9]{3}\W/gm).test(message.substring(5, 9)) || new RegExp(/[A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.substring(5, 11))) {
		arg = message.substring(9) + '\u200B';
		game = message.substring(5, 8);
		if (new RegExp(/[A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.substring(5, 11))){
			arg = arg.substring(2);
			style = message.charAt(8);
			size = message.charAt(9);
		}
	} else if (new RegExp(/[a-z0-9]{4}\W/gm).test(message.substring(5, 10)) || new RegExp(/[a-z0-9]{4}[0-9]{2}\W/gm).test(message.substring(5, 12))) {
		arg = message.substring(10) + '\u200B';
		game = message.substring(5, 9);
		if (new RegExp(/[Ff]ont![a-z0-9]{4}[0-9]{2}\W/gm).test(message.substring(0, 12))) {
			arg = arg.substring(2);
			style = message.charAt(9);
			size = message.charAt(10);
		}	
	} else if (new RegExp(/[a-z0-9]{5}\W/gm).test(message.substring(5, 11)) || new RegExp(/[A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.substring(5, 13))) {
		arg = message.substring(11) + '\u200B';
		game = message.substring(5, 10);
		if (new RegExp(/[A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.substring(5, 13))) {
			arg = arg.substring(2);
			style = message.charAt(10);
			size = message.charAt(11);
		}
	} else if (new RegExp(/[A-Za-z0-9]{6}\W/gm).test(message.substring(5, 12)) || new RegExp(/[A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.substring(5, 14))) {
		arg = message.substring(12) + '\u200B';
		game = message.substring(5, 11);
		if (new RegExp(/[Ff]ont![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.substring(0, 14))) {
			arg = arg.substring(2);
			style = message.charAt(11);
			size = message.charAt(12);
		}
	} else if (new RegExp(/[A-Za-z0-9]{7}\W/gm).test(message.substring(5, 13)) || new RegExp(/[A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.substring(5, 15))) {
		arg = message.substring(13) + '\u200B';
		game = message.substring(5, 12);
		if (new RegExp(/[A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.substring(5, 15))) {
			arg = arg.substring(2);
			style = message.charAt(2);
			size = message.charAt(13);
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
	args = arg.match(/.{1,24}\W/gm);
	if (game === 'pubu')
	args = arg.match(/.{1,34}\W/gm);
	if (game === 'sfz3' || game === 'vict' || game === 'moma')
	args = arg.match(/.{1,23}\W/gm);
	if (game !== 'kof' && new RegExp(/[a-zA-Z0-9]+/gm).test(game)){
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			urls[i] = gameText(game, style, size, args[i]);
		}
	}
	return urls;
	
}

function bubble (message) {
	var arg = ' ';
	var game = ' ';
	var style = '0';
	var size = '2';
	var args = [];
	var urls = [];
	var pos = message.substring(2, 4);
	var dir = message.charAt(1);
	if (new RegExp(/[a-z0-9]{2}\W/gm).test(message.substring(5, 8)) || new RegExp(/[a-z0-9]{2}[0-9]{2}\W/gm).test(message.substring(5, 10))) {
		arg = message.substring(8) + '\u200B';
		game = message.substring(5, 7);
		if (new RegExp(/[a-z0-9]{2}[0-9]{2}\W/gm).test(message.substring(5, 10))) {
			arg = arg.substring(2);
			style = message.charAt(7);
			size = message.charAt(8);
		}
	} else if (new RegExp(/[A-Za-z0-9]{3}\W/gm).test(message.substring(5, 9)) || new RegExp(/[A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.substring(5, 11))) {
		arg = message.substring(9) + '\u200B';
		game = message.substring(5, 8);
		if (new RegExp(/[A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.substring(5, 11))){
			arg = arg.substring(2);
			style = message.charAt(8);
			size = message.charAt(9);
		}
	} else if (new RegExp(/[a-z0-9]{4}\W/gm).test(message.substring(5, 10)) || new RegExp(/[a-z0-9]{4}[0-9]{2}\W/gm).test(message.substring(5, 12))) {
		arg = message.substring(10) + '\u200B';
		game = message.substring(5, 9);
		if (new RegExp(/[a-z0-9]{4}[0-9]{2}\W/gm).test(message.substring(5, 12))) {
			arg = arg.substring(2);
			style = message.charAt(9);
			size = message.charAt(10);
		}		
	} else if (new RegExp(/[a-z0-9]{5}\W/gm).test(message.substring(5, 11)) || new RegExp(/[A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.substring(5, 13))) {
		arg = message.substring(11) + '\u200B';
		game = message.substring(5, 10);
		if (new RegExp(/[A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.substring(5, 13))) {
			arg = arg.substring(2);
			style = message.charAt(10);
			size = message.charAt(11);
		}
	} else if (new RegExp(/[A-Za-z0-9]{6}\W/gm).test(message.substring(5, 12)) || new RegExp(/[A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.substring(5, 14))) {
		arg = message.substring(12) + '\u200B';
		game = message.substring(5, 11);
		if (new RegExp(/[A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.substring(5, 14))) {
			arg = arg.substring(2);
			style = message.charAt(11);
			size = message.charAt(12);
		}
	} else if (new RegExp(/[A-Za-z0-9]{7}\W/gm).test(message.substring(5, 13)) || new RegExp(/[A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.substring(5, 15))) {
		arg = message.substring(13) + '\u200B';
		game = message.substring(5, 12);
		if (new RegExp(/[A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.substring(5, 15))) {
			arg = arg.substring(2);
			style = message.charAt(12);
			size = message.charAt(13);
		}
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
	args = arg.match(/.{1,24}\W/gm);
	if (game === 'pubu')
	args = arg.match(/.{1,34}\W/gm);
	if (game === 'sfz3' || game === 'vict' || game === 'moma')
	args = arg.match(/.{1,23}\W/gm);
	if (game !== 'kof' && new RegExp(/[a-zA-Z0-9]+/gm).test(game)){
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			urls[i] = bubbleText(game, dir, pos, style, size, args[i]);
		}
	}
	return urls;
	
}

module.exports = (message) => {
	if (new RegExp(/[Ff]ont!/gm).test(message.cleanContent.substring(0, 5))&& !(new RegExp(/[Ff]ont!(mk2)\W/gm).test(message.cleanContent.substring(0, 9))) && !(new RegExp(/[Ff]ont!(puyo)\W/gm).test(message.cleanContent.substring(0, 10))) && !(new RegExp(/[Ff]ont!(mario64)\W/gm).test(message.cleanContent.substring(0, 13))) && !(new RegExp(/[Ff]ont!(kof97|crash|wario)\W/gm).test(message.cleanContent.substring(0, 11))) && !(new RegExp(/[Ff]ont!(ms)\W/gm).test(message.cleanContent.substring(0, 8)))) {
	var urls = font(message.cleanContent);
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

if (new RegExp(/[Ff]ont!kof97\W/gm).test(message.cleanContent.substring(0, 11))) {
	var arg = message.cleanContent.substring(11) + '\u200B';
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
if (new RegExp(/[Bb][ud][0-9][0-9]!kof97\W/gm).test(message.cleanContent.substring(0, 11))) {
	var arg = message.cleanContent.substring(11) + '\u200B';
	var dir = message.cleanContent.charAt(1);
	var pos = message.cleanContent.substring(2, 4);
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
if (new RegExp(/[Ff]ont!crash\W/gm).test(message.cleanContent.substring(0, 11)) && message.cleanContent.length > 11){
	var text = message.cleanContent.substring(11).toLowerCase().replace(/[^a-z0-9\.!\:\n ]/gm, '') + ' ';
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

if (new RegExp(/[Ff]ont!wario\W/gm).test(message.cleanContent.substring(0, 11)) && message.cleanContent.length > 11){
	var text = message.cleanContent.substring(11).replace(/[^A-Za-z0-9\.!\:\n\?'",\+\-= %&;:\(\)⭐✏]/gm, '') + ' ';
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
	
	if (new RegExp(/[Ff]ont!mario64\W/gm).test(message.cleanContent.substring(0, 13)) && message.cleanContent.length > 13){
		var text = message.cleanContent.substring(13).toLowerCase().replace(/[^a-z0-9\.!\n\?'",: %&⭐]/gm, '') + ' ';
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
	if (new RegExp(/[Ff]ont!ms\W/gm).test(message.cleanContent.substring(0, 8)) && message.cleanContent.length > 8){
		var text = message.cleanContent.substring(8).toLowerCase().replace(/[^a-z0-9\?!\n\. ]/gm, '') + ' ';
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
		if (new RegExp(/[Ff]ont!mk2\W/gm).test(message.cleanContent.substring(0, 9)) && message.cleanContent.length > 9){
		var text = message.cleanContent.substring(9).toLowerCase().replace(/[^a-z0-9\-\.,'!\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length;paths[cursor] = fs.readFileSync('./mk2/mk2_' + (mk2String.indexOf(texts[t].charAt(cursor))+1).toString() + '.png'), cursor++);
if (cursor === texts[t].length){
	concat({
images: paths,
margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
		message.channel.send({
files: [{
	attachment: canvas.toBuffer(),
	name: 'mk2.png'
}]
});
});	
}
		
		}
	}
	
	if (new RegExp(/[Ff]ont!puyo\W/gm).test(message.cleanContent.substring(0, 10)) && message.cleanContent.length > 10){
		var text = message.cleanContent.substring(10).toLowerCase().replace(/[^a-z0-9\.\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for(var t = 0; t < Math.min(texts.length, 5); t++){
			var paths = [];
			
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
for(;cursor < texts[t].length;paths[cursor] = fs.readFileSync('./puyo/puyo_' + (puyoString.indexOf(texts[t].charAt(cursor))+1).toString() + '.png'), cursor++);
if (cursor === texts[t].length){
	concat({
images: paths,
margin: 0 // optional, in px, defaults to 10px
}, function(err, canvas) {
		message.channel.send({
files: [{
	attachment: canvas.toBuffer(),
	name: 'puyo.png'
}]
});
});	
}
		
		}
	}
}