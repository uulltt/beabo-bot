
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
	 client.user.setUsername("NagaevskyTron 60");
});


function wordWrap(str, maxWidth) {
    var newLineStr = "\n"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
}
 
client.on('message', message => {
    if (message.content.substring(0, 5) === '!list' || message.content.substring(0, 5) === '!todo') {
		var args = message.content.substring(5).split('\n'); //we split by line breaks
		if (args.length == 1){ //if there's no line breaks
			args = message.content.substring(5).split(','); //we split by commas
		}
		for(var i = 0; i < args.length; i++){ //go through each of the arguments
			if (args[i].length > 0 && (args[i].length < 3 || args[i].substring(0,3) != '```')) //if the first character isn't an accent mark and the length of the argument is greater than 0
             message.channel.send('•' + args[i]); //send the list element
         }
    	
  	}


else if (new RegExp(/font![a-z0-9]{2}\W/gm).test(message.content.substring(0,4+4))){
		var arg = message.content.substring((4)+4) + '\u200B';
		var game = message.content.substring(1+4,3+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,34}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
}

else if (new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0,6+4))){
		var arg = message.content.substring((6)+4) + '\u200B';
		var style = message.content.charAt((3)+4);
		var size = message.content.charAt((4)+4);
		var game = message.content.substring(1+4,3+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
}


else if (new RegExp(/font![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0,5+4))){
		var arg = message.content.substring((5)+4) + '\u200B';
		var game = message.content.substring(1+4,4+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
		}

else if (new RegExp(/font![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0,7+4))){
		var arg = message.content.substring((7)+4) + '\u200B';
		var style = message.content.charAt((4)+4);
		var size = message.content.charAt((5)+4);
		var game = message.content.substring(1+4,4+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			if (game === 'kof'){
			
		} else {
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
		}
}



else if (new RegExp(/font![a-z0-9]{4}\W/gm).test(message.content.substring(0,6+4))){
		var arg = message.content.substring((6)+4) + '\u200B';
		var game = message.content.substring(1+4,5+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game !== 'njgd' && game !== 'sfa3'){
			
			var args = arg.match(/.{1,34}\W/gm);
			if (game === 'sfz3' || game === 'vict' || game === 'moma')
				args = arg.match(/.{1,23}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
		}
}

else if (new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		var style = message.content.charAt((5)+4);
		var size = message.content.charAt((6)+4);
		var game = message.content.substring(1+4,5+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			if (game !== 'njgd' && game !== 'sfa3'){
			var args = arg.match(/.{1,24}\W/gm);
			if (game === 'sfz3' || game === 'vict' || game === 'moma')
				args = arg.match(/.{1,23}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
			}
}

else if (new RegExp(/font![a-z0-9]{5}\W/gm).test(message.content.substring(0,7+4))){
		var arg = message.content.substring((7)+4) + '\u200B';
		var game = message.content.substring(1+4,6+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game !== 'kof2k'){
			var args = arg.match(/.{1,34}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
		}
}

else if (new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0,9+4))){
		var arg = message.content.substring((9)+4) + '\u200B';
		var style = message.content.charAt((6)+4);
		var size = message.content.charAt((7)+4);
		var game = message.content.substring(1+4,6+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			if (game !== 'kof2k'){
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
			}
}


else if (new RegExp(/font![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		var game = message.content.substring(1+4,7+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
		if (game !== 'kof2k1' && game !== 'kof2k2' && game !== 'kof2k3'){
			var args = arg.match(/.{1,34}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
		}
}

else if (new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0,10+4))){
		var arg = message.content.substring(10+4) + '\u200B';
		var style = message.content.charAt((7)+4);
		var size = message.content.charAt((8)+4);
		var game = message.content.substring(1+4,7+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			if (game !== 'kof2k1' && game !== 'kof2k2' && game !== 'kof2k3'){
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
			}
}

else if (new RegExp(/font![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0,9+4))){
		var arg = message.content.substring((9)+4) + '\u200B';
		var game = message.content.substring(1+4,8+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,34}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game + '/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
}).then(console.log).catch(console.error);
  
	}
	//message.delete();
}

else if (new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0,11+4))){
		var arg = message.content.substring(11+4) + '\u200B';
		var style = message.content.charAt((8)+4);
		var game = message.content.substring(1+4,8+4);
		var size = message.content.charAt((9)+4);
		
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-' + game +  '/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
}).then(console.log).catch(console.error);
 
	}
	//message.delete();
}



if (new RegExp(/font!njgd\W/gm).test(message.content.substring(0,6+4))){
		var arg = message.content.substring((6)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,34}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-niga/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!njgd[0-9][0-9]\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		var style = message.content.charAt((5)+4);
		var size = message.content.charAt((6)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-niga/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
})
	}
	//message.delete();
}



