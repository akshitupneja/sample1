var mongoose = require('mongoose'),
    Team = mongoose.model("Team"),
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
        "pId": req.params.playerId,
        "tCaptain": req.params.playerId

    });

    console.log("pId" + req.params.pId);

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
            console.log("Team Id = " + team.id + "Player Id = " + req.params.pId);
            var status = "Captain"
            if (req.params.pId == null) {
                console.log("Cannot insert record in Member due to null player Id");

            } else {
                var mappingId = insertMember(team._id, req.params.pId, status);
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
var response1;


//Get All Teams for a player

exports.viewTeambyPlayer = function (req, res, next) {

    var playerId = req.params.playerId;

    console.log('Player ID : ' + playerId);



    Member.find({
        "pId": new ObjectId(req.params.playerId)
    }, { "tId": 1, "_id": 0 }, function (err, member) {
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



            //response1 = findTeams(allTeam);


            Team.find({
                    "_id": { $in: allTeam }
                }, function (error, team) {
                    if (!team) {
                        console.log(" No Team found with id : " + val);
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

function findTeams(allTeam) {


    return result;

};