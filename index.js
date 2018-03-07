
//PRE REQUISITES
var mongoose = require('mongoose');
var restify = require('restify');



//Database models
var Player = require(__dirname + "/models/player");
var Team = require(__dirname + "/models/teams");

//Controllers
var teamController = require(__dirname + "/controllers/teamController");

console.log("%s", Player);
console.log("%s", Team);

//connection string for hosted MongoDB
var mongoDB = 'mongodb://dbuser:dbuser@sporties-shard-00-00-cl2y2.mongodb.net:27017,sporties-shard-00-01-cl2y2.mongodb.net:27017,sporties-shard-00-02-cl2y2.mongodb.net:27017/SPORTIES?ssl=true&replicaSet=Sporties-shard-0&authSource=admin';

 //SERVER INFO CONFIG
var SERVER_NAME = 'sporties';  
var PORT = process.env.PORT;
var HOST = 'https://sampleakki.herokuapp.com/';

// Create the restify server
server = restify.createServer({ name: SERVER_NAME });



//Connect to Hosted DB
mongoose.connect(mongoDB);
var db = mongoose.connection; //store Database connection

server.listen(PORT, function () {
    console.log("Server stared at %s", server.url);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //IF DB Connection succesfull start server at predifined parametrs
    console.log("DB Connection established");
});




//**************** METHODS ******************************

// Team Start
server.post("/api/createTeam", teamController.createTeam)
server.get("/api/viewTeam/:id", teamController.viewTeam)
// Team End







