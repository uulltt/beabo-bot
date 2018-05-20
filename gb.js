const giantbomb = require('giantbomb');
const gb = giantbomb(process.env.GIANT_BOMB);
const gbSearchGet = [gb.games, gb.characters, gb.concepts, gb.franchises, gb.companies, gb.people, gb.objects];
const gbStrings = ['game ', 'character ', 'concept ', 'franchise ', 'company ', 'person ', 'object '];
const Discord = require('discord.js');

function gbwiki(json, query) {
	var embedString = '';
	const queries = ['concepts', 'locations', 'objects', 'people'];
	const gameInfo = [json.results.concepts, json.results.locations, json.results.objects, json.results.people];
	if (query === 'info') {
		embedString += json.results.deck + '\n';
	} else {
		for(var j = 0; j < 4; j++){
	if (query === queries[j]) {
		for (var i = 0; i < gameInfo[j].length; i++) {
			if ((embedString + '**•[' + gameInfo[j][i].name + '](' + gameInfo[j][i].site_detail_url + ')**\n').length < 2048)
				embedString += '**•[' + gameInfo[j][i].name + '](' + gameInfo[j][i].site_detail_url + ')**\n';
		}
	}
	}
	/*if (query === 'objects') {
		for (var i = 0; i < json.results.objects.length; i++) {
			if ((embedString + '**•[' + json.results.objects[i].name + '](' + json.results.objects[i].site_detail_url + ')**\n').length < 2048)
				embedString += '**•[' + json.results.objects[i].name + '](' + json.results.objects[i].site_detail_url + ')**\n';
		}
	}
	
	if (query === 'concepts') {
		for (var i = 0; i < json.results.concepts.length; i++) {
			if ((embedString + '**•[' + json.results.concepts[i].name + '](' + json.results.concepts[i].site_detail_url + ')**\n').length < 2048)
				embedString += '**•[' + json.results.concepts[i].name + '](' + json.results.concepts[i].site_detail_url + ')**\n';
		}
	}
	if (query === 'people') {
		for (var i = 0; i < json.results.people.length; i++) {
			if ((embedString + '**•[' + json.results.people[i].name + '](' + json.results.people[i].site_detail_url + ')**\n').length < 2048)
				embedString += '**•[' + json.results.people[i].name + '](' + json.results.people[i].site_detail_url + ')**\n';
		}
	}*/
	}
	return embedString;

}

