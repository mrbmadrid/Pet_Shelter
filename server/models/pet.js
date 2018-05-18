var mongoose = require('mongoose')

mongoose.Promise = global.Promise

var SkillSchema = new mongoose.Schema({
	skill : {type: String, minlength: [3, "Skill name is too short."]},
})

mongoose.model('Skill', SkillSchema)

var PetSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Pets must have a name."], minlength: [3, "Pet name is too short."], unique: true},
	type:  {type: String, required: [true, "Pets must have a type."], minlength: [3, "Pet type is too short."]},
	description:  {type: String, required: [true, "Pets must have a description."], minlength: [3, "Pet description is too short."]},
	likes: {type: Number, default: 0},
	skills: {type: [SkillSchema]}
})

PetSchema.pre('save', function(next){
	this.type = this.type.toLowerCase();
	this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
	next();
})


mongoose.model('Pet', PetSchema)