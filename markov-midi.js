const MidiPlayer = require('midi-player-js');
const MidiWriter = require('midi-writer-js');
const request = require('request').defaults({
		encoding: null
	});
var Player = new MidiPlayer.Player(function(event) {
    console.log(event);
});	
module.exports = (message, content, herokupg) => {
	
	if (message.attachments.array().length > 0 && message.attachments.array()[0].url.includes('.mid')){
		request.get(message.attachments.array()[0].url, function (err, res, body) {
							Player.loadArrayBuffer(body);
console.log(JSON.stringify(Player.getEvents()).length);							
console.log(JSON.stringify(Player.getEvents()));
							
							});
	}
	if (content.startswith('b!makemidi')){
		var track = new MidiWriter.Track();
 
// Define an instrument (optional):
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));
 
// Add some notes:
var note = new MidiWriter.NoteEvent({pitch:['C4', 'D4', 'E4'], duration: '4'});
track.addEvent(note);
 
// Generate a data URI
var write = new MidiWriter.Writer([track]);
console.log(write.buildFile);
		
	}
}