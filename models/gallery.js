var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gallerySchema = new Schema({
    gId: {type: Schema.Types.ObjectId},
    gCaptionName:  {type: String},
    gPath: {type: String},
    gUploader: {type: Schema.Types.ObjectId, ref : 'Player'},
    tId: {type: Schema.Types.ObjectId, ref : 'Team'}
});

var Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;