var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    pId: {type: Schema.Types.ObjectId},
    pFirstName:  String,
    pLastName: String,
    pBirthday: {type: String, default: Date.now()},
    pEmail: {type: String, unique: true},
    pPassword: String,
    pPhone: Number,
    pLoginType: {type: String, enum: ['Form', 'Google', 'Facebook'], default: "Form"},
    pAuthenticated: {type: Boolean, default: "false"},
    pAccountStatus: {type: Boolean, default: "true"},
    pAddress : {type: String},
    pBio: String,
    pHeight:  Number,
    pWeight: Number,
    pPic: String,
    pAndroidId: String,
    created_at: {type: Date, default: Date.now()}
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;