var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogsSchema = new Schema({
    bId: {type: Schema.Types.ObjectId},
    bTitle:  {type: String},
    bMessage: {type: String},
    bPoster: {type: Schema.Types.ObjectId, ref : 'Player'},
    tID: {type: Schema.Types.ObjectId, ref : 'Team'}
});

var Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;