
const Discord = require('discord.js');
const nfgUrl = require('./nfgUrl.js');
var Twitter = require('twitter');
var direction = require('google-maps-direction');
const client = new Discord.Client();
var googlePlaces = require('googleplaces');
var GPlaces = new googlePlaces(process.env.PLACES_KEY, "json");
var imgur = require('imgur');
var ExifImage = require('exif').ExifImage;
var cityTimezones = require('city-timezones');
var Tumblr = require('tumblrwks');
var tumblr = new Tumblr({
  consumerKey: process.env.TUMBLR_CONSUMER_KEY,
});
const moment = require('moment-timezone');

let zonesList = ["Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmara","Africa/Asmera","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Lome","Africa/Luanda","Africa/Lubumbashi","Africa/Lusaka","Africa/Malabo","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Mogadishu","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Sao_Tome","Africa/Timbuktu","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Anguilla","America/Antigua","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/ComodRivadavia","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Aruba","America/Asuncion","America/Atikokan","America/Atka","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Buenos_Aires","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Catamarca","America/Cayenne","America/Cayman","America/Chicago","America/Chihuahua","America/Coral_Harbour","America/Cordoba","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Dominica","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Ensenada","America/Fort_Nelson","America/Fort_Wayne","America/Fortaleza","America/Glace_Bay","America/Godthab","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Indianapolis","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indianapolis","America/Inuvik","America/Iqaluit","America/Jamaica","America/Jujuy","America/Juneau","America/Kentucky/Louisville","America/Kentucky/Monticello","America/Knox_IN","America/Kralendijk","America/La_Paz","America/Lima","America/Los_Angeles","America/Louisville","America/Lower_Princes","America/Maceio","America/Managua","America/Manaus","America/Marigot","America/Martinique","America/Matamoros","America/Mazatlan","America/Mendoza","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Port_of_Spain","America/Porto_Acre","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Rosario","America/Santa_Isabel","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Shiprock","America/Sitka","America/St_Barthelemy","America/St_Johns","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Tortola","America/Vancouver","America/Virgin","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/McMurdo","Antarctica/Palmer","Antarctica/Rothera","Antarctica/South_Pole","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Arctic/Longyearbyen","Asia/Aden","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Ashkhabad","Asia/Atyrau","Asia/Baghdad","Asia/Bahrain","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Calcutta","Asia/Chita","Asia/Choibalsan","Asia/Chongqing","Asia/Chungking","Asia/Colombo","Asia/Dacca","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Harbin","Asia/Hebron","Asia/Ho_Chi_Minh","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Istanbul","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Kashgar","Asia/Kathmandu","Asia/Katmandu","Asia/Khandyga","Asia/Kolkata","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Kuwait","Asia/Macao","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Muscat","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Phnom_Penh","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qyzylorda","Asia/Rangoon","Asia/Riyadh","Asia/Saigon","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Tel_Aviv","Asia/Thimbu","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ujung_Pandang","Asia/Ulaanbaatar","Asia/Ulan_Bator","Asia/Urumqi","Asia/Ust-Nera","Asia/Vientiane","Asia/Vladivostok","Asia/Yakutsk","Asia/Yangon","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faeroe","Atlantic/Faroe","Atlantic/Jan_Mayen","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/St_Helena","Atlantic/Stanley","Australia/ACT","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Canberra","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/LHI","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/NSW","Australia/North","Australia/Perth","Australia/Queensland","Australia/South","Australia/Sydney","Australia/Tasmania","Australia/Victoria","Australia/West","Australia/Yancowinna","Brazil/Acre","Brazil/DeNoronha","Brazil/East","Brazil/West","CET","CST6CDT","Canada/Atlantic","Canada/Central","Canada/East-Saskatchewan","Canada/Eastern","Canada/Mountain","Canada/Newfoundland","Canada/Pacific","Canada/Saskatchewan","Canada/Yukon","Chile/Continental","Chile/EasterIsland","Cuba","EET","EST","EST5EDT","Egypt","Eire","Etc/GMT","Etc/GMT+0","Etc/GMT+1","Etc/GMT+10","Etc/GMT+11","Etc/GMT+12","Etc/GMT+2","Etc/GMT+3","Etc/GMT+4","Etc/GMT+5","Etc/GMT+6","Etc/GMT+7","Etc/GMT+8","Etc/GMT+9","Etc/GMT-0","Etc/GMT-1","Etc/GMT-10","Etc/GMT-11","Etc/GMT-12","Etc/GMT-13","Etc/GMT-14","Etc/GMT-2","Etc/GMT-3","Etc/GMT-4","Etc/GMT-5","Etc/GMT-6","Etc/GMT-7","Etc/GMT-8","Etc/GMT-9","Etc/GMT0","Etc/Greenwich","Etc/UCT","Etc/UTC","Etc/Universal","Etc/Zulu","Europe/Amsterdam","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belfast","Europe/Belgrade","Europe/Berlin","Europe/Bratislava","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Busingen","Europe/Chisinau","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Guernsey","Europe/Helsinki","Europe/Isle_of_Man","Europe/Istanbul","Europe/Jersey","Europe/Kaliningrad","Europe/Kiev","Europe/Kirov","Europe/Lisbon","Europe/Ljubljana","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Mariehamn","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Nicosia","Europe/Oslo","Europe/Paris","Europe/Podgorica","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/San_Marino","Europe/Sarajevo","Europe/Saratov","Europe/Simferopol","Europe/Skopje","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Tiraspol","Europe/Ulyanovsk","Europe/Uzhgorod","Europe/Vaduz","Europe/Vatican","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zagreb","Europe/Zaporozhye","Europe/Zurich","GB","GB-Eire","GMT","GMT+0","GMT-0","GMT0","Greenwich","HST","Hongkong","Iceland","Indian/Antananarivo","Indian/Chagos","Indian/Christmas","Indian/Cocos","Indian/Comoro","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Mayotte","Indian/Reunion","Iran","Israel","Jamaica","Japan","Kwajalein","Libya","MET","MST","MST7MDT","Mexico/BajaNorte","Mexico/BajaSur","Mexico/General","NZ","NZ-CHAT","Navajo","PRC","PST8PDT","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Chuuk","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Johnston","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Midway","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Pohnpei","Pacific/Ponape","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Saipan","Pacific/Samoa","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Truk","Pacific/Wake","Pacific/Wallis","Pacific/Yap","Poland","Portugal","ROC","ROK","Singapore","Turkey","UCT","US/Alaska","US/Aleutian","US/Arizona","US/Central","US/East-Indiana","US/Eastern","US/Hawaii","US/Indiana-Starke","US/Michigan","US/Mountain","US/Pacific","US/Pacific-New","US/Samoa","UTC","Universal","W-SU","WET","Zulu"];
function zone(currentZone){
	
	if(! currentZone ) {
		return 'Please specify a zone.';
	}
	if( zonesList.includes( currentZone )) {
		console.log(currentZone);
		moment.tz.setDefault(currentZone);
		return new Date(moment.utc(new Data()).tz(moment().tz()).format());
		//return new Date(moment(new Date()).tz( currentZone ).local().format());
	} else {
		return 'This zone is not present. Please visit https://www.npmjs.com/package/current-timezone';
	}
	
}
var tweeter = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

