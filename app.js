
/**
 * Module dependencies.
 */

var express = require('express')
  , examples = require('./routes/examples')
  , meetup = require('./routes/meetup')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', examples.index);
app.get('/basic', examples.basic);
app.get('/intermediate', examples.intermediate);
app.get('/advanced', examples.advanced);
app.get('/full', examples.full);

app.post('/save', meetup.save);
app.get('/load', meetup.load);
app.get('/deleteAll', meetup.deleteAll);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));

  var io = require('socket.io').listen(this);
  io.sockets.on('connection', function (socket) {
    socket.on('message', function(msg) {
      socket.broadcast.emit('needsToBeUpdated', true);
    });
    socket.on('meetupSaved', function(msg) {
      console.log('a custom event!');
    });
  });

});
