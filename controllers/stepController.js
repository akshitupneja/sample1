var mongoose = require('mongoose'),
    Steps = mongoose.model("Stepcounter"),
    Team = mongoose.model("Team"),
    Member = mongoose.model("Member"),
    ObjectId = mongoose.Types.ObjectId



//add New Event into the Database
exports.insertStepCount = function(req, res, next) {

        
  
       var playerId = req.params.playerId,
        sDate = req.params.sDate,
        sCount = req.params.sCount;

    console.log('Adding Step Counter: ');

    Steps.update({ $and :
        [{"pId": playerId }, {"sDate": sDate}]}, { $set: { 'pId': playerId, 'sCount': sCount, 'sDate': sDate }}, {upsert: true, multi: true, safe:true}, function(err, result) {
        if (err) {
            console.log('Error updating user: ' + err);
            res.send({Status:'Error', Message: "Error while updating Steps"});
        } else {
        
            res.send({Status:'Success', Message: "Steps Updated", "Profile": result});
        }
    });

}




//Get Events detail by Id
exports.getStepbyPlayerAndDate = function(req, res, next) {

    var playerId = req.params.playerId,
    sDate = req.params.sDate;


    Steps.findOne({ $and :
        [{"pId": playerId }, {"sDate": sDate}]}, function(err,result){
        if(err) {
            throw err;
            console.log("Error while finding Event" + err);
        }
        if(!result){
            console.log("No Record found for the selected date" + req.params.sDate +" and Player id: " + req.params.playerId);
            res.send({Status:'Failure', Message: "No Record Found"});
        }else if (result){
            console.log("Record found for the selected date" + req.params.sDate +" and Player id: " + req.params.playerId);
            res.send({Status:'Success', Message: "Record Found","Step": result});
        }
     });
next();

}



//Get Events detail by Id
exports.getStepbyPlayer = function(req, res, next) {

    var playerId = req.params.playerId;


    Steps.find({"pId": playerId}, function(err,result){
        if(err) {
            throw err;
            console.log("Error while finding Event" + err);
        }
        if(!result){
            console.log("No Record found for the Player id: " + req.params.playerId);
            res.send({Status:'Failure', Message: "No Record Found"});

        }else if (result){
            console.log("Record found for the Player id: " + req.params.playerId);
            res.send({Status:'Success', Message: "Record Found","Step": result});
        }
     });
next();

}

    
