var request = require('request');
var Hue = function () {};


//Figure out how to get a token for your hue here:
//http://blog.paulshi.me/technical/2013/11/27/Philips-Hue-Remote-API-Explained.html
var hueToken = "RmZWVFDveWRJaEszc3BRM1JsUzRkbWJ6UzZVckJIMXJSQ3Ayb25ZYmJCMD0%3D"
var bridgeID = "001788fgge4d6a9c"

var url = "https://www.meethue.com/api/sendmessage?token=" +hueToken + "&bridgeid="+ bridgeID;

var color = "0";
var isON = "true";

Hue.prototype.onWhite = function (callbackFunction) {
//request = request.defaults({'proxy':'http://localhost:8888'})

//var body = "clipmessage={ bridgeId: \"+bridgeID+\", clipCommand: { url: \"/api/0/lights/3/state\", method: \"PUT\" body: {\"sat\": " + color + ",\"on\": "+isON+",\"bri\": 254} } }";

// console.log("URL : " + url);
// console.log("body : " + body);

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     url,
    body:  body
  }, function(error, response, body){
    console.log(body);
    callbackFunction(null, body);
  });
}



Hue.prototype.onColor = function (color,callbackFunction) {
//request = request.defaults({'proxy':'http://localhost:8888'})
console.log("turing light :" + color);

var hueBody = {};
hueBody.on = true;
hueBody.bri = 254;
hueBody.sat = 200;
if(color == 'red') {
  hueBody.hue = 0;

} else if(color == 'blue') {
  hueBody.hue = 46920;

} else if(color == 'white') {
  hueBody.hue = 0;
  hueBody.sat = 25;

} else if(color == 'yellow') {
  hueBody.hue = 12750;

} else if(color == 'green') {
  hueBody.hue = 25500;

} else if(color == 'purple') {
  hueBody.hue = 56100;
}


var body = "clipmessage={ bridgeId: \""+bridgeID+"\", clipCommand: { url: \"/api/0/lights/3/state\", method: \"PUT\" body: "+JSON.stringify(hueBody)+"} }";

// console.log("URL : " + url);
  console.log("body : " + body);

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     url,
    body:  body
  }, function(error, response, body){
    console.log(body);
    callbackFunction(null, body);
  });
}


Hue.prototype.lightOff = function (callbackFunction) {
//request = request.defaults({'proxy':'http://localhost:8888'})
console.log("turing light off");
var isON = "false";
var body = "clipmessage={ bridgeId: \""+bridgeID+"\", clipCommand: { url: \"/api/0/lights/3/state\", method: \"PUT\" body: {\"hue\": " + color + ",\"on\": "+isON+",\"bri\": 200} } }";

// console.log("URL : " + url);
// console.log("body : " + body);

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     url,
    body:  body
  }, function(error, response, body){
    console.log(body);
    callbackFunction(null, body);
  });
}


Hue.prototype.lightParty = function (color1, color2, callbackFunction) {
  //request = request.defaults({'proxy':'http://localhost:8888'})
  console.log("having a party with " + color1 + " and " + color2);
  //this.testSomething("here");

  var myThing = new Hue();
  setTimeout(function() {
      myThing.onColor(color1,function(error, message) {
        console.log("first color");
      });
    }
  , 1);

  setTimeout(function() {
      myThing.onColor(color2,function(error, message) {
        console.log("second color");
      });
    }
  , 5000);


  callbackFunction(null, "testing");

}


//clipmessage={ bridgeId: "001788fffe4d6a9c clipCommand: { url: "/api/0/lights/3/state"%2C method: "PUT"%2C body: {"hue": 46920%2C"on": true%2C"bri": 200} } }&=' "https://www.meethue.com/api/sendmessage?token=RmZWVDAveWRJaEszc3BRM1JsUzRkbWJ6UzZVckJIMXJSQ3Ayb25ZYmJCMD0%3D&bridgeid=001788fffe4d6a9c

module.exports = new Hue();
