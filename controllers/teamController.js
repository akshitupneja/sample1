var mongoose = require('mongoose'),
    Team = mongoose.model("Team"),
    Player = mongoose.model("Player"),
    Member = mongoose.model("Member"),
    ObjectId = mongoose.Types.ObjectId

//Create Team
exports.createTeam = function (req, res, next) {
    var team = new Team({
        "tName": req.params.tName,
        "tSports": req.params.tSports,
        "tGender": req.params.tGender,  
        "tAgeGroup": req.params.tAgeGroup,
        "tAddress": req.params.tAddress,
        "tPic": req.params.tPic,
        "tCaptain": req.params.playerId
    });

    console.log("playerId: " + req.params.playerId);

    console.log('Adding Team: ' + JSON.stringify(team));
    team.save(function (err) {
        if (err) {
            res.send({ 'Status': 'Error', 'Message': err });
        } else if (team.tName == "") {
            console.log("Empty Team Name, Sending Error Message");
            res.send({ 'Status': 'Error', "Message": "Empty Team Name" });
        } else if (team.tSports == "") {
            console.log("Empty Team Sports, Sending Error Message");
            res.send({ 'Status': 'Error', "Message": "Empty Team Sports" });
        }
        else {
            console.log("Response Sent: %s", team);
            res.send({ 'Status': 'Success', "Message": "Team has been added successfully", "Team": team });
            console.log("Team Id = " + team.id + "Player Id = " + req.params.playerId);
            console.log("Adding record to Members Table with Player ID: " + req.params.playerId);
            
            var status = "Captain"
            if (req.params.playerId == null) {
                console.log("Cannot insert record in Member due to null player Id");

            } else {
                var mappingId = insertMember(team._id, req.params.playerId, status);
                console.log("Record Inserted in Members with Member ID :" + mappingId);
            }


        }
    });

}

//Get Team

exports.viewTeambyId = function (req, res, next) {
    Team.findById(new ObjectId(req.params.id), function (err, team) {
        if (err) {
            res.send({ 'Status': 'Error', 'Message': err });
        } else {
            if (team) {
                res.send({ 'Status': 'Success', "Message": "Team Found", "Team": team });
            } else {
                res.send({ 'Status': 'Failure', "Message": "Team: " + req.params.id + " not found" });
            }
        }
    });
}



//Map A Creator of the Team as Captain
function insertMember(teamId, playerId, status) {

    let member = new Member({
        "tId": teamId,
        "pId": playerId,
        "mStatus": status
    });

    console.log('Adding Team:  Player' + playerId + "Team Id : " + teamId + "  Status: " + status);
    member.save(function (err) {
        if (err) {
            console.log("Error while Adding Member");
        }
        else {
            console.log('Adding Team:  Player' + playerId + "Team Id : " + teamId + "  Status: " + status);
            console.log('Adding Team:  Member :' + member.id);


        }
    });
    return member.id
}


var allTeam = [];
var result = [];



//Get All Teams for a player

exports.viewTeambyPlayer = function (req, res, next) {

    var playerId = req.params.playerId;

    console.log('Player ID : ' + playerId);



    Member.find({"pId": new ObjectId(req.params.playerId)}, { "tId": 1, "_id": 0 }, function (err, member) {
        if (err) throw err;
        if (!member) {
            console.log("Mapping not found in Members Table, Player ID : " + req.params.playerId);
            //         //console.log("Id" + req.params._id);

            //     //  res.send({Status:'Error', Message: "Authentication failed. User not found."});

        } else if (member) {

            var temp = JSON.stringify(member);
            temp = JSON.parse(temp);
            console.log("Length " + temp.length);
            for (i = 0; i < temp.length; i++) {
                var newTemp = temp[i];
                console.log(newTemp.tId);
                allTeam[i] = newTemp.tId;
                //newTemp = JSON.parse(newTemp);
            }
            console.log("Mapping  found in Members Table, Player ID : " + req.params.playerId);
            console.log("Member List : " + allTeam);



            Team.find({
                    "_id": { $in: allTeam }
                }, function (error, team) {
                    if (!team) {
                        console.log(" No Team found " );
                    } else if (team) {
                      //  result.push(team);
                        console.log(" Team found, Result is :" + team);
                        res.send({ "team": team });
                    }
                });

            // for (var x in allTeam) {
            //     val = allTeam[x];
            //     Team.find({
            //         "_id": new ObjectId(val)
            //     }, function (error, team) {
            //         if (!team) {
            //             console.log(" No Team found with id : " + val);
            //         } else if (team) {
            //             result.push(team);
            //             console.log(" Team found, Result is :" + team);
            //         }
            //     });
            // }



            //console.log(" Result is111111 :" + result);

            //res.send({"team":result});
        }

    });
}


// Add a Player into a Team

exports.addMemberToTeam = function (req, res, next) {
    
    var captain = req.params.captain;
    var team = req.params.teamId;
    var player = req.params.player;

    console.log("Captain: " + captain);
    console.log("Team: " + team);
    console.log("Player to be added: " + player);
    console.log("Adding Member to team :" );
    
    Team.find({ $and :
        [{"tCaptain": captain }, {"_id": team}]}, function(err, result) {
        if (err) throw err;
        if (result.length == 0) {

            console.log("No Team found. Sending response");
            res.send({Status:'Error', Message: "Only Captains are authorized to add players in team "});

        } else if (result) {

            Member.find({ $and :
                [{"tId": team }, {"pId": player}]}, function (err, abc) {
                if (err) {
                    res.send({ 'Status': 'Error', 'Message': err });
                } else {
                    if (abc.length != 0) {
                        res.send({ 'Status': 'Failure', "Message": "PLayer is already in the team"});
                        console.log("asabsdsa");
                        console.log("Player in the team with memberId : "+abc);
                          
                    } else {
                        var memberId = insertMember(team, player, "Player");
                        console.log("Player added to team wih memberId :" +memberId);
                        res.send({Status:'Success', Message: "Player added to the team"});
                    }
                }
            });
  
          
        }
      });   

      next();
}




//Get Players in the Team
exports.viewPlayersInTeam = function (req, res, next) {

    var allPlayer = [];
    
    Member.find({"tId": new ObjectId(req.params.teamId)}, { "pId": 1, "_id": 0 }, function (err, member) {
        if (err) throw err;
        if (member.length == 0) {
            console.log("Mapping not found in Members Table, Team ID : " + req.params.teamId);
    

        } else if (member.length) {

            var temp = JSON.stringify(member);
            temp = JSON.parse(temp);
            console.log("Length " + temp.length);
            for (i = 0; i < temp.length; i++) {
                var newTemp = temp[i];
                console.log(newTemp.pId);
                allPlayer[i] = newTemp.pId;
                //newTemp = JSON.parse(newTemp);
            }
            console.log("Mapping  found in Members Table, Team ID : " + req.params.teamId);
            console.log("Member List : " + allPlayer);



            Player.find({ "_id": { $in: allPlayer }}, function (error, player) {
                if (!player) {
                    console.log(" No player found " );
                } else if (player) {
                
                    console.log(" Team found, Result is :" + player);
                    res.send({ "Team": player });
                }
            });
            
        }

    });

}


