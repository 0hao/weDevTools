var path = require('path');
var crypto=require("crypto");
// var fs = require('fs');
// var urllib = require('urllib');
// var formstream = require('formstream');
// var util = require('./util');
// var wrapper = util.wrapper;
// var postJSON = util.postJSON;
var http = require('http');
var CONFIG = require('./config');

/**
 */
var core = {};

/**
 * 生成sign
*/
core.getSignature = function (query) {
  var timestamp = query.timestamp;
  var nonce = query.nonce;

  var shasum = crypto.createHash('sha1');
  var arr = [CONFIG.TOKEN, timestamp, nonce].sort();
  shasum.update(arr.join(''));

  return shasum.digest('hex');
};

/**
 * 模拟微信服务端发送xml数据给开发者
*/
core.postXml2Developer = function (params, xml){
  var options = {
    host: params.host,
    port: params.port,
    path: params.path,
    method: params.method,
    headers: params.headers
  };


  var httpReq = http.request(options, function(res) {
    console.log("statusCode: ", httpReq.statusCode);
    // console.log("headers: ", resHttps.headers);

    // _res.setEncoding('utf8');
    res.on('data', function(body1) {
      console.log("body:"+body1);
    });

    // write data to request body
    // 
    
    httpReq.on('error', function(e) {
     console.error("error:"+e);
     return "系统异常："+e.message;
    });

    
  });

  httpReq.write(xml);
  httpReq.end();
}


module.exports = core;
