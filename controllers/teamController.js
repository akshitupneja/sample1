var mongoose = require('mongoose'),
Team = mongoose.model("Team"),
Member = mongoose.model("Member"),
ObjectId = mongoose.Types.ObjectId

//Create Team
exports.createTeam = function(req, res, next) {
    var team = new Team({
        "tName": req.params.tName,
        "tSports": req.params.tSports,
        "tGender": req.params.tGender,
        "tAgeGroup": req.params.tAgeGroup,
        "tAddress": req.params.tAddress,
        "tPic": req.params.tPic,
        "pId": req.params.pId
        
    });
    
    console.log("pId" + req.params.pId);

    console.log('Adding Team: ' + JSON.stringify(team));
    team.save(function (err) {
        if (err) {
            res.send({'Status':'Error','Message':err});
        }else if(team.tName == "") {
            console.log("Empty Team Name, Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty Team Name"});
        }else if(team.tSports == "") {
            console.log("Empty Team Sports, Sending Error Message");
            res.send({'Status':'Error',"Message":"Empty Team Sports"});
        }
        else {
            console.log("Response Sent: %s", team);
            res.send({'Status':'Success',"Message":"Team has been added successfully","Team":team});
            console.log("Team Id = "+ team.id + "Player Id = "+ req.params.pId);
            var status = "Captain"
            var mappingId = insertMember(team._id,req.params.pId,status);
            console.log("Record Inserted in Members with Member ID :"+ mappingId);
        
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



//Map A Creator of the Team as Captain
function insertMember(teamId,playerId,status){

    let member = new Member({
    "tId": teamId,
    "pId": playerId,
    "mStatus": status
    });

    console.log('Adding Team:  Player' + playerId + "Team Id : "  + teamId+ "  Status: " + status);
    member.save(function (err) {
        if (err) {
            console.log("Error while Adding Member");
        }
        else {
            console.log('Adding Team:  Player' + playerId + "Team Id : "  + teamId+ "  Status: " + status);
            console.log('Adding Team:  Member :' + member.id);
            
        
        }
    });
    return member.id
}