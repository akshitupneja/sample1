var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    eId: {type: Schema.Types.ObjectId},
    edate:  {type: Date},
    eTime: {type: Date},
    eType: {type: String, enum: ['Game', 'Training', 'Race', 'Social', 'Tournament', 'Meeting'], default: "Game"},
    eAddress : [{
        street: String,
        city : String,
        country : String,
        pinCode : String
    }],
    eVenue: String,
    eNotes:  Number,
    eCreator: {type: Schema.Types.ObjectId, ref : 'Player'}
});

var Events = mongoose.model('Event', eventsSchema);

module.exports = Events;