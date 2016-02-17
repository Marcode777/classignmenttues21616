var express = require('express');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();//make sure everything it needs is defined here before it gets to where it's used
var Sequlize = require("sequelize");
var sequelize = new Sequelize("rcb_authentication_db", "root"); //notice that Sequelize is capitalized 
//remember to npm install sequelize --save


var user = 

var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'rcb_authentication_db'
});

app.post('/register', function (req, res){
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
});

var PORT = process.env.NODE_ENV || 3000;



app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId); 
});

app.get('/', function(req,res) {
  res.render('index', {
    msg: req.query.msg
  });
});

app.post('/register', function(req,res) {
  var email = req.body.email;
  var password = req.body.password;

  connection.query("SELECT * FROM users WHERE email=?", [email], function(err, results) {
    if (err){
      throw err;
    }

    if(results.length === 0) {
      // Create an account
      connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function(err) {
        if (err) {
          throw err;
        }

        res.redirect('/secret');
      });
    } else {
      res.redirect('/?msg=Email Already Exists');
    }
  });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

User.create(req.body).then(function(user){
  req.session.authenticated = user;
  res.redirect("/secret");
}).catch(function(err){
  res.redirect("/?msg=" + err.message);
  });

//this substitutes for the lengthy lines of code of connection.query

//   connection.query("SELECT * FROM users WHERE email=? AND password=?", [email, password], function(err,results) {
//     if(err){
//       throw err;
//     }

//     if(results.length > 0) {
//       res.redirect('/secret');
//     } else {
//       res.redirect('/?msg=Invalid login');
//     }
//   });
// });

app.get('/secret', function(req,res) {
  res.render('secret'); // changed it to render so it's not exposed
});

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
})