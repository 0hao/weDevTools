var xml2js = require('xml2js');
var http = require('http');
var BufferHelper = require('bufferhelper');

var url = require('url');

var querystring = require('querystring');
var crypto=require("crypto");

var core = require('../../libs/core');

exports.index = function(req, res, next) {

  // get token
  var reqUrlObj = url.parse(req.url, true);
  var reqToken = reqUrlObj['query']['token'];

  var reqXml = req.body.body;

  // get post url
  var jsonXml;
  xml2js.parseString(reqXml, {trim: true}, function(err, result){
    jsonXml =  result;
  });
  var req_url = url.parse(jsonXml.xml.URL[0]);

  // sign加签
  var timestamp = Date.now(),
      nonce = Math.floor(Math.random()*10);
  var sign = core.getSignature({
    'token': reqToken,
    'timestamp': timestamp,
    'nonce': nonce
  });

  // post params
  var params = {
    'host': req_url.hostname,
    'port': req_url.port || 80,
    'path': req_url.path + (req_url.path.indexOf('?')>-1 ? '&' : '?') + 'signature='+sign+'&timestamp=' + timestamp + '&nonce=' + nonce + '&echostr=123123',
    'method': 'POST',
    'headers': {
      'Connection': "Keep-Alive",
      'Content-Type': 'application/xml',
      'Content-Length': reqXml.length
    }
  };

  core.postXml2Developer(params, reqXml);

  res.send({'body':reqXml});

}