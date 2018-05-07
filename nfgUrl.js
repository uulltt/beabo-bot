

module.exports.gameText = (game, style, size, text) => {
	if (text.charAt(text.length - 1) === '\n'){
				text = text.substring(0, text.length - 1);
			}
return 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-' + style + '/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}

module.exports.bubble = (game, dir, pos, style, size, text) => {
	if (text.charAt(text.length - 1) === '\n'){
				text = text.substring(0, text.length - 1);
			}
return 'https://nfggames.com/system/arcade/arcade.php/b-' + dir + '/bp-' + pos + '/y-' + game + '/z-'+ style +'/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}