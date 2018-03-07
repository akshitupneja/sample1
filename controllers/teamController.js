var mongoose = require('mongoose'),
Team = mongoose.model("Team"),
ObjectId = mongoose.Types.ObjectId

//Create Team
exports.createTeam = function(req, res, next) {
    var teamModel = new Team(req.body);
    teamModel.save(function(err, team) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            console.log("PASSED");
            res.json({
                type: true,
                data: team
            })
        }
    })
}

//Get Team

exports.viewTeam = function(req, res, next) {
    Team.findById(new ObjectId(req.params.id), function(err, team) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                res.json({
                    type: true,
                    data: team
                })
            } else {
                res.json({
                    type: false,
                    data: "Team: " + req.params.id + " not found"
                })
            }
        }
    })
}