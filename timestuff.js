

var cityTimezones = require('./citytime.js');
var timezone = require('node-google-timezone');

function pad(n) {
	if (n < 10)
		return "0" + n.toString();
	else
		return n.toString();
}
function cityTime(message) {
	var city = message.content.substring(7);
	const citydata = cityTimezones.lookupViaCity(city);
	try {
		var lati = citydata[(city.toLowerCase() === 'london' || city.toLowerCase() === 'san antonio') ? 1 : 0].lat;
		var lngi = citydata[(city.toLowerCase() === 'london' || city.toLowerCase() === 'san antonio')  ? 1 : 0].lng;
		var timestamp = Date.now() / 1000;
		timezone.data(lati, lngi, timestamp, function (err, tz) {
			if (!err) {
				var d = new Date(tz.local_timestamp * 1000);
				message.channel.send(d.toDateString() + ' - ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
			} else {
				message.channel.send(err);
			}

		});
	} catch (error) {
		message.channel.send('Error: ' + error.message);
	}

}

function localcityTime(message, city) {
	const citydata = cityTimezones.lookupViaCity(city);
	try {
		var lati = citydata[city === 'London' ? 1 : 0].lat;
		var lngi = citydata[city === 'London' ? 1 : 0].lng;
		var timestamp = Date.now() / 1000;
		timezone.data(lati, lngi, timestamp, function (err, tz) {
			if (!err) {
				var d = new Date(tz.local_timestamp * 1000);
				message.channel.send(d.toDateString() + ' - ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
			} else {
				message.channel.send(err);
			}

		});
	} catch (error) {
		message.channel.send('Error: ' + error.message);
	}

}

module.exports = (message, content, herokupg) => {
	if (content.toLowerCase().substring(0, 9) === '!settime ' && content.length > 9) {
			var city = content.substring(9).replace(/[^A-Za-z ]+/gm, '');
			console.log('INSERT INTO localtimes(user_id, city_name) VALUES (\'' + message.author.id + '\',\'' + city + '\')ON CONFLICT (user_id) DO UPDATE SET city_name = EXCLUDED.city_name;');
			herokupg.query('INSERT INTO localtimes(user_id, city_name) VALUES (\'' + message.author.id + '\',\'' + city + '\')ON CONFLICT (user_id) DO UPDATE SET city_name = EXCLUDED.city_name;', (err, res) => {
				if (!err) {
					console.log(res);
					message.channel.send('Beabo bee! (Local time set for <@' + message.author.id + '>)');
				} else
					console.log(err);
			});
		}

		if (content.substring(0, 11) === '!gettime <@' && content.length > 9) {
			var id = content.substring(11).replace(/[^0-9]/gm, '');
			herokupg.query('SELECT city_name FROM localtimes WHERE user_id = \'' + id + '\';', (err, res) => {
				if (!err) {
					console.log(res);
					if (res.rows.length > 0){
					localcityTime(message, res.rows[0].city_name);
					} else {
						message.channel.send('Bee bee! (error. could not find local time for <@' + id + '>)');
					}
				} else
					console.log(err);
			});
		}
		
		if (content.substring(0, 6) === '!time ') {
			cityTime(message);
		}
}