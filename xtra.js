

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

module.exports.pad = (n) => { 
if ( n < 10) 
	return "0" + n.toString();
else
	return n.toString();
}

var lines = [" beabo", " bee", " bii", " be", " beeb"];

module.exports.beeb = () => {
	var len = Math.floor(Math.random() * 6) + 1;
		var sentence = "";
		for(var i = 0; i < len; i++){
			sentence += lines[Math.floor(Math.random() * lines.length)];
			var ex = Math.floor(Math.random() * 3);
			if (ex === 0){
				sentence += "!";
			}
		}
		var hasEmote = Math.floor(Math.random() * 6);
		if (hasEmote === 0){
			return sentence + "! ^^";
		}
		return sentence + "!";
		
	
}

var cityTimezones = require('city-timezones');
var timezone = require('node-google-timezone');
module.exports.cityTime = (message) => {
	var city = message.content.substring(6);
		const citydata = cityTimezones.lookupViaCity(city);
		try {
			var lati = citydata[city === 'London' ? 1 : 0].lat;
			var lngi = citydata[city === 'London' ? 1 : 0].lng;
			var timestamp = Date.now() / 1000;
			timezone.data(lati, lngi, timestamp, function (err, tz) {
				if (!err) {
					var d = new Date(tz.local_timestamp * 1000);
					return d.toDateString() + ' - ' + xtra.pad(d.getHours()) + ':' + xtra.pad(d.getMinutes()) + ':' + xtra.pad(d.getSeconds());
				} else {
					return err;
				}

			});
		} catch (error) {
			return 'Error: ' + error.message;
		}
	
	
	
}

module.exports.font = (message) => {
	var arg = ' ';
	var game = ' ';
	var style = '0';
	var size = '2';
	var args = [];
	var urls = [];
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
			game = 'niga'
	if (game === 'sfa3')
			game = 'sfz3'
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

module.exports.bubble = (message) => {
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
		game = 'niga'
	if (game === 'sfa3')
		game = 'sfz3'
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

module.exports.gbwiki = (json, query) => {
	var embedString = '';
	if (query === 'locations'){
		//embedTitle += 'Locations';
		for(var i = 0; i < json.results.locations.length; i++){
			if ((embedString + '**•[' + json.results.locations[i].name + '](' + json.results.locations[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json.results.locations[i].name + '](' + json.results.locations[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'objects'){
		//embedTitle += 'Objects';
		for(var i = 0; i < json.results.objects.length; i++){
			if ((embedString + '**•[' + json.results.objects[i].name + '](' + json.results.objects[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json.results.objects[i].name + '](' + json.results.objects[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'info'){
		embedString += json.results.deck + '\n';
	}
	if (query === 'concepts'){
		//embedTitle += 'Concepts';
		for(var i = 0; i < json.results.concepts.length; i++){
			if ((embedString + '**•[' + json.results.concepts[i].name + '](' + json.results.concepts[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json.results.concepts[i].name + '](' + json.results.concepts[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'people'){
		//embedTitle += 'Concepts';
		for(var i = 0; i < json.results.people.length; i++){
			if ((embedString + '**•[' + json.results.people[i].name + '](' + json.results.people[i].site_detail_url + ')**\n').length < 2048)
			embedString += '**•[' + json.results.people[i].name + '](' + json.results.people[i].site_detail_url + ')**\n';
		}
	}
	return embedString;
	
}

module.exports.getDirections = (result) => {
			var dir = '';
			for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
				dir += (i + 1).toString() + '. ' + result.routes[0].legs[0].steps[i].html_instructions.replace(/<\/?b>/gm, '**').replace(/<div style="font-size:0.9em">/gm, ' `(').replace(/<\/div>/gm, ')`') + ' (' + result.routes[0].legs[0].steps[i].distance.text + ', ' + result.routes[0].legs[0].steps[i].duration.text + ')\n';
			}
			return dir + 'And you\'re there! :smiley:';	
}