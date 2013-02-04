var Schema = require('mongoose').Schema


// interest
var interestSchema = new Schema({
	name				: { type: String }
})
var Interest = module.exports = interestSchema

// person
var personSchema = new Schema({
	name 				: { type: String, required: true }
	, lastName 			: { type: String }
	, interests 		: [Interest]
	, twitter 			: { type: String }
	, email 			: { type: String }
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
	if (value.toUpperCase() == 'DOE') {
		return false
	} else {
		return true
	}
}, 'Please enter a real name!'  )


// email
// emailSchema.path('name').validate(function (value) {
// 	if (value.toUpperCase() == 'NO@EMAIL.COM') {
// 		return false
// 	} else {
// 		return true
// 	}
// }, 'Is that your real email? I don\'t think so')
