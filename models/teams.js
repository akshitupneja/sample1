var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
    tId: {type: Schema.Types.ObjectId},
    tName: {type: String},
    tSports: {type: String},
    tGender: {type: String, enum: ['Male', 'Female', 'Both'], default: "Male"},
    tAgeGroup: {type: String, enum: ['Under 13', '13 - 18', '18+'], default: "18+"},
    tAddress : {type: String},
    tPic: {type: String},
    tCaptain: {type: Schema.Types.ObjectId, ref: 'Player'},
    created_at: {type: Date, default: Date.now()}
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;