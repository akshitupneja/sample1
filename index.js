
//PRE REQUISITES
var mongoose = require('mongoose');
var restify = require('restify');
var async = require('async');





//Database models
var Player = require(__dirname + "/models/players");
var Team = require(__dirname + "/models/teams");
var Events = require(__dirname + "/models/events");
var Blogs = require(__dirname + "/models/blogs");
var Gallery = require(__dirname + "/models/gallery");
var Members = require(__dirname + "/models/members");
var StepCounter = require(__dirname + "/models/stepCounter");




//Controllers
var teamController = require(__dirname + "/controllers/teamController");
var playerController = require(__dirname + "/controllers/playerController");
var eventController = require(__dirname + "/controllers/eventController");
var stepController = require(__dirname + "/controllers/stepController");


//connection string for hosted MongoDB
var mongoDB = 'mongodb://dbuser:dbuser@sporties-shard-00-00-cl2y2.mongodb.net:27017,sporties-shard-00-01-cl2y2.mongodb.net:27017,sporties-shard-00-02-cl2y2.mongodb.net:27017/SPORTIES?ssl=true&replicaSet=Sporties-shard-0&authSource=admin';

 //SERVER INFO CONFIG
var SERVER_NAME = 'sporties';  
var PORT = process.env.PORT|| 3000;
var HOST = 'https://sporties.herokuapp.com/';

// Create the restify server
server = restify.createServer({ name: SERVER_NAME });



//Connect to Hosted DB
mongoose.connect(mongoDB, {useMongoClient: true});
var db = mongoose.connection; //store Database connection

server.listen(PORT, function () {
    console.log("Server stared at %s", server.url);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //IF DB Connection succesfull start server at predifined parametrs
    console.log("DB Connection established");
});




// Allow the use of POST
server.use(restify.fullResponse());

// Maps req.body to req.params so there is no switching between them
server.use(restify.bodyParser());

//**************** METHODS ******************************

// Team Start
server.post("/api/:playerId/teams", teamController.createTeam);
server.get("/api/team/:id", teamController.viewTeambyId);
server.get("/api/:playerId/view/teams", teamController.viewTeambyPlayer);
server.post("/api/:captain/teams/:teamId/add/:player", teamController.addMemberToTeam);
server.get("/api/team/:teamId/players", teamController.viewPlayersInTeam);
server.del("/api/:captain/teams/:teamId/delete/:player", teamController.removePlayerfromTeam);
server.del("/api/:captain/teams/:teamId/terminate", teamController.terminateTeam);
server.put("/api/:playerId/teams/:teamId", teamController.updateTeambyId);






// //Events

// server.post("/api/:playerId/teams", teamController.createTeam);
// server.get("/api/viewTeam/:id", teamController.viewTeambyId);
server.post("/api/:playerId/teams/:teamId/events", eventController.createEvent);
server.get("/api/:playerId/teams/:teamId/events", eventController.getEventbyPlayerAndTeam);
server.get("/api/:playerId/teams/:teamId/events/:eventId", eventController.getEventbyId);
server.del("/api/:playerId/teams/:teamId/events/:eventId", eventController.deleteEvent);

console.log("qbc");

//Login User
server.post("/api/players", playerController.addUser);
server.post("/api/player/login", playerController.loginUser);
server.put("/api/player/:id", playerController.updateUser);
server.put("/api/player/:id/password", playerController.updatePassword);
server.put("/api/player/:id/fingerprint", playerController.updateFingerPrint);
server.put("/api/player/:id/name", playerController.updateName);
server.put("/api/player/:id/address", playerController.updateAddress);
server.put("/api/player/:id/height", playerController.updateHeight);
server.put("/api/player/:id/weight", playerController.updateWeight);
server.put("/api/player/:id/pic", playerController.updatePic);
server.put("/api/player/:id/birthday", playerController.updateBirthday);
server.put("/api/player/:id/bio", playerController.updateBio);
server.put("/api/player/:id/email", playerController.updateEmail);
server.put("/api/player/:id/phone", playerController.updatePhone);
server.post("/api/player/login/social", playerController.loginUserGoogle);
server.get("/api/player/search/:name", playerController.searchUser);
server.get("/api/player/:id", playerController.viewPlayerbyId);



//StepCounter
server.put("/api/player/:playerId/steps", stepController.insertStepCount);
server.get("/api/player/:playerId/steps", stepController.getStepbyPlayer);
server.get("/api/player/:playerId/stepsbydate", stepController.getStepbyPlayerAndDate);

module.exports = server;
