var JSON2004 = require('./2004.json');
var JSON2006 = require('./2006.json');
var JSON2009 = require('./2009.json');

for (var i=0; i<JSON2004.length; i++) {
	for (var j=0; j<JSON2006[i].cannabis.length; j++) {
		JSON2004[i].cannabis.push(JSON2006[i].cannabis[j]);
	}
	for (var j=0; j<JSON2006[i].alcohol.length; j++) {
		JSON2004[i].alcohol.push(JSON2006[i].alcohol[j]);
	}
	for (var j=0; j<JSON2006[i].cigarette.length; j++) {
		JSON2004[i].cigarette.push(JSON2006[i].cigarette[j]);
	}
	for (var j=0; j<JSON2009[i].cannabis.length; j++) {
		JSON2004[i].cannabis.push(JSON2009[i].cannabis[j]);
	}
	for (var j=0; j<JSON2009[i].alcohol.length; j++) {
		JSON2004[i].alcohol.push(JSON2009[i].alcohol[j]);
	}
	for (var j=0; j<JSON2009[i].cigarette.length; j++) {
		JSON2004[i].cigarette.push(JSON2009[i].cigarette[j]);
	}
}

var fs = require('fs');

var outputFilename = './data.json';

fs.writeFile(outputFilename, JSON.stringify(JSON2004, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});