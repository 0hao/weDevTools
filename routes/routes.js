exports.index = function(req, res){
  // res.render('index');
  // res.sendfile('index.html');
  res.sendfile('./app/views/index.html');
};