client.on('ready', () => {
	console.log('I am ready!');
	client.user.setUsername("Beabo");
	client.user.setActivity('type !commands for help', { type: 'WATCHING' });
});

var lines = [" beabo", " bee", " bii", " be", " beeb"];

client.on('message', message => {
	
	if (message.isMentioned(client.user)){
		var len = Math.floor(Math.random() * 6) + 1;
		var sentence = "";
		for(var i = 0; i < len; i++){
			sentence += lines[Math.floor(Math.random() * lines.length)];
			var ex = Math.floor(Math.random() * 3);
			if (ex === 0){
				sentence += "!";
			}
		}
		sentence += "!";
		message.channel.send(sentence);
	}
	if (message.content.substring(0, 6) === '!exif '){
		var request = require('request').defaults({ encoding: null });
request.get(message.content.substring(6), function (err, res, body) {
      //process exif here
var exifString = ':frame_photo: EXIF data:\n';
try {
    new ExifImage({ image : body }, function (error, exifData) {
        if (error)
            message.channel.send('Error: '+ error.message);
        else{
			var propValue;
            for(var propName in exifData.image) {
    propValue = exifData.image[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
			}
 for(var propName in exifData.thumbnail) {
    propValue = exifData.image[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
 }
for(var propName in exifData.exif) {
    propValue = exifData.exif[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";
if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
    exifString += field;
}
}
for(var propName in exifData.gps) {
    propValue = exifData.gps[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";

if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
   exifString += field;
}
}
for(var propName in exifData.interoperability) {
    propValue = exifData.interoperability[propName];
	if (typeof propValue !== "undefined"){
var field = propName.toString() + ": " + propValue.toString() + "\n";

if (propValue.toString().length > 0 && !propValue.toString().includes("<buffer") && !(new RegExp(/\W+/gm).test(propValue.toString())))
   exifString += field;
}
}
if (exifString.length > 2000){
	message.channel.send(exifString.substring(0, 2000));
} else {
	message.channel.send(exifString);
}
		}
    });

} catch (error) {
   message.channel.send('Error: ' + error.message);
}
});
	}
	if (new RegExp(/hex#[0-9A-Fa-f]{6}/gm).test(message.content.substring(0, 10))) {
		message.channel.send({
			embed: {
				image: {
					url: 'https://www.colorcombos.com/images/colors/' + message.content.substring(4, 10) + '.png'
				}
			}
		});
	}
	if (message.content.substring(0, 8) === '!places ') {
		parameters = {
			query: message.content.substring(8).split('\"')[1]
		};
		GPlaces.textSearch(parameters, function (error, response) {
			if (error)
				throw error;
			for(var i = 0; i < Math.min(response.results.length, 5); i++){
				var open = '';
				if (response.results[i].hasOwnProperty('opening_hours') && response.results[i].opening_hours.hasOwnProperty('open_now')){
				if (response.results[i].opening_hours.open_now){
					open = ':large_blue_circle: ***OPEN NOW!***';
				} else {
					open = ':red_circle: Sorry, closed.';
				}
				}
				message.channel.send('**' + response.results[i].name + '**\n`' + response.results[i].formatted_address + '`\n:star: ' + response.results[i].rating + '\n' + open);
			}
		});

	}
	if (message.content.substring(0, 5) === '!dir ') {
		var args = message.content.substring(5).split('\"');
		var ori = args[1];
		var dest = args[3];
		direction({
			origin: ori,
			destination: dest
		})
		.then(function (result) {
			var dir = ':motorway: **' + ori + '** to **' + dest + '**\n';
			for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
				dir = dir + (i + 1).toString() + '. ' + result.routes[0].legs[0].steps[i].html_instructions.replace(/<\/?b>/gm, '**').replace(/<div style="font-size:0.9em">/gm, ' `(').replace(/<\/div>/gm, ')`') + ' (' + result.routes[0].legs[0].steps[i].distance.text + ', ' + result.routes[0].legs[0].steps[i].duration.text + ')\n';
			}
			dir = dir + 'And you\'re there! :smiley:';
			if (dir.length <= 2000)
				message.channel.send(dir);
			else
				message.channel.send('Too many directions. Just Google it.');
		}).catch(console.error);
	}
	if (message.content.substring(0, 6) == '!pics ' || message.content.substring(0, 6) == '!full ' || message.content.substring(0, 7) == '!album '){
	if(message.content.includes('twitter.com/') && message.content.includes('/status/')) {
		var tweetId = message.content.substring(message.content.indexOf('/status/') + ('/status/').length).match(/[0-9]+/gm)[0];
		tweeter.get('statuses/show/' + tweetId, {
			tweet_mode: 'extended'
		}, function (error, tweet, response) {

			if (!error) {
				console.log(tweet);
				if (tweet.hasOwnProperty('extended_entities') && tweet.extended_entities.hasOwnProperty('media')) {
					for (var i = 1; i < tweet.extended_entities.media.length; i++) {
						message.channel.send({
							embed: {
								image: {
									url: tweet.extended_entities.media[i].media_url
								}
							}
						});
					}
				}
			} else {
				console.log(error);
			}
		})
	}
	if (message.content.includes('imgur.com/') && message.content.includes('/a/')) {
		var theAlbum = message.content.substring(message.content.indexOf('/a/') + ('/a/').length).match(/[0-9a-zA-Z]+/gm)[0];
		imgur.getAlbumInfo(theAlbum)
    .then(function(json) {
		for (var i = 0; i < Math.min(json.data.images.length, 10); i++) {
						message.channel.send({
							embed: {
								image: {
									url: json.data.images[i].link
								}
							}
						});
					}
    })
    .catch(function (err) {
        console.error(err.message);
    });		
	}
	if (message.content.includes('tumblr.com/post/')) {
		var hasBlogId = message.content.substring(0, message.content.indexOf('.tumblr')).match(/[A-Za-z0-9\-]+/gm);
		var blogId = hasBlogId[hasBlogId.length - 1];
		var postId = parseInt(message.content.substring(message.content.indexOf('/post/') + ('/post/').length).match(/[0-9]+/gm)[0]);
		console.log("am i doing this right?");
		tumblr.get('/posts', {hostname: blogId + '.tumblr.com', id : postId }, function(err, json){
			if (json.total_posts > 0){
  if (json.posts[0].type === 'photo'){
	  for(var i = 1; i < json.posts[0].photos.length; i++){
		  message.channel.send({embed: {
			  image: {
				  url: json.posts[0].photos[i].original_size.url
			  }
		  }
		  });
	  }
  }
			}
});		
	}
	}
	if (message.content.substring(0, 5) === '!list' || message.content.substring(0, 5) === '!todo') {
		var args = message.content.substring(5).split('\n'); //we split by line breaks
		if (args.length == 1) { //if there's no line breaks
			args = message.content.substring(5).split(','); //we split by commas
		}
		for (var i = 0; i < args.length; i++) { //go through each of the arguments
			if (args[i].length > 0 && (args[i].length < 3 || args[i].substring(0, 3) != '```')) //if the first character isn't an accent mark and the length of the argument is greater than 0
				message.channel.send('•' + args[i]); //send the list element
		}

	} else if (new RegExp(/font![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8)) || new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(8) + '\u200B';
		var game = message.content.substring(5, 7);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
			arg = arg.substring(2);
			style = message.content.charAt(7);
			size = message.content.charAt(8);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		var style = '0';
		var size = '2';
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {

			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt(8);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		if (game === 'ddr')
			game = 'DDR';
		if (game !== 'kof') {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 5); i++) {

				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.gameText(game, style, size, args[i])
							}
						}

					})
			}
		}
	} else if (new RegExp(/font![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10)) || new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
			arg = arg.substring(2);
			style = message.content.charAt(9);
			size = message.content.charAt(10);
		}
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 5); i++) {

					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.gameText(game, style, size, args[i])
								}
							}
						})
				}
	} else if (new RegExp(/font![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11)) || new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
			arg = arg.substring(2);
			style = message.content.charAt(10);
			size = message.content.charAt(11);
		}
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12)) || new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
			arg = arg.substring(2);
			style = message.content.charAt(11);
			size = message.content.charAt(12);
		}
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/font![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13)) || new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		var style = '0';
		var size = '2';
		if (new RegExp(/font![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
			arg = arg.substring(2);
			style = message.content.charAt(2);
			size = message.content.charAt(13);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.gameText(game, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}\W/gm).test(message.content.substring(0, 8)) || new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
		var arg = message.content.substring(8) + '\u200B';
		var game = message.content.substring(5, 7);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{2}[0-9]{2}\W/gm).test(message.content.substring(0, 10))) {
			arg = arg.substring(2);
			style = message.content.charAt(7);
			size = message.content.charAt(8);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}\W/gm).test(message.content.substring(0, 9))) {
		var arg = message.content.substring(9) + '\u200B';
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (game === 'ddr')
			game = 'DDR';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{3}[0-9]{2}\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var style = message.content.charAt(8);
		var size = message.content.charAt(9);
		var game = message.content.substring(5, 8);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		if (game === 'ddr')
			game = 'DDR';
		if (game === 'kof') {}
		else {
			var args = arg.match(/.{1,24}\W/gm);
			for (var i = 0; i < Math.min(args.length, 5); i++) {
				if (args[i].length > 0)
					message.channel.send({
						embed: {
							image: {
								url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
							}
						}
					}).then(console.log).catch(console.error);
			}
		}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}\W/gm).test(message.content.substring(0, 10)) || new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
		var arg = message.content.substring(10) + '\u200B';
		var game = message.content.substring(5, 9);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{4}[0-9]{2}\W/gm).test(message.content.substring(0, 12))) {
			arg = arg.substring(2);
			style = message.content.charAt(9);
			size = message.content.charAt(10);
		}
		if (game === 'njgd')
			game = 'niga'
				if (game === 'sfa3')
					game = 'sfz3'

						var args = arg.match(/.{1,24}\W/gm);
				if (game === 'pubu')
					args = arg.match(/.{1,34}\W/gm);
				if (game === 'sfz3' || game === 'vict' || game === 'moma')
					args = arg.match(/.{1,23}\W/gm);
				for (var i = 0; i < Math.min(args.length, 5); i++) {
					if (args[i].length > 0)
						message.channel.send({
							embed: {
								image: {
									url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
								}
							}
						}).then(console.log).catch(console.error);
				}
	} else if (new RegExp(/b[du][0-9][0-9]![a-z0-9]{5}\W/gm).test(message.content.substring(0, 11)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
		var arg = message.content.substring(11) + '\u200B';
		var game = message.content.substring(5, 10);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{5}[0-9]{2}\W/gm).test(message.content.substring(0, 13))) {
			arg = arg.substring(2);
			style = message.content.charAt(10);
			size = message.content.charAt(11);
		}
		if (game === 'kof2k')
			game = 'KoF2k';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}\W/gm).test(message.content.substring(0, 12)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
		var arg = message.content.substring(12) + '\u200B';
		var game = message.content.substring(5, 11);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{6}[0-9]{2}\W/gm).test(message.content.substring(0, 14))) {
			arg = arg.substring(2);
			style = message.content.charAt(11);
			size = message.content.charAt(12);
		}
		if (game.substring(0, 5) === 'kof2k')
			game = 'KoF2k' + game.charAt(5);
		if (game === 'ketsui')
			game = 'KETSUI';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				})
		}
	} else if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}\W/gm).test(message.content.substring(0, 13)) || new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
		var arg = message.content.substring(13) + '\u200B';
		var game = message.content.substring(5, 12);
		var pos = message.content.substring(2, 4);
		var dir = message.content.charAt(1);
		var style = '0';
		var size = '2';
		if (new RegExp(/b[du][0-9][0-9]![A-Za-z0-9]{7}[0-9]{2}\W/gm).test(message.content.substring(0, 15))) {
			arg = arg.substring(2);
			style = message.content.charAt(12);
			size = message.content.charAt(13);
		}
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: nfgUrl.bubble(game, dir, pos, style, size, args[i])
						}
					}
				}).then(console.log).catch(console.error);
		}
	}

	if (new RegExp(/font!kof97\W/gm).test(message.content.substring(0, 11))) {
		var arg = message.content.substring(11) + '\u200B';
		var args = arg.match(/.{1,24}\W/gm);
		for (var i = 0; i < Math.min(args.length, 5); i++) {
			if (args[i].charAt(args[i].length - 1) === '\n') {
				args[i] = args[i].substring(0, args[i].length - 1);
			}
			if (args[i].length > 0)
				message.channel.send({
					embed: {
						image: {
							url: 'https://nfggames.com/system/arcade/arcade.php/y-kof97/z-0/dbl-2/x-' + encodeURI(args[i] + '\u200B')
						}
					}
				})
		}
	}
	if (message.content.substring(0, 6) === '!time '){
		var city = message.content.substring(6);
		const citydata = cityTimezones.lookupViaCity(city);
		var tzname = citydata[0].timezone;
		message.channel.send(zone(tzname).toLocaleString());
	}
	if (message.content.substring(0, 8) === '!ZiV-id ') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + message.content.substring(8) + '#summary');
	}
	if (message.content.substring(0, 11) === '!ZiV-random') {
		message.channel.send('https://zenius-i-vanisher.com/v5.2/arcade.php?id=' + (Math.floor(Math.random() * 4000)+2).toString() + '#summary');
	}

	if (message.content.substring(0, 9) === '!commands') {
		message.channel.send('font commands\nTo find a font name, go to https://nfggames.com/games/fontmaker/, select the game you want, right click the text and hit view image, and what\'s next to the "y-" in the url is your game.' +
			'\nfont!gamename your text here - creates image of your text in the game\'s font\nb(u/d)(two digits)!game your text here to create a speech bubble going either up or down with the two digits determining the pointer position\nfont!game(two digits) your text here - that game with the first digit determining font style and second digit determining font size. also works for speech bubbles.\n' +
			/*'font!arcade - classic arcade\nfont!bios - BioShipPaladin\nfont!chiki - chiki chiki boys\nfont!ddcrew - DDCrew\nfont!DDR - Dance Dance Revolution\nfont!ddux - dynamite dux\nfont!fz - fantasy zone\nfont!gain - gain ground\nfont!garou - fatal fury\n' +
			'font!gradius - shoot the core\nfont!guar - guardians\nfont!kais - kaiser knuckle\nfont!kiki - kiki kaikai\nfont!kof97 - king of fighters 97\nfont!kof2k - king of fighters 2000\nfont!kof2k1 - king of fighters 2001\n' +
			'font!kof2k2 - king of fighters 2002\nfont!kof2k3 - king of fighters 2003\nfont!mt - major title\nfont!moma = monster maulers\nfont!namco2 - namco classic gradient\nfont!njgd - ninja gaiden\nfont!pabom - panic bomber\nfont!paro - parodius da\n' +
			'font!pubu - puzzle bobble\nfont!quake - quack\nfont!raph - rapid hero\nfont!robot - robotron\nfont!rtl - rtype leo\nfont!sexy - parodius\nfont!sf2 - street fighter 2\nfont!ssf2 - super street fighter 2\nfont!sfz3 or !sfa3 - street fighter zero\alpha 3\nfont!simp - the simpsons\n' +
			'font!sold - soldam\nfont!tetris - tetris (sega)\nfont!vict - victory road\n*/
			'\ngoogle maps commands\n!dir \"origin\" \"destination\" - prints directions from origin to destination\n!places \"search query\" - finds places of a type near a location (e.g. \"arcades in miami\")\n'+
			'\nother commands\n!full or !pics or !album followed by twitter/imgur/tumblr link - displays full photo album of tweet or imgur/tumblr post\n'+
			'hex#hexCode - displays image of a color pertaining to the hex cde\n!exif followed by link to jpg image or an attachment - prints out exif data of image\n'+
			'!list or !todo - splits discord message into a to-do list\n!ZiV-id (number) - gets arcade on Zenius-i-Vanisher with that number\n!ZiV-random - gets a random arcade on Zenius-i-Vanisher');
	}

});

client.login(process.env.BOT_TOKEN);
