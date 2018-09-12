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

function play(connection, message) {
	var server = servers[message.guild.id];
	var link = server.queue[0];
	if (link.includes('youtube.com/watch?v=') || link.includes('youtu.be/')) {
		server.dispatcher = connection.playStream(ytdl(
					link, {
					filter: 'audioonly'
				}));
		server.queue.shift();
		server.dispatcher.on('end', function () {
			if (server.queue[0]) {
				play(connection, message);
			} else {
			console.log("AAAAAA");
				//connection.disconnect();
			}
		});
		} else if (link.includes('soundcloud.com/')) {
			soundcloudDl.getSongDlByURL(link).then(function (song) {
				console.log(song);
				server.dispatcher = connection.play(song.http_mp3_128_url);
				server.queue.shift();
		server.dispatcher.on('end', function () {
			if (server.queue[0]) {
				play(connection, message);
			} else {
				connection.disconnect();
			}
		});
			});
		} else if (link.match(/\/post\/[0-9]+/gm)) {
				var blogId = content.substring(content.indexOf('://') + 3, content.indexOf('/post/'));
				var postId = parseInt(content.substring(content.indexOf('/post/') + 6).match(/[0-9]+/gm)[0]);
				tumblr.get('/posts', {
					hostname: blogId,
					id: postId
				}, function (err, json) {
					if (json.total_posts > 0 && json.posts[0].type === 'audio') {
						var r = request.get(json.posts[0].audio_source_url, function (err, res, body) {
								server.dispatcher = connection.play(r.uri.href);
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

			module.exports = async function (client, message, content, herokupg) {
				if (content.startsWith('b!play') && message.member.voiceChannel) {
					var link = content.substring(6).trim();
					console.log(link);
					if (!servers[message.guild.id]) {
						servers[message.guild.id] = {
							queue: []
						};
					}
					servers[message.guild.id].queue.push(link);
					console.log(servers[message.guild.id].queue);
					message.member.voiceChannel.join().then(function(connection){
					play(connection, message);
					});
				}
				if (content.startsWith('b!skip') && message.member.voiceChannel){
				var server = servers[message.guild.id];
				if (server.dispatcher) server.dispatcher.end();
				}

			}
