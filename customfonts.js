const Discord = require('discord.js');
var fs = require('fs');
var concat = require('./concat.js');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const crashfontString = alphabet + '0123456789.:! ';
const metalslugString = ' ?!' + alphabet + '0123456789.';
const mario64String = '1234567890' + alphabet + ' ?\'\".,%&!⭐:';
const wariowareString = alphabet.toUpperCase() + '0123456789 ?+-=#✏$^<%&⭐>/' + alphabet + ',.:;\'\"()!';
const puyoString = '0123456789' + alphabet + '. ';
const mk2String = '**1234567890 -\'' + alphabet + '!.,';
const eccoString = alphabet + ' .:,!?\'';

module.exports = (message) => {
	if (new RegExp(/[Ff]ont!crash\W/gm).test(message.cleanContent.substring(0, 11)) && message.cleanContent.length > 11) {
		var text = message.cleanContent.substring(11).toLowerCase().replace(/[^a-z0-9\.!\:\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < Math.min(texts.length, 5); t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./crashfont/crashfont_' + (crashfontString.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'crash.png'}]
					});
				});
			}
				});
			}
		}
	}
	if (new RegExp(/[Ff]ont!wario\W/gm).test(message.cleanContent.substring(0, 11)) && message.cleanContent.length > 11) {
		var text = message.cleanContent.substring(11).replace(/[^A-Za-z0-9\.!\:\n\?'",\+\-= %&;:\(\)⭐✏]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; cursor++) {
				paths[cursor] = fs.readFileSync('./warioware/warioware_' + (wariowareString.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png');
			}
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'warioware.png'}]
					});
				});
			}
				});
			}
		}
	}
	if (new RegExp(/[Ff]ont!mario64\W/gm).test(message.cleanContent.substring(0, 13)) && message.cleanContent.length > 13) {
		var text = message.cleanContent.substring(13).toLowerCase().replace(/[^a-z0-9\.!\n\?'",: %&⭐]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./mario64/mario64_' + (mario64String.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'mario64.png'}]
					});
				});
			}
				});
			}
		}
	}
	if (new RegExp(/[Ff]ont!ms\W/gm).test(message.cleanContent.substring(0, 8)) && message.cleanContent.length > 8) {
		var text = message.cleanContent.substring(8).toLowerCase().replace(/[^a-z0-9\?!\n\. ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./metalslug/metalslug_' + (metalslugString.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'metalslug.png'}]
					});
				});
			}
				});
			}
			
			
		}
	}
	if (new RegExp(/[Ff]ont!mk2\W/gm).test(message.cleanContent.substring(0, 9)) && message.cleanContent.length > 9) {
		var text = message.cleanContent.substring(9).toLowerCase().replace(/[^a-z0-9\-\.,'!\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./mk2/mk2_' + (mk2String.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'mk2.png'}]
					});
				});
			}
				});
			}
		}
	}
	if (new RegExp(/[Ff]ont!wh2\W/gm).test(message.cleanContent.substring(0, 9)) && message.cleanContent.length > 9) {
		var text = message.cleanContent.substring(9) + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; cursor++) {
				var code = parseInt(texts[t].charCodeAt(cursor)) - 31;
				if (code >= 1 && code <= 90) {
					paths[cursor] = fs.readFileSync('./wh2/wh2_' + (code).toString() + '.png');
				} else {
					paths[cursor] = fs.readFileSync('./wh2/wh2_1.png');
				}
			}
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'wh2.png'}]
					});
				});
			}
				});
			}
		}
	}
	/*if (new RegExp(/[Ff]ont!puyo\W/gm).test(message.cleanContent.substring(0, 10)) && message.cleanContent.length > 10) {
		var text = message.cleanContent.substring(10).toLowerCase().replace(/[^a-z0-9\.\n ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		for (var t = 0; t < Math.min(texts.length, 5); t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./puyo/puyo_' + (puyoString.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 // optional, in px, defaults to 10px
				}, function (err, canvas) {
					message.channel.send({
						files: [{attachment: canvas.toBuffer(),name: 'puyo.png'}]
					});
				});
			}
		}
	}*/
	if (new RegExp(/[Ff]ont!ecco\W/gm).test(message.cleanContent.substring(0, 10)) && message.cleanContent.length > 10) {
		var text = message.cleanContent.substring(10).toLowerCase().replace(/[^a-z\.\n,:\?!' ]/gm, '') + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; paths[cursor] = fs.readFileSync('./ecco/ecco_' + (eccoString.indexOf(texts[t].charAt(cursor)) + 1).toString() + '.png'), cursor++);
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'ecco.png'}]
					});
				});
			}
				});
			}
		}
	}
	if (new RegExp(/[Ff]ont!doom\W/gm).test(message.cleanContent.substring(0, 10)) && message.cleanContent.length > 10) {
		var text = message.cleanContent.substring(10).toUpperCase() + ' ';
		var texts = text.match(/.{1,24}\W/gm);
		var textImages = [];
		var i = 0;
		for (var t = 0; t < texts.length; t++) {
			var paths = [];
			texts[t] = ' ' + texts[t];
			texts[t] = texts[t].replace(/\n/gm, '');
			var cursor = 0;
			for (; cursor < texts[t].length; cursor++) {
				if (texts[t].charCodeAt(cursor) > 31 && texts[t].charCodeAt(cursor) < 96) {
					paths[cursor] = fs.readFileSync('./doom/STCFN0' + (texts[t].charCodeAt(cursor)).toString() + '.png');
				} else {
					paths[cursor] = fs.readFileSync('./doom/STCFN032.png');
				}
			}
			if (cursor === texts[t].length) {
				concat({
					images: paths, margin: 0 
				}, function (err, canvas) {
					
					textImages[i] = canvas.toBuffer();
					i++;
					if (textImages.length === texts.length) {
				concat.v({
					images: textImages, margin: 0 
				}, function (err2, canvas2) {
					message.channel.send({
						files: [{attachment: canvas2.toBuffer(),name: 'doom.png'}]
					});
				});
			}
				});
			}
		}
	}
}