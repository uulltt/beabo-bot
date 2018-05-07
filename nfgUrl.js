module.exports.gameText = (game, text) => {
return 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(text  + '\u200B');
}

module.exports.gameSSText = (game, style, size, text) => {
return 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-' + style + '/dbl-'+ size +'/x-' + encodeURI(text  + '\u200B');
}