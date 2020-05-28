const express = require('express')
const bodyParser  = require('body-parser');
const SocketIo = require('socket.io')
const app = express()
const socketEvents = require('./socket.js')
const mongoose = require('mongoose');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const voteRouter = require('./routes/vote');

const router = express.Router();

const VoteSchema = require('./models/vote');


var Client = require('mongodb').MongoClient;
/*
Client.connect('mongodb://localhost:27017/biseo', function(error, client){
    if(error) {
        console.log(error);
    } else {
        var database = client.db('votes');
	io.on("connection", socket => {
		console.log("New client connected" + socket.id);

		socket.on("startVote", (socket) => {
    		database.collection('votes').find({}, function (findErr, result) {
        		if (findErr) throw findErr;
        		console.log(result);
    		});
  		});

		socket.on("disconnect", () => {
    		console.log("user disconnected");
  			});
	});
    }
});
*/
app.use(cors());

//db(); // 실행
// this is our MongoDB database
const dbRoute =
  "mongodb://localhost:27017/biseo";

const options = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
};

// connects our back end code with the database

mongoose.connect(dbRoute, options);
let db = mongoose.connection;

db.once('open', () => console.log("connected to the database"));

//const collection_votes = db.get("votes");

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'build')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
app.use('/api/v1/votes', voteRouter);

const port = 8000;

// app.get('/',(req,res)=>{
//    res.sendFile(__dirname + '/static/index.html')
//})

const server = app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})

const io = SocketIo(server)
/*
Client.connect('mongodb://localhost:27017/biseo', function(error, client){
    if(error) {
        console.log(error);
    } else {
	var database = client.db('votes');
    io.on("connection", socket => {
        console.log("New client connected" + socket.id);
        socket.on("startVote", (socket) => {
			console.log("socket:"+socket.name);
        	var cursor = database.collection('votes').findOne({_id : "5ecf75d08a12b346c510ef9b"});
			cursor.then((doc) => {
				console.log("doc:"+doc);
    		})
			client.close();
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
		});
    });
    }
});
*/

//const io = SocketIo(server)
io.on("connection", socket => {
  console.log("New client connected" + socket.id);
  //console.log(socket);

  socket.on("initial_data", () => {
//    collection_votes.find({}).then(docs => {
//      io.sockets.emit("get_data", docs);
//    });
  });

  socket.on("startVote", (socket) => {
	Client.connect('mongodb://localhost/biseo', { useNewUrlParser: true, useUnifiedTopology: true })
		.then(function(client){
    		var database = client.db("biseo");
			database.collection('votes').findOne({name: socket.name}, function (findErr, result) {
				if (findErr) throw findErr;
				io.sockets.emit("get_data", result);
				client.close();
			});
  		})
		.catch(function (err) {console.log(err)});
  });

/*  socket.on("putOrder", order => {
    collection_votes
      .update({ _id: order._id })
      .then(updatedDoc => {
        io.sockets.emit("change_data");
      });
  });
*/
  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//socketEvents(io)
