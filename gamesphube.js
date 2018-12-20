
var company_map = {}
var lookback = 2;
var GiantBomb = require('giant-bomb');
var titles = [];
var genres = [];
var themes = []
var dontCombine = [{a: 2, b: 5}, {a: 2, b: 6}, {a: 2, b: 9}, {a: 2, b: 19}, {a: 2, b: 20}, {a: 2, b: 21}, {a: 2, b: 22}, {a: 2, b: 24}, 
	{a: 2, b: 25}, {a: 2, b: 26}, {a: 2, b: 27}, {a: 2, b: 28}, {a: 2, b: 32}, {a: 2, b: 33}, {a: 2, b: 38}, {a: 2, b: 39}, {a: 2, b: 41}, {a: 2, b: 45}, {a: 2, b: 46}, {a: 10, b: 30}, {a: 10, b: 31}, {a: 10, b: 34}, {a: 30, b: 31}, {a: 30, b: 34}, {a: 31, b: 34}];


//Get API key at http://giantbomb.com/api
var gb = new GiantBomb(process.env.GIANTBOMB, 'BB-00 - Discord bot that uses markov chains to generate video game titles');
gb.getGenres({}, 
	function(error, reponse, json){
	//console.log(json);
	genres = json.results.map(function(item) {
		return item.name;
	});
	var moregenres = ['4X', 'Scorched Earth', 'Battle Royale', 'Metroidvania', 'Visual Novel', 'Pong', 'Stealth', 'Roguelike', 'Tower Defense', 'Survival', 'Dungeon Crawler'];
	Array.prototype.push.apply(genres, moregenres);
	});
	
gb.getThemes({}, 
	function(error, reponse, json){
	themes = json.results.map(function(item) {
		return item.name;
	});
	var morethemes = (`Alice in Wonderland
Alien Invasion
Bakage
Barbarians!
Big Maze Levels
Cats!
Cute-em-up
Creepy Americana
Damsel in Distress
Decent Licensed Game
Digitized Actors
Dragons!
Dogs!
Falling Blocks
Fantasy: Comical
Fantasy: High
Fantasy: Historical
Fantasy: Mythical
Fantasy: Urban
Fantasy: Mythical
Fantasy: Arabian
Fantasy: Far East
Fantasy: Norse
Fantasy-SF Mashup
Fight the Nazis
Going Through Hell
Gore
Halloween
Kusoge
Mascot Platformer
Mechas!
Mystery Mansion
New Retro
Ninjas!
Parody / Satire
Pirates!
Player: Alien
Player: Amnesiac
Player: Angel
Player: Animal
Player: Anthropomorph
Player: Celebrity
Player: Cop
Player: Female
Player: Robot / Cyborg
Player: Sleuth
Player: Villain
Player: Witch / Wizard
Politics
So ’80s/’90s it Hurts
So Hard it Hurts
Sprite-Based 3D
Swinging / Grappling
Time Travel
Unique Visuals
Vampires
Violent Sports
Wacky / Over the Top`).split('\n');
	Array.prototype.push.apply(themes, morethemes);
	});
	

function sum_values(obj) {
    var total = 0;

    for (var property in obj) {
        total += obj[property];
    }
    return total;
}



function sample(items) {
    var next_word;
    var t = 0;

    for (var k in items) {
        v = items[k];
        t += v;

        if (t !== 0 && Math.random() < v/t) {
            next_word = k;
        }
    }

    return next_word;
}

module.exports.genrefusion = function(message) {

		var genre1 = Math.floor(Math.random() * genres.length);
		var genre2 = Math.floor(Math.random() * genres.length);
		while(genre2 == genre1 || dontCombine.indexOf({a: genre1, b: genre2}) != -1 || dontCombine.indexOf({a: genre2, b: genre1}) != -1){
		genre1 = Math.floor(Math.random() * genres.length);
		genre2 = Math.floor(Math.random() * genres.length);
		}
		message.channel.send('**' + genres[genre1] + '** + **' + genres[genre2] + '**');
	
}

module.exports.genrefusiontheme = function(message) {

		var genre1 = Math.floor(Math.random() * genres.length);
		var genre2 = Math.floor(Math.random() * genres.length);
		var theme = Math.floor(Math.random() * themes.length);
		while(genre2 == genre1 || dontCombine.indexOf({a: genre1, b: genre2}) != -1 || dontCombine.indexOf({a: genre2, b: genre1}) != -1){
		genre1 = Math.floor(Math.random() * genres.length);
		genre2 = Math.floor(Math.random() * genres.length);
		}
		message.channel.send('**' + genres[genre1] + '** + **' + genres[genre2] + '** + **' + themes[theme] + '**');
	
}

module.exports.genretheme = function(message) {

		var genre = Math.floor(Math.random() * genres.length);
		var theme = Math.floor(Math.random() * themes.length);
		message.channel.send('**' + genres[genre] + '** + **' + themes[theme] + '**');
	
}

