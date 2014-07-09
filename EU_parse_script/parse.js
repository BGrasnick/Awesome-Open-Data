var alcohol_all = require('./alcohol_all.json');
var alcohol_young = require('./alcohol_young.json');
var cigarette_all = require('./cigarette_all.json');
var cigarette_young = require('./cigarette_young.json');
var countries_meta = require('../app/data/countriesMeta.json');
var drug_data = require('../app/data/drugData.json');

for (var i=0; i<alcohol_all.length; i++) {
	var alc_all_country = alcohol_all[i];
	var alc_young_country = alcohol_young[i];
	var cig_all_country = cigarette_all[i];
	var cig_young_country = cigarette_young[i];
	var name = alc_all_country.Country;
	var id = 0;
	for (var j = 0; j < countries_meta.length; j++) {
		if (countries_meta[j].name === name) {
			id = parseInt(countries_meta[j].id);
		}
	}
	for (var j = 0; j < drug_data.length; j++) {
		var country = drug_data[j];
		if (country.id === id) {
			country.alcohol = [];
			if (alc_all_country.Total != null) {
				country.alcohol.push({year: alc_all_country.Year, population: 'all', prevalence: alc_all_country.Total, source: 'emcdda'});
			}
			if (alc_young_country.Total != null) {
			country.alcohol.push({year: alc_young_country.Year, population: 'young adults', prevalence: alc_young_country.Total, source: 'emcdda'});
			}
			country.cigarette = [];
			if (cig_all_country.Total != null) {
			country.cigarette.push({year: cig_all_country.Year, population: 'all', prevalence: cig_all_country.Total, source: 'emcdda'});
			}
			if (cig_young_country.Total != null) {
			country.cigarette.push({year: cig_young_country.Year, population: 'young adults', prevalence: cig_young_country.Total, source: 'emcdda'});
			}
		}
	}
}

var fs = require('fs');

var outputFilename = './data.json';

fs.writeFile(outputFilename, JSON.stringify(drug_data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
