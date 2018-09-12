const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const soundcloud = require('soundcloud-dl');
var Tumblr = require('tumblrwks');
var servers = {};
const request = require('request').defaults({
		encoding: null
	});
var tumblr = new Tumblr({
		consumerKey: process.env.TUMBLR_CONSUMER_KEY,
	});
	
module.exports = async function(client, message, content, herokupg) {
if (content.startsWith('b!play') && message.member.voiceChannel){
	var link = content.substring(6).trim();
	console.log(link);
	const connection = await message.member.voiceChannel.join();
	if (link.includes('youtube.com/watch?v=') || link.includes('youtu.be/')){
		connection.play(ytdl(
  link,
  { filter: 'audioonly' }));

	}
	else if (link.includes('soundcloud.com/')){
		soundcloudDl.getSongDlByURL(link).then(function(song){
		console.log(song);
    connection.play(song.http_mp3_128_url);
});
	}
	else if (link.match(/\/post\/[0-9]+/gm)){
		
	} else {
		message.channel.send('BEABOOOO! (Error. This cannot be played currently.)')
	}
}

}