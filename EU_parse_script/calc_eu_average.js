var drug_data = require('../app/data/drugData.json');
var __ = require('../bower_components/underscore/underscore.js')

var keys = Object.keys(drug_data[0])

var id = 1;

var europe = {id: id};

for (var i = 1; i < keys.length; i++) {
	var data = [];
	data.push(calculateData(0, 'young', i));
	data.push(calculateData(1, 'all', i));
	europe[keys[i]] = data;
}

function calculateData(groupIndex, name, keyIndex) {
	var firstFilter = __.filter(drug_data, function(obj) { return obj[keys[keyIndex]] !== undefined})
	var secondFilter = __.filter(firstFilter, function(obj) { return obj[keys[keyIndex]][groupIndex] !== undefined})
	var value = __.map(secondFilter, function(obj) {return obj[keys[keyIndex]][groupIndex].prevalence});
	var average = __.reduce(value, function(memo, num){ return memo + num; }, 0) / value.length;
	return {population: name, prevalence: average.toFixed(2), source: 'emcdda'};
}

drug_data.push(europe);

var fs = require('fs');

var outputFilename = './dataWithEurope.json';

fs.writeFile(outputFilename, JSON.stringify(drug_data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});