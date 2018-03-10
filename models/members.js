var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var membersSchema = new Schema({
    mId: {type: Schema.Types.ObjectId},
    tId: {type: Schema.Types.ObjectId}, ref: 'Team',
    pId: {type: Schema.Types.ObjectId,ref: 'Player'},
    mStatus: {type: String, enum: ['Captain', 'Player'], default: "Player"}
});

var Member = mongoose.model('Member', membersSchema);

module.exports = Member;