
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content.substring(0, 5) === '!list') {
		var args = message.content.substring(5).split('\n');
		if (args.length == 1){
			args = message.content.substring(5).split(',');
		}
		for(var i = 0; i < args.length; i++){
             message.channel.send('•' + args[i]);  
         }
    	
  	}
});

client.login(process.env.BOT_TOKEN);
