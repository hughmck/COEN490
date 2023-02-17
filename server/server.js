require("dotenv").config({ path: 'config.env' })
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path');
const User = require("./db_data/user")
const HCP = require("./db_data/hcp")
const zoomSdk = require('zoomus')
var cors = require('cors')
const { ObjectId } = require('mongodb')

app.use(cors())
let MongoClient = require('mongodb').MongoClient;

mongoose
	.connect(process.env.ATLAS_URI, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true
	})
	.then(() => console.log("dataDB connected!"))
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
  res.json(meeting.join_url);
});

var zoomStart
var zoomJoin

app.post('/zoomidHCP', async (req, res) => {
  await callCreateMeeting();
  res.json(meeting.start_url);
	zoomStart = meeting.start_url;
	zoomJoin = meeting.join_url;
});

app.post('/user/booked', (req, res) => {
	MongoClient.connect(process.env.ATLAS_URI2, function(err, db) {
		const HCPbooked = {
			Username : 'null',
	    user: current(currentU,currentH),
			HCP : req.body.HCPemail,
			HCPfirstname : req.body.HCPfirstname,
			HCPlastname: req.body.HCPlastname,
			zoomid : 'null',
			date:'2023, 2,22,0'
	  };
		var dbo = db.db("CONNECT");
		dbo.collection('zoom').insertOne(HCPbooked, (err, data) => {
				if(err) return console.log("ERROR");
				res.send(('saved to db: ' + data));
		})

	});
});

app.post('/user/viewapts', (req, res) => {
	MongoClient.connect(process.env.ATLAS_URI2, function(err, db) {
		var dbo = db.db("CONNECT");
		dbo.collection('zoom').find({user: currentU}).toArray(function(err, result) {
		if (err) throw err;
		res.json(result)
		db.close()
	});
	});
});

app.post('/user/cancel', (req, res) => {
	MongoClient.connect(process.env.ATLAS_URI2, function(err, db) {
		var dbo = db.db("CONNECT");
		dbo.collection('zoom').deleteOne({ _id: ObjectId(req.body.id) }, function(err, result) {
    if (err) throw err;
		db.close();
  	});
	});
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

app.post('/user/profile/image', upload.single('file'), (req, res) => {
  res.send(req.file.filename);
	console.log(req.file.filename)
});

app.post('/HCP/calendar', (req, res) => {
	MongoClient.connect(process.env.ATLAS_URI2, function(err, db) {
		var dbo = db.db("CONNECT");
		const query = {HCPlastname: req.body.name};
		dbo.collection('zoom').find(query).toArray(function(err, result) {
		if (err) throw err;
		res.json(result)
		console.log(result)
		db.close()
	});
	});
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
