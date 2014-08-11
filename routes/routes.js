var callbackagentController = require("../app/controllers/callbackagent-controller");

module.exports = function routes(app) {
  

  app.get('/', function(req, res){
    res.sendfile('./app/views/index.html');
  });

  app.post('/callbackagent', callbackagentController.index);

};