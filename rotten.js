const rm = require('rotten-movies');
const Discord = require('discord.js');

module.exports = (message, content) => {
	if ((content.startsWith('🍅 ') || content.startsWith('!rt ')) && content.length > 3) {
		var com = content.startsWith('🍅 ') ? 3 : 4;
		if (!content.includes('coming soon') && !content.includes('box office') && !content.includes('opening')) {
			var movieurl = 'https://www.rottentomatoes.com/m/' + encodeURI(content.substring(com).toLowerCase().replace(/ /gm, '_').replace(/[^a-z0-9_]/gm, ''));
			rm.info(movieurl, function (err, info) {
				rm.scores(movieurl, function (err2, scores) {
					message.channel.send({
						embed: {
							title: info.name,
							description: info.description,
							url: movieurl,
							footer: {
								text: 'From RottenTomatoes'
							},
							color: 0xa81717,
							fields: [{
									name: "🍅 Critic Score",
									value: scores.critic + '%',
									inline: true
								}, {
									name: "🍿 Audience Score",
									value: scores.audience + '%',
									inline: true
								}
							]
						}
					});
				});
			});
		} else {
			var rtscraper = require('rt-scraper');
			rtscraper.getRottenTomatoesScraperData(function (error, data) {
				if (!error) {
					if (content.includes('coming soon')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Coming Soon').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.comingSoon.length; i++) {
							RTembed.addField(data.comingSoon[i].title, data.comingSoon[i].date + '; ' + data.comingSoon[i].meter);
						}
						message.channel.send({ embed: RTembed });
					}
					if (content.includes('opening')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Opening This Week').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.openingThisWeek.length; i++) {
							RTembed.addField(data.openingThisWeek[i].title, data.openingThisWeek[i].date + '; ' + data.openingThisWeek[i].meter);
						}
						message.channel.send({ embed: RTembed });
					}
					if (content.includes('box office')) {
						const RTembed = new Discord.RichEmbed().setTitle(':film_frames: Box Office').setColor(0xa81717).setFooter("From RottenTomatoes");
						for (var i = 0; i < data.boxOffice.length; i++) {
							RTembed.addField(data.boxOffice[i].title, data.boxOffice[i].gross + '; ' + data.boxOffice[i].meter);
						}
						message.channel.send({ embed: RTembed });
					}
				} else {
					message.channel.send('Some error occured.');
				}
			});
		}
	}
}