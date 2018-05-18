require('./mongoose')
var Pet = require('../controllers/pets')
var path = require('path')

module.exports = function(app){

	app.get('/pets', function(req, res){
		Pet.getAll(req, res)
	})

	app.get('/pets/:id', function(req, res){
		Pet.getOne(req, res)
	})

	app.post('/pets', function(req, res){
		Pet.add(req, res)
	})

	app.delete('/pets/:id', function(req, res){
		Pet.adopt(req, res)
	})

	app.put('/pets/:id', function(req, res){
		Pet.edit(req, res)
	})

	app.put('/pets/:id/skills', function(req, res){
		Pet.addSkill(req, res)
	})

	app.get('/pets/:id/like', function(req, res){
		Pet.like(req, res)
	})

	app.all("**", (req,res,next) => {
  		res.sendFile(path.resolve("./petShelterApp/dist/petShelterApp/index.html"))
	});


}