var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    eId: {type: Schema.Types.ObjectId},
    eName:  {type: String},
    edate:  {type: String},
    eTime: {type: String},
    eType: {type: String, enum: ['Game', 'Training', 'Race', 'Social', 'Tournament', 'Meeting'], default: "Game"},
    eAddress : {type : String},
    eVenue: String,
    eNotes:  String,
    tId:{type: Schema.Types.ObjectId, ref : 'Team'},
    eCreator: {type: Schema.Types.ObjectId, ref : 'Player'}
});

var Events = mongoose.model('Event', eventsSchema);

module.exports = Events;