var drug_data = require('../app/data/drugData.json');
var __ = require('../bower_components/underscore/underscore.js')

var keys = [
  'cannabis',
  'ecstasy',
  'amphetamines',
  'cocaine',
  'alcohol',
  'cigarette'   
]

var age_groups = [
	'young adults',
	'all',
	'Aged 15-24',
	'Aged 25-34',
	'Aged 35-44',
	'Aged 45-54',
	'Aged 55-64'
]

var europe = {id: 1};

for (var i = 0; i < keys.length; i++) {
	var data = [];
	for (var j = 0; j < age_groups.length; j++) {
		var object = calculateData(j,age_groups[j], i);
		if (object !== null) {
			data.push(object);
		}
	}
	europe[keys[i]] = data;
}

function calculateData(groupIndex, name, keyIndex) {
	var firstFilter = __.filter(drug_data, function(obj) { return obj[keys[keyIndex]] !== undefined});
	var secondFilter = __.filter(firstFilter, function(obj) { return obj[keys[keyIndex]][groupIndex] !== undefined});
	var europeStates = __.filter(secondFilter, function(obj) { return obj[keys[keyIndex]][groupIndex].source === "emcdda"});
	var value = __.map(europeStates, function(obj) {return obj[keys[keyIndex]][groupIndex].prevalence});
	var average = __.reduce(value, function(memo, num){ return memo + num; }, 0) / value.length;
	if (average !== undefined && !isNaN(average)) {
		return {population: name, prevalence: average.toFixed(2), source: 'emcdda'};
	}
	return null;
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