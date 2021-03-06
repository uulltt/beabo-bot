const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const soundcloud = require('soundcloud-dl');
var Tumblr = require('tumblrwks');
var bandcamp = require('node-bandcamp');
var servers = {};
const request = require('request').defaults({
		encoding: null
	});
var tumblr = new Tumblr({
		consumerKey: process.env.TUMBLR_CONSUMER_KEY,
	});

function play(connection, message) {
	var server = servers[message.guild.id];
	var link = server.queue[0].link;
	servers[message.guild.id].nowplaying = link;
	if (link.toLowerCase().includes('youtube.com/watch?v=') || link.toLowerCase().includes('youtu.be/')) {
		server.dispatcher = connection.playStream(ytdl(
  link,
  { filter: 'audioonly' }), { seek: 0, volume: 0.3 });
		server.queue.shift();
		server.dispatcher.on('end', function () {
			if (server.queue[0]) {
				play(connection, message);
			} else {
			connection.disconnect();
			}
		});
		} else if (link.toLowerCase().includes('soundcloud.com/')) {
			soundcloud.getSongDlByURL(link).then(function (song) {
				server.dispatcher = connection.playStream(song.http_mp3_128_url);
				server.dispatcher.setVolume(0.3); // half the volume
				server.queue.shift();
		server.dispatcher.on('end', function () {
			if (server.queue[0]) {
				play(connection, message);
			} else {
				connection.disconnect();
			}
		});
			});
		} 
else if (link.toLowerCase().includes('bandcamp.com/track')) {
			bandcamp.getTrack(link).then(function(stream) {
				server.dispatcher = connection.playStream(stream);
				server.dispatcher.setVolume(0.3); // half the volume
				server.queue.shift();
		server.dispatcher.on('end', function () {
			if (server.queue[0]) {
				play(connection, message);
			} else {
				connection.disconnect();
			}
			});
			}).catch(function(err) {
  // handle error
			});
		} else if (link.match(/\/post\/[0-9]+/gm)) {
		var content = message.content;
				var blogId = content.substring(content.indexOf('://') + 3, content.indexOf('/post/'));
				var postId = parseInt(content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
				tumblr.get('/posts', {
					hostname: blogId,
					id: postId
				}, function (err, json) {
					if (json.total_posts > 0 && json.posts[0].type === 'audio') {
						var r = request.get(json.posts[0].audio_source_url, function (err, res, body) {
								server.dispatcher = connection.playStream(r.uri.href);
								server.dispatcher.setVolume(0.3); // half the volume
								server.queue.shift();
								server.dispatcher.on('end', function () {
									if (server.queue[0]) {
										play(connection, message);
									} else {
										connection.disconnect();
									}
								});
								});
						}
					});
				} else {
					message.channel.send('BEABOOOO! (Error. This cannot be played currently.)');
					server.queue.shift();
					if (server.queue[0]) {
						play(connection, message);
					} else {
						connection.disconnect();
					}
				}
			}

			module.exports = function (client, message, content, herokupg) {
				if (content.toLowerCase().startsWith('b!play') && message.member.voiceChannel) {
				message.channel.fetchMessages({limit: 10}).then( (messages) => {
					var song = {
					link: messages.filter(m => m.embeds.length > 0).first().embeds[0].url,
					title: messages.filter(m => m.embeds.length > 0).first().embeds[0].title
					}
					console.log(song);
					if (!servers[message.guild.id]) {
						servers[message.guild.id] = {
							queue: []
						};
					}
					servers[message.guild.id].queue.push(song);
					message.react('✅');
					console.log(servers[message.guild.id].queue);
					if (message.guild.voiceConnection == null){
					message.member.voiceChannel.join().then(function(connection){
					play(connection, message);
					});
					}
				});
				}
				if (content.toLowerCase().startsWith('b!skip') && message.member.voiceChannel){
				var server = servers[message.guild.id];
				if (server.dispatcher) server.dispatcher.end();
				}
				if (content.toLowerCase().startsWith('b!nowplaying') && message.guild.voiceConnection != null){
				var server = servers[message.guild.id];
				message.channel.send(server.nowplaying);
				}
				if (content.toLowerCase().startsWith('b!queue') && message.guild.voiceConnection != null && servers[message.guild.id].queue.length > 0){
				message.channel.send("Up Next:\n" + servers[message.guild.id].queue.map(function(item){
				return (servers[message.guild.id].queue.indexOf(item)+1).toString() + '.'+item.title+'\n';	
				}).toString().replace(/\n,/gm, '\n'));
				}

			}
