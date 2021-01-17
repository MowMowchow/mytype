var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// Mongo Connections
//var { MongoClient } = require("mongodb");
getConnection = async () => {
    const MONGODB_URI = 'mongodb+srv://jason:Fuadisnot123@mytype.wfzap.mongodb.net/MyType?retryWrites=true&w=majority';
    try {
        await mongoose.connect(MONGODB_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connection to DB Successful');
    } catch (err) {
        console.log('Connection to Db Failed');
    }
}

getConnection();


// production for build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
} 



//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
  });
  

// Body parser prereqs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var User = require('./models/User_Model');

const { response } = require('express');


app.post('/newuser', function(req, res){
    const user = new User({Username: req.body.Username, Email: req.body.Email, Alphabet: req.body.Alphabet, wpm_pb: req.body.wpm_pb});
    user.save(function(err, savedUser){
        if(err){
            res.status(500).send({error: "Could not upload user"});
        } else {
            res.send(savedUser);
        }
    });
});


app.post('/getuser', function(req, res){
    User.find({Email: req.body.Email}, function(err, user_data){
        if (err){
            res.status(500).send({error:'Could not find user'});
        } else {
            console.log('found user');
            res.status(200).send(user_data[0]);
        }
    });
})









app.listen(PORT, console.log('server hosted at {PORT}'));