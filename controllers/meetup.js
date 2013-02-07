// connection
var mongoose 	= require('mongoose')
	, db_lnk 	= 'mongodb://localhost/testMeetup'
	, db 		= mongoose.createConnection(db_lnk)

var meetupSchema = require('../models/meetup')
	, Meetup = db.model('Meetup', meetupSchema)


/**
* save
*/
exports.save = function (req, res, next) {
	
	var data = req.body[0]
	var meetup = new Meetup(data)
	meetup.save(function (err) {
		if (err) {
			console.log(err.errors)
			// res.end( JSON.stringify( { result: false, message: 'error al guardar los datos', error: err.errors } ) )
			try {
				res.end( JSON.stringify( { result: false, message: 'ERROR: item not saved', error: err.errors } ) )
			} catch (e) {
				res.end( JSON.stringify( { result: false, message: 'ERROR: item not saved' } ) )
			}
		} else {
			res.end( JSON.stringify( { result: true, message: 'item saved' } ) )
		}
	})
}

/**
* update
*/
exports.update = function (req, res, next) {
	
	var data = req.body[0]
	var meetup = new Meetup(data)
	var id = data._id
	delete data._id
	Meetup.update({_id: id}, data, function(err, affected) {
		if (err) {
			res.end( JSON.stringify( { result: false, message: 'ERROR: item not saved', error: err.errors } ) )
		} else {
			console.log('affected rows %d', affected);		
			res.end( JSON.stringify( { result: true, message: 'item saved, affected rows: ' + affected } ) )	
		}
	});
}

/**
* get campaigns
*/
exports.load = function (req, res, next) {
	Meetup.find( { $query: {}, $orderby: { _id : 1 } }, function (err, docs) {
		var campaignArray = []
		docs.forEach(function (meetup) {
			campaignArray.push(meetup)
		})
		res.end(JSON.stringify(campaignArray))
	})
}

/**
* delete all entries
*/
exports.deleteAll = function (req, res, next) {
	Meetup.remove({}, function (err) {
		if (!err) {
			res.end(JSON.stringify( {result: true} ))
		} else {
			res.end(JSON.stringify( {result: false} ))
		}
	})
}