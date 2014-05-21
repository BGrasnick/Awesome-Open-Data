(function () {

    var CountryHelper = (function(){

        var detailCountries = [
            "Germany",
            "United States",
            "Egypt"
        ]

        function CountryHelper( countries ){
            _.each(countries, function( c ){
                c.id = parseInt(c.id);
            });
            this.countries = countries;
        }

        CountryHelper.prototype.getCountryByID = function(id){

            var result = null;

            // see http://underscorejs.org/#find
            result = _.find( this.countries , function( country ){
                return country['id'] === id;
            });

            return result;

        };

        CountryHelper.prototype.setDetailCountries = function( detailCountries ){

            var detailCountiesIDs = _.pluck(detailCountries, "id");

            _.each( this.countries, function( country ){
                country.detail = _.contains( detailCountiesIDs, country.id );
            })

        };

        return CountryHelper;

    })();

    $.get('./data/countries.json', function( response ){
        opendata.CountryHelper = new CountryHelper( response );
    });

})();
