var http = require('http');
var routes = require('./routes/routes');
var express = require('express');
var path = require('path');

var app = express();



app.set('port', process.env.PORT || 9527);
app.set('views', __dirname + '/app/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});