var hue = require('./hue.js');

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });"UMe.[9=PEM]9q3c

// hue.onColor("red", function(error, message) {
//   console.log("done");
// });
//
hue.lightOff(function(error, message) {
  console.log("done");
});
// hue.onColor("blue",function(error, message) {
//   console.log("first color");
// });


// hue.lightParty("blue", "green",function(error, message) {
//   console.log("done");
// });
