var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    pId: {type: Schema.Types.ObjectId},
    pfirstName: {type: String},
    plastName: {type: String},
    pBirthday: {type: Date, default: Date.now},
    pEmail: {type: String},
    pPassword: {type: String},
    pLoginType: {type: String, enum: ['Form', 'Google', 'Facebook'], default: "Form"},
    pAuthenticated: {type: Boolean, default: "false"},
    pAccountStatus: {type: Boolean, default: "true"},
    pAddress : [{
        street: String,
        city : String,
        country : String,
        pinCode : String
    }],
    pBio: {type: String},
    pHeight: {type: Number},
    pWeight: {type: Number}
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;