module.exports.gamefusion =  function(message) {
gb.getGames(
	{ 
		limit: 100,
		offset: Math.floor(Math.random() * 62000),
		fields: ['name', 'platforms']
	}, 
	function(error, reponse, json){
		var Game1 = Math.floor(Math.random() * json.results.length);
		var Game2 = Math.floor(Math.random() * json.results.length);
		while(Game2 == Game1){
		Game2 = Math.floor(Math.random() * json.results.length);
		}
		message.channel.send('**' + json.results[Game1].name + '** + **' + json.results[Game2].name + '**');
	}
);	
	
}

function gametitle (message) {
	var title_map = {};
	gb.getGames(
	{ 
		limit: 100,
		offset: Math.floor(Math.random() * 62000),
		fields: ['name', 'platforms']
	}, 
	function(error, reponse, json){
	//console.log(json);
titles = json.results.map(function(item){
	return item.name;
});
//console.log(titles);
for (var i = 0; i < titles.length; i++) {
    var title = titles[i].split(' ');
	//lookback = Math.ceil(Math.random() * 2);
    if (title.length > lookback) {
        for (var j = 0; j < title.length+1; j++) {
		
            var last_phrase = title.slice(Math.max(0, j-lookback), j).join(' ');
			if (last_phrase.match(/ ((to)|(of)|(for)|([tT]he)|([io']n)|([aA]((n(d?))?)))$/gm)){
				last_phrase = last_phrase.match(/ ((to)|(of)|(for)|([Tt]he)|([io']n)|([aA]((n(d?))?)))$/gm)[0].substring(1);
			}
            var next_phrase = title.slice(j,j+1).join(' ');
            var map = title_map[last_phrase] || {};
            var count = map[next_phrase] || 0;
            map[next_phrase] = count + 1;
            title_map[last_phrase] = map;
        }
    } else {
	title = title.filter(function(item){
	return !item.match(/[0-9]/gm) && !item.match(/[tT]he$/gm) && !item.toLowerCase().match(/((ii)|(iii))$/gm);
	});
	for (var k = 0; k < title.length; k++){
	var next_phrase = title[k];
	var last_phrases = ['of', 'The', 'the', 'a', 'A', 'an', 'An', 'And', 'and', 'for', '\'n'];
	for (var j = 0; j < last_phrases.length; j++){
		if (next_phrase.charAt(0) == 'A' || next_phrase.charAt(0) == 'E' || next_phrase.charAt(0) == 'I' || next_phrase.charAt(0) == 'O' || next_phrase.charAt(0) == 'U'){
		if (j == 3 || j == 4)
			continue;
		} else {
		if (j == 5 || j == 6)
			continue;
		}
            var map = title_map[last_phrases[j]] || {};
            var count = map[next_phrase] || 0;
            map[next_phrase] = count + 1;
            title_map[last_phrases[j]] = map;
	}
	if (k == 1){
			var map = title_map[title[0]] || {};
            var count = map[next_phrase] || 0;
            map[next_phrase] = count + 1;
            title_map[title[0]] = map;
	}
	}
	}
}
console.log(title_map);
	
	for (var word in title_map) {
    var following = title_map[word];
    var total = sum_values(following);

    for (var key in following) {
        following[key] /= total;
    }
}


  var sentences = [];
for(var j = 0; j < 100 && sentences.length < 1; j++){
    console.log(j);
        var sentence = [];
        var next_word = sample(title_map['']);
		//lookback = Math.ceil(Math.random() * 2);
        while(next_word !== '') {
            sentence.push(next_word);
            var tail = sentence.slice(-lookback).join(' ');
			if (tail.match(/ ((to)|(of)|(for)|([Tt]he)|([io']n)|([aA]((n(d?))?)))$/gm)){
				tail = tail.match(/ ((to)|(of)|(for)|([Tt]he)|([io']n)|([aA]((n(d?))?)))$/gm)[0].substring(1);
			}
            next_word = sample(title_map[tail]);
			
			console.log(next_word);
			if (next_word == undefined){
			next_word = '';
			} else {
			for(var k = 0; k < 100 && sentence.indexOf(next_word) != -1 && !next_word.match(/((to)|(of)|(for)|([Tt]he)|([io']n)|([aA]((n(d?))?)))$/gm); k++){
				next_word = sample(title_map[tail]);
			}
			}
        }

        sentence = sentence.join(' ');
        
        var flag = true;
        for(var i=0; i < titles.length; i++) {
            if (titles[i].indexOf(sentence) != -1) {
                flag = false;
                break;
            }
        }
	if (flag){
	sentences.push(sentence)
	}
		
	}
if (sentences.length > 0){
message.channel.send(sentences[0]);
} else {
	gametitle(message);
}
 
    
});
}

module.exports.gametitle = gametitle;