if (new RegExp(/font!sfa3\W/gm).test(message.content.substring(0,6+4))){
		var arg = message.content.substring((6)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,23}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-sfz3/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!sfa3[0-9][0-9]\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		var style = message.content.charAt((5)+4);
		var size = message.content.charAt((6)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,23}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-sfz3/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
})
	}
	//message.delete();
}

if (new RegExp(/font!kof97\W/gm).test(message.content.substring(0,7+4))){
		var arg = message.content.substring((7)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-kof97/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof97[0-9][0-9]\W/gm).test(message.content.substring(0,9+4))){
		var arg = message.content.substring((9)+4) + '\u200B';
		var style = message.content.charAt((6)+4);
		var size = message.content.charAt((7)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)+4)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-kof97/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k\W/gm).test(message.content.substring(0,7+4))){
		var arg = message.content.substring(7+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k/z-6/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k[0-9][0-9]\W/gm).test(message.content.substring(0,9+4))){
		var arg = message.content.substring((9)+4) + '\u200B';
		var style = message.content.charAt((6)+4);
		var size = message.content.charAt((7)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k1\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
			if (args[i].length > 0)
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k1/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k1[0-9][0-9]\W/gm).test(message.content.substring(0,10+4))){
		var arg = message.content.substring(10+4) + '\u200B';
		var style = message.content.charAt((7)+4);
		var size = message.content.charAt((8)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k1/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k2\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
			if (args[i].length > 0)
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k2/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k2[0-9][0-9]\W/gm).test(message.content.substring(0,10+4))){
		var arg = message.content.substring(10+4) + '\u200B';
		var style = message.content.charAt((7)+4);
		var size = message.content.charAt((8)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k2/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k3\W/gm).test(message.content.substring(0,8+4))){
		var arg = message.content.substring((8)+4) + '\u200B';
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
			if (args[i].length > 0)
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k3/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}

if (new RegExp(/font!kof2k3[0-9][0-9]\W/gm).test(message.content.substring(0,10+4))){
		var arg = message.content.substring(10+4) + '\u200B';
		var style = message.content.charAt((7)+4);
		var size = message.content.charAt((8)+4);
		//var args = arg.split('\n');
		//if (Math.min(args.length, 6) < 2)
			var args = arg.match(/.{1,24}\W/gm);
		for(var i = 0; i < Math.min(args.length, 6); i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k3/z-' + style + '/dbl-' + size + '/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
	}
	//message.delete();
}



if (message.content.substring(0, 5) === '!help' || message.content.substring(0, 9) === '!commands'){
		message.channel.send('font commands\nThis list is incomplete. To find a font not listed, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.\n'+
		'font!any game name followed by two digits - that game with the first digit determining font style and second digit determining font size\n'+
		'font!arcade - classic arcade\nfont!bios - BioShipPaladin\nfont!chiki - chiki chiki boys\nfont!ddcrew - DDCrew\nfont!DDR - Dance Dance Revolution\nfont!ddux - dynamite dux\nfont!fz - fantasy zone\nfont!gain - gain ground\n'+
		'font!gradius - shoot the core\nfont!guar - guardians\nfont!kais - kaiser knuckle\nfont!kiki - kiki kaikai\nfont!kof97 - king of fighters 97\nfont!kof2k - king of fighters 2000\nfont!kof2k1 - king of fighters 2001\n'+
		'font!kof2k2 - king of fighters 2002\nfont!kof2k3 - king of fighters 2003\nfont!mt - major title\nfont!moma = monster maulers\nfont!namco2 - namco classic gradient\nfont!njgd - ninja gaiden\nfont!pabom - panic bomber\nfont!paro - parodius da\n'+
		'font!pubu - puzzle bobble\nfont!quake - quack\nfont!raph - rapid hero\nfont!robot - robotron\nfont!rtl - rtype leo\nfont!sexy - parodius\nfont!sf2 - street fighter 2\nfont!ssf2 - super street fighter 2\nfont!sfz3 or !sfa3 - street fighter zero\alpha 3\nfont!simp - the simpsons\n'+
		'font!sold - soldam\nfont!tetris - tetris (sega)\nfont!vict - victory road\n\nother commands\n!list or !todo - splits discord message into a to-do list');
}	

});




client.login(process.env.BOT_TOKEN);
