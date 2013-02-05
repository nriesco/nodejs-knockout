// Creación de la Conexión
var mongoose 	= require('mongoose')
	, db_lnk 	= 'mongodb://localhost/testMeetup'
	, db 		= mongoose.createConnection(db_lnk)

var meetupSchema = require('../models/meetup')
	, Meetup = db.model('Meetup', meetupSchema)


/**
* save
*/
exports.save = function (req, res, next) {
	
	// var datos = req.body
	// var dato = datos[0]

	var data = req.body[0]
	var meetup = new Meetup(data)
	meetup.save(function (err) {
		if (err) {
			console.log(err.errors)
			// res.end( JSON.stringify( { result: false, message: 'error al guardar los datos', error: err.errors } ) )
			try {
				res.end( JSON.stringify( { result: false, message: 'error al guardar los datos', error: err.errors } ) )
			} catch (e) {
				res.end( JSON.stringify( { result: false, message: 'error al guardar los datos' } ) )
			}
			
		} else {
			res.end( JSON.stringify( { result: true, message: 'datos guardados (solo primera entrada por ahora)' } ) )
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
	// var up = { $set: dato }
	Meetup.update({_id: id}, data, function(err, affected) {
		if (err) {
			// console.log(err)
			res.end( JSON.stringify( { result: false, message: 'error al guardar los datos', error: err.errors } ) )
		} else {
			console.log('affected rows %d', affected);		
			res.end( JSON.stringify( { result: true, message: 'todo ok. Cantidad de filas afectadas: ' + affected } ) )	
		}
	});

}

/**
* obtiene todas las campanias y las retorna como json
*/
exports.load = function (req, res, next) {
	Meetup.find( { $query: {}, $orderby: { _id : 1 } }, function (err, docs) {
		var arregloConCampanias = []
		docs.forEach(function (meetup) {
			arregloConCampanias.push(meetup)
		})
		var resultado = JSON.stringify(arregloConCampanias)
		res.end(resultado)
	})
}


exports.deleteAll = function (req, res, next) {
	Meetup.find( { $query: {}, $orderby: { _id : 1 } }, function (err, docs) {
		docs.forEach(function (meetup) {
			meetup.remove()
		})
		var result = JSON.stringify( {result: true} )
		res.end(result)
	})
}