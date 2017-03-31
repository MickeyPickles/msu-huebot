var express = require('express');
var router = express.Router();
var hue = require('../hue.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/webhook', function(req, res, next) {

  var responseObj = {};
  responseObj.speech = "Hey I'm getting a response back from this thing";
  responseObj.data = {};
  responseObj.contextOut = [];
  responseObj.source = "the internets";

  //hue.onColor("blue", function(error, message) {
  var incomingBody = req.body;

  if(incomingBody.result.action == "light.command") {
    var lightColor = incomingBody.result.parameters.LightColor;

    if (lightColor == 'off') {
      hue.lightOff(function(error, message) {
        console.log("light should be off");
      });
    } else if(lightColor == 'on') {
      hue.onColor('white', function(error, message) {
        console.log("light should white");
      });
    } else {
      hue.onColor(lightColor, function(error, message) {
        console.log("light should be " + lightColor);
      });
    }

    console.log("better turn on the light");
    responseObj.speech = "Ok turning light " + lightColor;
  } else if(incomingBody.result.action == "start.party") {

    var contextArray = incomingBody.result.contexts;
    var partyContext = {};
    contextArray.forEach(function(entry) {
      if(entry.name == 'startparty') {
        partyContext = entry;
      }
      console.log(entry);
    });

    hue.lightParty(partyContext.parameters.color1, partyContext.parameters.color2,function(error, message) {
      console.log("done");
    });

    responseObj.speech = "Ok starting the party with " + partyContext.parameters.color1 + " and " + partyContext.parameters.color2+". Go bobcats!";


  } else {
    console.log("Unknown Command!!");
  }

  //console.log("POSTED : " + JSON.stringify(incomingBody));
  //  console.log("done");
  //});

  res.json(responseObj);
});



router.get('/hueblue', function(req, res, next) {

  hue.onColor("blue", function(error, message) {
    console.log("done");
  });

  res.send("looks ok to me");
});

router.get('/huered', function(req, res, next) {

  hue.onColor("red", function(error, message) {
    console.log("done");
  });

  res.send("looks ok to me");
});

module.exports = router;
