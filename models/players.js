var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    pId: {type: Schema.Types.ObjectId},
    pFirstName:  String,
    pLastName: String,
    pBirthday: {type: Date, default: Date.now()},
    pEmail: String,
    pPassword: String,
    pLoginType: {type: String, enum: ['Form', 'Google', 'Facebook'], default: "Form"},
    pAuthenticated: {type: Boolean, default: "false"},
    pAccountStatus: {type: Boolean, default: "true"},
    pAddress : [{
        street: String,
        city : String,
        country : String,
        pinCode : String
    }],
    pBio: String,
    pHeight:  Number,
    pWeight: Number
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;