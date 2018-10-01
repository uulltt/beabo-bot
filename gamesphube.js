
var company_map = {}
var lookback = 2;
var GiantBomb = require('giant-bomb');
var titles = [];
var genres = [];


//Get API key at http://giantbomb.com/api
var gb = new GiantBomb(process.env.GIANTBOMB, 'Beabo - Discord bot that uses markov chains to generate video game titles');
gb.getGenres({}, 
	function(error, reponse, json){
	genres = json.results.map(function(item) {
		return item.name;
	});
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

		var Genre1 = Math.floor(Math.random() * genres.length);
		var Genre2 = Math.floor(Math.random() * genres.length);
		while(Genre2 == Genre1){
		Genre2 = Math.floor(Math.random() * genres.length);
		}
		message.channel.send('**' + genres[Genre1] + '** + **' + genres[Genre2] + '**');
	
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
	if (title.length == 1){
	var next_phrase = title[0];
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

