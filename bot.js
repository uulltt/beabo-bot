
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
	if (message.content.substring(0, 5) === '!simp'){
		var arg = message.content.substring(6);
		var args = arg.split('\n');
	//	if (args.length < 2)
		//	args = arg.match(/.{1,25}/g);
		for(var i = 0; i < args.length; i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-simp/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
		
})
  .then(console.log)
  .catch(console.error);
	}
}
if (message.content.substring(0, 6) === '!kof2k'){
		var arg = message.content.substring(7);
		var args = arg.split('\n');
		//if (args.length < 2)
		//	args = arg.match(/.{1,24}/g);
		for(var i = 0; i < args.length; i++){
		if (args[i].length > 0)	
			message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-KoF2k/z-6/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
  .then(console.log)
  .catch(console.error);
	}
}

if (message.content.substring(0, 6) === '!kof97'){
		var arg = message.content.substring(7);
		var args = arg.split('\n');
		//if (args.length < 2)
			//args = arg.match(/.{1,24}/g);
		for(var i = 0; i < args.length; i++){
			if (args[i].length > 0)
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-kof97/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
  .then(console.log)
  .catch(console.error);
	}
}

if (message.content.substring(0, 5) === '!pubu'){
		var arg = message.content.substring(6);
		var args = arg.split('\n');
		//if (args.length < 2)
			//args = arg.match(/.{1,34}/g);
		for(var i = 0; i < args.length; i++){
		if (args[i].length > 0)	
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-pubu/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
  .then(console.log)
  .catch(console.error);
	}
}

if (message.content.substring(0, 3) === '!fz'){
		var arg = message.content.substring(4);
		//var args = arg.split('\n');
		//if (args.length < 2)
			args = arg.match(/.{1,25}\W/gm);
		for(var i = 0; i < args.length; i++){
	if (args[i].length > 0)		
		message.channel.send({
			embed: {
    image: {
         url: 'https://nfggames.com/system/arcade/arcade.php/y-fz/z-0/dbl-2/x-' + encodeURI(args[i]  + '\u200B')
      }
   }
})
  .then(console.log)
  .catch(console.error);
	}
}

if (message.content.substring(0, 5) === '!help' || message.content.substring(0, 9) === '!commands'){
		message.channel.send('font commands\n!fz - fantasy zone font\n!kof97 - king of fighters 97 font\n!kof2k - king of fighters 2000 font\n!pubu - puzzle bobble font\n!simp - the simpsons font\n\nother commands\n!list or !todo - splits discord message into a to-do list');
}	

});




client.login(process.env.BOT_TOKEN);
