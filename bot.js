
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content.substring(0, 5) === '!list') {
		var args = message.content.substring(5).split('\n');
		for(var i = 1; i < args.length; i++){
             message.channel.send(args[i]);  
         }
    	
  	}
});

client.login(process.env.NDM5NTM1OTg5ODIwNzUxODcz.DcUlag.cBdVZzuP66_SnIKkNHf7wXM_Hzs);
