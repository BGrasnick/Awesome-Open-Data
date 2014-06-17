var us_data = require('../app/data/us.topo.json');
var drug_data = require('./data.json');

var objects = us_data.objects["us_states_census.geo"].geometries;

for (var i=0; i<objects.length; i++) {
	var name = objects[i].properties.NAME;
	for (var j=0; j<drug_data.length; j++) {
		if (drug_data[j].id===name) {
			drug_data[j].id = objects[i].properties.STATE;
		}
	}
}

var fs = require('fs');

var outputFilename = './data_with_id.json';

fs.writeFile(outputFilename, JSON.stringify(drug_data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});