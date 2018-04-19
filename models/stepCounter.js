var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stepSchema = new Schema({
    sId: {type: Schema.Types.ObjectId},
    pId:  {type: String, ref : 'Player'},
    sDate:  {type: String},
    sCount: {type: Number}
});

var Stepcounter = mongoose.model('Stepcounter', stepSchema);

module.exports = Stepcounter;

