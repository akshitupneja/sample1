var mongoose = require('mongoose'),
    Event = mongoose.model("Events"),
    Team = mongoose.model("Team"),
    Member = mongoose.model("Member"),
    ObjectId = mongoose.Types.ObjectId



//add New Event into the Database
exports.createEvent = function(req, res, next) {

        
    var event = new Event({
        "eName": req.params.eName,
        "eDate": req.params.edate,
        "eTime": req.params.eTime,
        "eType": req.params.eType,
        "eAddress": req.params.eAddress,
        "eVenue": req.params.eVenue,
        "eNotes": req.params.eNotes,
        "tId": req.params.teamId,
        "eCreator": req.params.playerId
    });
    console.log('Adding Event: ' + JSON.stringify(event));

    event.save(function (err) {
        if (err) {
            res.send({ 'Status': 'Error', 'Message': err });
        }
        else {
            console.log("Response Sent: %s", event);
            res.send({ 'Status': 'Success', "Message": "Event has been added successfully", "Event": event });
        }
    });

next();

}




//Get All Events for a by Player and Team
exports.getEventbyPlayerAndTeam = function(req, res, next) {
    Event.find({"eCreator": new ObjectId(req.params.playerId),"tId": new ObjectId(req.params.teamId)}, function(err,events){
        if(err) {
            throw err;
            console.log("Error while finding Event" + err);
        }
        if(!events){
            console.log("No Event found with team id" + req.params.teamId +" and Player id: " + req.params.playerId);

        }else if (events){
            console.log("Event found with team id" + req.params.teamId +" and Player id: " + req.params.playerId);
            console.log('Player document updated with data ' + JSON.stringify(events));
            res.send({Status:'Success', Message: "Events Found","Profile": events});
        }
     });
next();

}


//Get Events detail by Id
exports.getEventbyId = function(req, res, next) {
    Event.findOne({"_id": new ObjectId(req.params.eventId),"tId": new ObjectId(req.params.teamId)}, function(err,events){
        if(err) {
            throw err;
            console.log("Error while finding Event" + err);
        }
        if(!events){
            console.log("No Event found with team id" + req.params.teamId +" and Event id: " + req.params.eventId);

        }else if (events){
            console.log("Event found with team id" + req.params.teamId +" and Event id: " + req.params.eventId);
            res.send({Status:'Success', Message: "Event Found","Event": events});
        }
     });
next();

}




//Update user by his/her id and requested field.
exports.updateEvent = function(req, res) {
    var eventId = req.params.eventId;
    var playerId = req.params.eventId;
    var id = req.params.eventId;
    var event = req.body;
    console.log('Updating Player: ' + id);
    console.log(' Player data to be updated: ' + JSON.stringify(user));
    console.log(JSON.stringify(user));


        Event.update({'_id':new ObjectId(id),}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({Status:'Error', Message: "Error while updating Event"});
            } else {
                console.log('Player document updated with data ' + JSON.stringify(event));
                res.send({Status:'Success', Message: "Event Updated","Event": event});
            }
        });
   
}
    

    
