"use strict";

var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pingrineUser');

var app = express();
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));

var schema = mongoose.Schema;
var usersSchema = new schema({
    userName: {type: String, required: true, unique: true},
    Email: {type: String, required: true},
    password: {type: String, required: true}
});
var chatSchema = new schema({
    msg: {type: String},
    msgType: {type: String},
    toUserName: {type: String},
    fromUserName: {type: String}
});
var connectionSchema = new schema({
    userName: {type: String},
    connection: {
        name: {type: String},
        dp: {type: String}
    }
});
var grpConnectionSchema = new schema({
    fromUserName: {type: String},
    toUserName: {
        name1: {type: String},
        name2: {type: String}
    },
    dp: {type: String},
    name: {type: String}
});

var User = mongoose.model("user", usersSchema);
var Chat = mongoose.model("chat", chatSchema);
var connection = mongoose.model("connection", connectionSchema);
var grpConnection = mongoose.model("grpConnection", grpConnectionSchema);

var sess;

router.get('/', function (req, res) {
    sess = req.session;
    if (sess.userName) {
        res.render('home');
    } else {
        res.render('index');
    }
});

router.post('/register', function (req, res) {
   // console.log(req.body);
    var newUser = new User({
        userName: req.body.userName,
        Email: req.body.userMail,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (err) throw err;
    });

    res.end(JSON.stringify(true));
});

router.post('/login', function (req, res) {
    sess = req.session;
    var userName = req.body.userName;
    var password = req.body.password;
    var temp = req.body;
   // console.log(userName + " " + password);
   // console.log(temp);
    User.find({
        userName: userName,
        password: password
    }, function (err, user) {
        if (err) {
            throw err;
            res.end(JSON.stringify(false));
        }

        if (user.length === 1) {
            sess.userName = userName;
            sess.password = password;
            //console.log("hi");
            res.end(JSON.stringify(true));
        } else {
            res.end(JSON.stringify(false));
        }
    });

});

router.post('/sendMessage', function (req, res) {
    sess = req.session;

    var msg = req.body.msg;
    var msgType = req.body.msgType;
    var toUserName = req.body.toUserName;
    var chat = new Chat({
        msg: msg,
        msgType: msgType,
        toUserName: toUserName,
        fromUserName: "prateek"/*sess.userName*/
    });
    chat.save(function (err) {
        if (err) throw err;
    });
    //res.send(chat);
    res.end(JSON.stringify(chat));
});

router.get('/getMessage', function (req, res) {
    sess = req.session;
    Chat.find(function (err, chats) {
        if (err) throw err;
       // console.log(JSON.stringify(chats)+";currentUserName ="+sess.userName)
        res.end(JSON.stringify(chats)+";"+sess.userName);
    });
});

router.get('/myInfo', function (req, res) {
    sess = req.session;
    res.end(JSON.stringify({
        userName: sess.userName
    }));
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.end(JSON.stringify(true));
});

router.get('/signup', function (req, res) {
   // console.log("in");
    res.render('signup');
});

router.get('/addConnections', function (req, res) {
    var newConnections = new connection({
        userName: "mohit",
        connection: {
            name: "abc",
            dp: "/images/150114-news-abc-logo.jpg"
        }
    });
    newConnections.save(function (err) {
        if (err) throw err;
    });
});

router.get('/getConnection', function (req, res) {
    sess = req.session;
    connection.find({
        userName: sess.userName
    }, function (err, connections) {
        if (err) {
            throw err;
            res.end(JSON.stringify(false));
        }
        // console.log(connection);
        if (connections.length != 0) {
            console.log(JSON.stringify(connections));
            res.end(JSON.stringify(connections));
        } else {
            res.end(JSON.stringify(false));
        }
    });
});

router.post('/addGrpConnections', function (req, res) {
    sess = req.session;
    console.log(req.body);
    var grpName = req.body.fromUserName+" "+req.body.toUserName1+" "+req.body.toUserName2;
    console.log(grpName);
    var newGrpConnections = new grpConnection({

        fromUserName: req.body.fromUserName,
        toUserName: {
            name1: req.body.toUserName1,
            name2: req.body.toUserName2
        },
        dp: req.body.dp,
        name: grpName
    });
    newGrpConnections.save(function (err) {
        if (err) throw err;
    });


    grpConnection.find({
        fromUserName: sess.userName
    }, function (err, grpConnections) {
        if (err) {
            throw err;
            res.end(JSON.stringify(false));
        }
         console.log(grpConnections.length);
        if (grpConnection.length != 0) {
            res.end(JSON.stringify(grpConnections));
        } else {
            res.end(JSON.stringify(false));
            
        }
    });
});

router.get('/getGrpConnection', function (req, res) {
    /*console.log("getConnections");
    sess = req.session;
    grpConnection.find({
        FromuserName: sess.userName
    }, function (err, grpConnections) {
        if (err) {
            throw err;
            res.end(JSON.stringify(false));
            console.log("yoyoyo");
        }
        // console.log(connection);
        if (connections.length != 0) {
            console.log("JSON.stringify(grpConnections)");
            res.end(JSON.stringify(grpConnections));
        } else {
            res.end(JSON.stringify(false));
            console.log("yoyoyo");
        }
    });*/
});

module.exports = router;

















