

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
		return sentence + "!";
	
}



