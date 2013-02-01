var Schema = require('mongoose').Schema


// email
var emailSchema = new Schema({
	name				: { type: String }
})
var Email = module.exports = emailSchema

// person
var personSchema = new Schema({
	name 				: { type: String, required: true }
	, lastName 			: { type: String }
	, emails 			: [Email]
	, twitter 			: { type: String }
})
var Person = module.exports = personSchema

// meetup
var meetupSchema = new Schema({
	name 				: { type: String }
	, date 				: { type: Date, default: Date.now }
	, people 			: [Person]
})
var Meetup = module.exports = meetupSchema


// constraints

// person
personSchema.path('lastName').validate(function (value) {
	if (value == 'doe') {
		return false
	} else {
		return true
	}
}, 'Please enter a real name!'  )


// email
emailSchema.path('name').validate(function (value) {
	if (value == 'no@email.com') {
		return false
	} else {
		return true
	}
}, 'Is that your real email? I don\'t think so')
