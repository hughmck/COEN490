require("dotenv").config({ path: 'config.env' })
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const User = require("./db_data/user")
const HCP = require("./db_data/hcp")
const zoomSdk = require('zoomus')
var cors = require('cors')

app.use(cors())
let MongoClient = require('mongodb').MongoClient;

mongoose
	.connect(process.env.ATLAS_URI, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true
	})
	.then(() => console.log("Database connected!"))
	.catch((err) => console.log(err))

	global.bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({
	  extended: true,
	  limit: '50mb',
	  parameterLimit: 100000
	}))
	app.use(bodyParser.json({
	  limit: '50mb',
	  parameterLimit: 100000
	}))

	var currentU
	app.post('/sign-up/user', (req, res) => {
		MongoClient.connect(process.env.ATLAS_URI, function(err, db) {
			currentU = req.body.email;
			var dba = db.db("DATA_FROM_EMAIL");
	    dba.collection('USER').insertOne(req.body, (err, data) => {
	        if(err) return console.log(err);
	        res.send(('saved to db: ' + data));
	    })
		});
	});

	var currentH
	app.post('/sign-up/HCP', (req, res) => {
		MongoClient.connect(process.env.ATLAS_URI, function(err, db) {
			currentH = req.body.email;
			var dbo = db.db("DATA_FROM_EMAIL");
	    dbo.collection('HCP').insertOne(req.body, (err, data) => {
	        if(err) return console.log("ERROR");
	        res.send(('saved to db: ' + data));
	    })

		});
	});
	app.post('/sign-in/HCP', (req, res) => {
		currentH = req.body.email;
	});

	app.post('/sign-in/user', (req, res) => {
		currentU = req.body.email;
	});


	app.post('/user/bookapt', (req, res) => {
		MongoClient.connect(process.env.ATLAS_URI, function(err, db) {
			var dbo = db.db("DATA_FROM_EMAIL");
			const query = { type: req.body.type, reason: req.body.reason };
  		dbo.collection('HCP').find(query).toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
			res.json(result)
			db.close()
  	});
		});
	});

	app.post('/user/bookapt/all', (req, res) => {
		MongoClient.connect(process.env.ATLAS_URI, function(err, db) {
			var dbo = db.db("DATA_FROM_EMAIL");
  		dbo.collection('HCP').find({}).toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
			res.json(result)
			db.close()
  	});
		});
	});



	app.post('/logout', (req, res) => {
			if(req.body.status == 'logout'){
				currentH = 'null'
				currentU ='null'
			}
	});

	var collection = function(currentU, currentH) {
	  if (currentU === undefined || currentU == 'null') {
	    return 'HCP';
	  } else {
	    return 'USER';
	  }

	};
	var current = function(currentU, currentH) {
	  if (currentU === undefined || currentU == 'null') {
	    return currentH;
	  } else {
	    return currentU;
	  }
	};


	app.get('/user/profile', (req, res) => {
	    MongoClient.connect(process.env.ATLAS_URI, function(err, db) {
	        if (err) throw err;
	        var dbo = db.db("DATA_FROM_EMAIL");
					console.log('api : ', current(currentU,currentH))
	        dbo.collection(collection(currentU,currentH)).findOne({
	            email: current(currentU,currentH)
	        },
	        function(err, result) {
	            if (err) throw err;
	            res.json(result);
	            db.close();
	        });
	    });
	});


const jwt = require('jsonwebtoken');

const zoompayload = {
  iss: 'h47ymZHRSWOpgdQCE79L9Q',
  exp: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
};

const secret = 'Z3qOFqQbVLlWfL1zunMlS34AYUy00bYHayjC';

const token = jwt.sign(zoompayload, secret);

const axios = require('axios');

const createMeeting = async (token, zoompayload2) => {
  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      zoompayload2,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


var meeting

const callCreateMeeting = async () => {
  const zoompayload2 = {
    topic: 'My Zoom Meeting',
    type: 2,
    start_time: '2022-12-31T12:00:00Z',
    duration: 60,
		host_email: 'test',
  };

  meeting = await createMeeting(token, zoompayload2);
};




app.post('/zoomid', async (req, res) => {
	console.log("USER :", meeting)
  res.json(meeting.join_url);
});

app.post('/zoomidHCP', async (req, res) => {
  await callCreateMeeting();
	console.log("HCP:", meeting)
  res.json(meeting.start_url);
});



/*

const newHCP = new HCP({
  name: "HCP",
  age: 23,
  isAdult: true,
})

newHCP.save().then(() => console.log("Saved new HCP"))
*/
const PORT = process.env.PORT || 4444

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
