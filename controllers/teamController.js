var mongoose = require('mongoose'),
Team = mongoose.model("Team"),
ObjectId = mongoose.Types.ObjectId

//Create Team
exports.createTeam = function(req, res, next) {
    var team = new Team({
        "tName": req.params.tName,
        "tSports": req.params.tSports,
        "tGender": req.params.tGender,
        "tAgeGroup": req.params.tAgeGroup,
        "tAddress": req.params.tAddress,
        "tPic": req.params.tPic
    });
    

    console.log('Adding Team: ' + JSON.stringify(user));
    team.save(function (err) {
        if (err) {
            res.send({'Status':'Error','Message':err});
        } else {
            console.log("Response Sent: %s", team);
            res.send({'Status':'Success',"Message":"Team has been added successfully","Team":team});
        }
    });

}

//Get Team

exports.viewTeam = function(req, res, next) {
    Team.findById(new ObjectId(req.params.id), function(err, team) {
        if (err) {
            res.send({'Status':'Error','Message':err});
        } else {
            if (team) {
                res.send({'Status':'Success',"Message":"Team Found","Team":team});
            } else {
                res.send({'Status':'Failure',"Message":"Team: " + req.params.id + " not found"});
            }
        }
    })
}