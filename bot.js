
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

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
	if (message.content.includes('@y\'all')){
		var people = [];
		var len = 10;
		var count = 0;
		var msgstr = '';
		var messages;
		//message.channel.send(message.channel.name);
		messages = message.channel.fetchMessages()
  .then(function(msgs) => { return msgs;})	
		
		for(var i = 0; i < messages.size; i++){
	  var theuser = '@' + messages[i].author.username + '#' + messages[i].author.discriminator;
		if (!msgstr.includes(theuser)){
			msgstr += theuser + ' ';
			count++;
		}
		if (count >= len)
			break;
		}
		message.channel.send(msgstr);
		
	}
});

client.login(process.env.BOT_TOKEN);