function gbWiki(json2, query, message, g) {
	var queries = query.split(',');
	var Name = json2.results.name;
	var imageURL = json2.results.image.original_url;
	for (var q = 0; q < queries.length; q++) {
		var embedTitle = Name + ' ';
		var embedString = '';
		embedString += gbwiki(json2, queries[q]);
		if (queries[q] === 'info' && g === 0) {
			const gameInfo = [json2.results.platforms, json2.results.developers, json2.results.publishers, json2.results.genres, json2.results.themes, json2.results.dlcs];
			var gameValues = ['', '', '', '', '', ''];
			for(var j = 0; j < 6; j++){	
				if (gameInfo[j] !== undefined && gameInfo[j]  !== null && typeof gameInfo[j]  !== undefined && typeof gameInfo[j]  !== null) {
					for (var i = 0; i < gameInfo[j].length; i++) {

						if ((gameValues[j] + ', [' + gameInfo[j][i].name + '](' + gameInfo[j][i].site_detail_url + ')').length < 2048 && !gameValues[j].includes('[' + gameInfo[j][i].name + '](' + gameInfo[j][i].site_detail_url + ')')) {
							if (i > 0) {
								gameValues[j] += ', ';
							}
							gameValues[j] += '[' + gameInfo[j][i].name + '](' + gameInfo[j][i].site_detail_url + ')';
						}
					}
				} else {
					gameValues[j] = 'None';
				}
			}
				var ord = 'Coming Soon';
			if (json2.results.original_release_date !== undefined && json2.results.original_release_date !== null && typeof json2.results.original_release_date !== undefined && typeof json2.results.original_release_date !== null)
				ord = json2.results.original_release_date.substring(0, json2.results.original_release_date.indexOf(' '));

			message.channel.send({
				embed: {
					title: embedTitle,
					description: embedString,
					url: json2.results.site_detail_url,
					footer: {
						text: 'From Giant Bomb Wiki'
					},
					color: 0xa81717,
					thumbnail: {
						url: imageURL
					},
					fields: [{
							name: "Original Release Date",
							value: ord,
							inline: true
						}, {
							name: "Platforms",
							value: gameValues[0],
							inline: true
						}, {
							name: "Developers",
							value: gameValues[1],
							inline: true
						}, {
							name: "Publishers",
							value: gameValues[2],
							inline: true
						}, {
							name: "Genres",
							value: gameValues[3],
							inline: true
						}, {
							name: "Themes",
							value: gameValues[4],
							inline: true
						}, {
							name: "DLCs",
							value: gameValues[5]
						},
					]
				}
			});
		} else {
			if (queries[q] === 'info' && g === 1) {

				if (json2.results.first_appeared_in_game !== null) {
					embedString += '**•First Appearance: [' + json2.results.first_appeared_in_game.name + '](' + json2.results.first_appeared_in_game.site_detail_url + ')**\n';
				}
				var genders = ['0', 'Male', 'Female', '3'];
				embedString += '**•Gender: ' + genders[json2.results.gender] + '**\n';
				embedString += '**•Birthday: ' + json2.results.birthday + '**\n';
			}
			if (queries[q] === 'info' && (g === 2 || g === 6)) {
				embedString += '**First Appearance: [' + json2.results.first_appeared_in_game.name + '](' + json2.results.first_appeared_in_game.site_detail_url + ')**';
			}
			if (queries[q] === 'info' && g === 5) {
				if (json2.results.first_credited_game !== null) {
					embedString += '**•First Credited Game: [' + json2.results.first_credited_game.name + '](' + json2.results.first_credited_game.site_detail_url + ')**\n';
				}
				var genders = ['0', 'Male', 'Female', '3'];
				embedString += '**•Gender: ' + genders[json2.results.gender] + '**\n';
				if (json2.results.birth_date !== null) {
					embedString += '**•Birthday: ' + json2.results.birth_date + '**\n';
				}
			}
			if (queries[q] === 'concepts') {
				embedTitle += 'Concepts';
			}
			if (queries[q] === 'people') {
				embedTitle += 'People';
			}
			if (queries[q] === 'locations') {
				embedTitle += 'Locations';
			}
			if (queries[q] === 'objects') {
				embedTitle += 'Objects';
			}
			if (g !== 1) {
				if (queries[q] === 'characters') {
					embedTitle += 'Characters';
					for (var i = 0; i < json2.results.characters.length; i++) {
						if ((embedString + '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n').length < 2048)
							embedString += '**•[' + json2.results.characters[i].name + '](' + json2.results.characters[i].site_detail_url + ')**\n';
					}
				}
			} else {
				if (queries[q] === 'friends') {
					embedTitle += 'Friends';
					for (var i = 0; i < json2.results.friends.length; i++) {
						if ((embedString + '**•[' + json2.results.friends[i].name + '](' + json2.results.friends[i].site_detail_url + ')**\n').length < 2048)
							embedString += '**•[' + json2.results.friends[i].name + '](' + json2.results.friends[i].site_detail_url + ')**\n';
					}
				}
				if (queries[q] === 'enemies') {
					embedTitle += 'Enemies';
					for (var i = 0; i < json2.results.enemies.length; i++) {
						if ((embedString + '**•[' + json2.results.enemies[i].name + '](' + json2.results.enemies[i].site_detail_url + ')**\n').length < 2048)
							embedString += '**•[' + json2.results.enemies[i].name + '](' + json2.results.enemies[i].site_detail_url + ')**\n';
					}
				}
			}
			if (queries[q] === 'similar' && g === 0) {
				embedTitle += 'Similar Games';
				for (var i = 0; i < json2.results.similar_games.length; i++) {
					if ((embedString + '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.similar_games[i].name + '](' + json2.results.similar_games[i].site_detail_url + ')**\n';
				}
			}
			if (queries[q] === 'companies' && g === 6) {
				embedTitle += 'Companies';
				for (var i = 0; i < json2.results.companies.length; i++) {
					if ((embedString + '**•[' + json2.results.companies[i].name + '](' + json2.results.companies[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.companies[i].name + '](' + json2.results.companies[i].site_detail_url + ')**\n';
				}
			}
			if (queries[q] === 'developed' && g === 4) {
				embedTitle += 'Developed Games';
				for (var i = 0; i < json2.results.developed_games.length; i++) {
					if ((embedString + '**•[' + json2.results.developed_games[i].name + '](' + json2.results.developed_games[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.developed_games[i].name + '](' + json2.results.developed_games[i].site_detail_url + ')**\n';
				}
			}
			if (queries[q] === 'published' && g === 4) {
				embedTitle += 'Published Games';
				for (var i = 0; i < json2.results.published_games.length; i++) {
					if ((embedString + '**•[' + json2.results.published_games[i].name + '](' + json2.results.published_games[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.published_games[i].name + '](' + json2.results.published_games[i].site_detail_url + ')**\n';
				}
			}
			if (queries[q] === 'franchises' && g !== 3 && g !== 4) {
				embedTitle += 'Franchises';
				for (var i = 0; i < json2.results.franchises.length; i++) {
					if ((embedString + '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.franchises[i].name + '](' + json2.results.franchises[i].site_detail_url + ')**\n';
				}
			}
			if (queries[q] === 'games' && g !== 0 && g !== 4) {
				embedTitle += 'Games';
				for (var i = 0; i < json2.results.games.length; i++) {
					if ((embedString + '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n').length < 2048)
						embedString += '**•[' + json2.results.games[i].name + '](' + json2.results.games[i].site_detail_url + ')**\n';
				}
			}
			if (embedString.length > 2048) {
				embedString = embedString.substring(0, 2048);
			}
			message.channel.send({
				embed: {
					title: embedTitle,
					description: embedString,
					url: json2.results.site_detail_url,
					footer: {
						text: 'From Giant Bomb Wiki'
					},
					color: 0xa81717,
					thumbnail: {
						url: imageURL
					},
				}
			});
		}
	}
}

module.exports = (message, content) => {
	console.log(content);
	var choice = 0;
	for (var g = 0; g < 7; g++) {
		if (content.substring(4, 4 + gbStrings[g].length) === gbStrings[g]) {
			choice = g;
			var typequery = content.substring(4 + gbStrings[g].length)
				var query = typequery.substring(0, typequery.indexOf(' '));
			var title = typequery.substring(typequery.indexOf(' ') + 1);
			gbSearchGet[choice].search(title, {
				limit: 1
			}, (err, res, json) => {
				if (json.hasOwnProperty('results') && json.results.hasOwnProperty('length') && json.results.length > 0) {
					var gamelist = ''
						for (var i = 0; i < json.results.length; i++) {
							gamelist += (i + 1).toString() + '. ' + json.results[i].name + '\n';
						}
						message.channel.send('Which did you mean? Please Reply with a number.\n' + gamelist);
					const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
							time: 10000
						});
					collector.on('collect', message2 => {
						if (message2.user === message.user && message2.channel === message.channel && parseInt(message2.content)) {
							var id = json.results[parseInt(message2.content) - 1].id;
							if (query === '*' || query === 'all') {
								query = 'info,characters,friends,enemies,concepts,franchises,games,developed,published,locations,objects,people,similar,companies';
							}
							gbSearchGet[choice].get(id, function (err2, res2, json2) {
								gbWiki(json2, query, message, choice);
							});
						}

					});
				}
			});
		}
	}
}