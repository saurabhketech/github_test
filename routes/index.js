var express = require('express');
var app = express()
var mongoose = require('mongoose');
var router = express.Router(); //creatig insatnce of express function
var crypto = require('crypto');
var moment = require("moment");


<!--------- login -------->

router.post('/user/login', function(req, res, next) {
    var username = req.body.user_name;
    var password = req.body.password;
    var pass = crypto.createHash('md5').update(password).digest('hex');
    req.users.findOne({
        "username": username,
    }, function(err, docs) {
        if (err) {
            res.json("Your username is not exist");
        } else if (pass == docs.password) {
            var now = moment().format("YYYY-MM-DD'T'HH:mm:ss:SSSZ"); // save date in proper format....
            var loginRecord = new req.access_token({
                "userid": docs._id,
                "token": now
            });
            loginRecord.save(function(err, details) {
                if (err) {
                    next("invalid login");
                } else {
                    res.json({ status: 1, message: "data saved" })
                }
            });

        } else {
            res.status(500).send({ status: 0, message: "Invalid password" });
        }
    });
});

<!--------- fetch data from mongodb through url -------->

router.get('/user/get/:access_token', function(req, res) {
    var access_token = req.params.access_token;
    console.log(req.token)
    req.users.findOne({
        "_id": req.token,
    }, function(err, data) {
        if (err) {
            res.json("Invalid token");
        } else {
            res.json(data);
        }
    });
});

<!---- user Registration ------>


var express = require('express'); // require express module
var request = require('request');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose'); // require moongose module
var app = express(); // creatig insatnce of express function
var bodyParser = require('body-parser'); // required body-parser module
var db = require('./database/db.js');
var routes = require('./Routes/register.js'); // create route for index
app.use(db());
app.use(bodyParser.urlencoded({
    extended: true
}));



router.get('/user/get/:access_token', function(req, res) {
    var access_token = req.params.access_token;
    console.log(req.token)
    req.users.findOne({
        "_id": req.token,
    }, function(err, data) {
        if (err) {
            res.json("Invalid token");
        } else {
            res.json(data);
        }
    });
});
// var login=require('./Routes/login.js')
// app.use('/', login);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen(8080, function() {
    console.log("Server started at port number: 8080");
});
module.exports = router;
