var Schema = require('mongoose').Schema

/* @todo: try references
*
* type: Schema.Types.ObjectId, ref: 'Person'
* type: Schema.Types.ObjectId, ref: 'person'
* http://mongoosejs.com/docs/populate.html
*/


// interest
var interestSchema = new Schema({
	name				: { type: String }
})
var Interest = module.exports = interestSchema

// person
var regExp = '.*';
var personSchema = new Schema({
	name 				: { type: String, required: true, match: new RegExp(regExp, "ig") }
	, lastName 			: { type: String }
	, interests 		: [Interest]
	, twitter 			: { type: String, match: /^@{1}.+/ }
	, email 			: { type: String, match: /^.+@{1}.+/ }
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
	if (typeof(value) === 'undefined') {
		return false
	}
	
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
