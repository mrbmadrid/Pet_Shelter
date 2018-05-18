var mongoose = require('mongoose')
var Pet = mongoose.model('Pet')

module.exports = {
	getAll : function(req, res){
		Pet.find({}).sort('type').exec(function(err, Pets){
			if(err){
				console.log(err)
				res.json({errors:err})
			}else{
				res.json({Pets: Pets})
			}
		})
	},

	getOne : function(req, res){
		Pet.find({_id : req.params.id}, function(err, Pet){
			if(err){
				console.log(err)
				res.json({errors:err})
			}else{
				res.json({Pet: Pet})
			}
		})
	},

	add : function(req, res){
		let skills = [];
		for(let skill of req.body.skills){
			skills.push({skill:skill});
		}
		var pet = new Pet({name: req.body.name, type: req.body.type, description: req.body.description})

		pet.save(function(errors){
			if(errors){
				res.json({success : false, errors})
			}else{
				Pet.findOneAndUpdate({name:req.body.name}, {$push : {skills: {$each: skills}}}, function(err){
					if(errors){
						res.json({success : false, errors})
					}else{
						res.json({success : true})
					}
				});
			}
		})
	},

	edit : function(req, res){
		let skills = [];
		console.log(req.body.skills)
		for(let skill of req.body.skills){
			console.log(skill);
			skills.push({skill:skill.skill});
		}
		console.log(skills)
		Pet.findOne({_id:req.body._id}, function(err, doc){
			if(err){
				res.json({success:false, errors:err})
			}else{
				doc['name'] = req.body.name;
				doc['type'] = req.body.type;
				doc['description'] =req.body.description;
				doc['skills'] = skills;
				doc.save(function(err){
					if(err){
						res.json({success:false, errors:err})
					}else{
						Pet.findOneAndUpdate({name:req.body.name}, {$set : {skills : []}}, function(errors){
						if(errors){
							res.json({success : false, errors})
						}else{
							Pet.findOneAndUpdate({name:req.body.name}, {$push : {skills: {$each: skills}}}, function(err){
								if(errors){
									res.json({success : false, errors});
								}else{
									res.json({success : true});
								}
								});
						}
					})
				}
				})
			}
		})
	},

	like : function(req, res){
		Pet.findOneAndUpdate({'_id':req.params.id}, {$inc : {likes : 1}}, function(err){
			if(err){
				res.json({success:false, errors:err})
			}else{
				res.json({success:true})
			}
		})
	},

	addSkill : function(req, res){
		Pet.findOneAndUpdate({_id : req.params.id}, {$push : {skills : {skill: req.body.skill}}}, function(err){
			if(err){
				res.json({success:false, errors:err})
			}else{
				res.json({success : true})
			}
		})
	},


	adopt : function(req, res){
		Pet.deleteOne({_id:req.params.id}, function(err){
			if(err){
				res.json({success:false, errors:err})
			}else{
				res.json({success : true})
			}
		})
	}
}