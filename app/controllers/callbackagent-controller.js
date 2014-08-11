var xml2js = require('xml2js');
var http = require('http');
var BufferHelper = require('bufferhelper');

var url = require('url');

var querystring = require('querystring');
var crypto=require("crypto");

var core = require('../../libs/core');

exports.index = function(req, res, next) {

  var xml = req.body.body;
  // xml = xml.replace(/^\ufeff/i, "").replace(/^\ufffe/i, ""); 
  res.send({'body':xml});

  var jsonxml;
  xml2js.parseString(xml, {trim: true}, function(err, result){
    jsonxml =  result;
  });

  var req_url = url.parse(jsonxml.xml.URL[0]);

  var timestamp = Date.now(),
      nonce = Math.floor(Math.random()*10);

  var sign = core.getSignature({
    'timestamp': timestamp,
    'nonce': nonce
  });

  var params = {
    'host': req_url.hostname,
    'port': req_url.port || 80,
    'path': req_url.path + (req_url.path.indexOf('?')>-1 ? '&' : '?') + 'signature='+sign+'&timestamp=' + timestamp + '&nonce=' + nonce + '&echostr=123123',
    'method': 'POST',
    'headers': {
      'Connection': "Keep-Alive",
      'Content-Type': 'application/xml',
      'Content-Length': xml.length
    }
  };

  core.postXml2Developer(params, xml);

}