var express= require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()
app.use(session({ //configure express-session
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/petShelterApp/dist/petShelterApp' )));

require('./server/config/routes.js')(app)


app.listen(8000,function(){
	console.log("Listening...")
})