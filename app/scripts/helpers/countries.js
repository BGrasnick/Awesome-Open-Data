(function () {

    var CountryHelper = (function(){

        var detailCountries = [
            "Germany",
            "United States",
            "Egypt"
        ]

        function CountryHelper(arg1){
            _.each( arg1 , function( country ){
                if( _.contains( detailCountries, country.name ) ){
                    country.detail = true;
                }
            })
            this.countries = arg1;
        }

        CountryHelper.prototype.getCountryByID = function(id){

            var result = null;

            // see http://underscorejs.org/#find
            result = _.find( this.countries , function( country ){
                return country['country-code'] == id;
            });

            return result;

        };

        return CountryHelper;

    })();

    $.get('./data/countries.json', function( response ){
        opendata.CountryHelper = new CountryHelper( response );
    });

})();
