var http = require('http');
var routes = require('./routes/routes');
var express = require('express');
var path = require('path');

var app = express();

var routes = require('./routes/routes');

app.use(express.query());

app.set('port', process.env.PORT || 9527);
// app.set('views', __dirname + '/app/views');

app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

routes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});