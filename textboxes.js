const Discord = require('discord.js');
var fs = require('fs');
var Canvas = require('canvas');
var concat = require('./concat.js');
var Image = Canvas.Image;
var Font = Canvas.Font;
var path = require('path');
var EarthBoundText = require('./scripts/lib/ebtext.js');
Canvas.registerFont('./fonts/COOPBL.TTF', {
	family: 'Cooper Black'
});
Canvas.registerFont('./fonts/Futura Std Heavy Oblique.otf', {
	family: 'Supreme'
});

Canvas.registerFont('./fonts/Futura Condensed Medium.otf', {
	family: 'GooseBumps'
});
Canvas.registerFont('./fonts/Textile.ttf', {
	family: 'Textile'
});
Canvas.registerFont('./fonts/Korinna Bold.ttf', {
	family: 'Jeopardy'
});
var request = require('request').defaults({
		encoding: null
	});

module.exports = (message, beaboMessage, herokupg) => {
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
			if (message.channel.hasOwnProperty('guild') && message.member.voiceChannel && message.guild.voiceConnection == null) {
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
		
		if (beaboMessage.toLowerCase().startsWith('hub ')){
		var word = message.cleanContent.substring(message.cleanContent.indexOf(" ")).trim();
		var textCanvas = new Canvas.createCanvas(1280, 450);
			var ctx = textCanvas.getContext("2d");
			ctx.fillStyle = "black";
			ctx.rect(0, 0, 1280, 450);
			ctx.fill();
			ctx.fillStyle = "#F7971D"
			roundRect(ctx, 700, 80, 520, 320, 35, true);
			ctx.fillStyle = "black";
			ctx.font = "550 240px helvetica";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText('hub', 960, 240);
			ctx.fillStyle = "white";
			ctx.textAlign = "right";
			ctx.fillText(word, 640, 240);
		message.channel.send({
				files: [{
						attachment: textCanvas.toBuffer(),
						name: 'hub.png'
					}
				]
			});
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
		
		if (message.content.toLowerCase().startsWith('b!goosebumps')){
		message.channel.fetchMessages({limit: 10}).then( (messages) => {
			var url = "";
		if (message.attachments.array().length > 0 && message.attachments.array()[0].width > 0){
			url = message.attachments.array()[0].url
		} else {
		var m = messages.filter(m => (m.attachments.array().length > 0 && m.attachments.array()[0].width > 0) || (m.embeds.length > 0 && m.embeds.image)).first();
		if (m.attachments.array().length > 0){
			url = m.attachments.array()[0].url;
		} else {
			url = m.embeds[0].image.url;
		}
		}
		if (url.length > 0){
		request.get(url, function(err, res, body){
		var img = new Image;
		img.src = body;
		
		concat({
			images: [fs.readFileSync('./goosebumps'+Math.floor(Math.random() * 3).toString()+'.png')], margin: 0
		}, function(err, canvas){
		var img2 = new Image;
			img2.src = canvas.toBuffer();
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 240, 669, 640);
			ctx.drawImage(img2, 0, 0, 669, 960);
			canvas.imageSmoothingEnabled = false;
			ctx.font = '60px "GooseBumps"';
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "Alphabetic";
			if (message.content.length > 13){
			var words = message.content.substring(13).trim().split('\n');
			words[0] = words[0].toUpperCase()
			ctx.fillText(words[0], 335, 910);
			ctx.fillStyle = "black"
			ctx.fillText(message.member.displayName.toUpperCase(), 335, 75);
			ctx.font = '24px "GooseBumps"';
			
			var xOffset = Math.floor((Math.random() * 580)) + 20;
			var yOffset = Math.floor((Math.random() * 500)) + 300;
			for(var i = 1; i < words.length; i++){
			ctx.fillText(words[i], xOffset + 2, yOffset + (i * 24) + 2);
			}
			ctx.fillStyle = "white";
			for(var i = 1; i < words.length; i++){
			ctx.fillText(words[i], xOffset, yOffset + (i * 24));
			}
			}
			message.channel.send({
						files: [{attachment: canvas.toBuffer(),name: 'goosebumps.png'}]
					});
		});
		});
		}
		}).catch(console.error);
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
			console.log(text);
			console.log('https://www.demirramon.com/gen/undertale_box.png?text=' + encodeURI(text))
			request.get('https://www.demirramon.com/gen/undertale_box.png?text=' + encodeURI(text), function(err, res, body){
				message.channel.send({
						files: [{attachment: body,name: 'undertale.png'}]
					});
			});
		} else {
			if ((beaboMessage).match(/ut_.+\W/gm)) {
				var characterText = message.cleanContent.substring(message.cleanContent.indexOf('t') + 2);
				var characterexp = characterText.substring(0, characterText.search(/\W/gm)).split('_');
				var character = characterexp[0];
				var text = characterText.substring(characterText.search(/\W/gm) + 1);
				if (characterexp.length <= 1) {
					request.get('https://www.demirramon.com/gen/undertale_box.png?character=' + encodeURI(character) + '&text=' + encodeURI(text), function(err, res, body){
				message.channel.send({
						files: [{attachment: body,name: 'undertale.png'}]
					});
			});
					
				} else {
					var expression = characterexp[1];
					request.get('https://www.demirramon.com/gen/undertale_box.png?character=' + encodeURI(character) + '&expression=' + encodeURI(expression) + '&text=' + encodeURI(text), function(err, res, body){
				message.channel.send({
						files: [{attachment: body,name: 'undertale.png'}]
					});
			});
				}
			}
		}	
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}