(function () {

    CountryHelper = (function(){

        function CountryHelper(arg1){
            this.countries = arg1;
        }

        CountryHelper.prototype.getCountryByID = function(id){

            var result = null;

            // see http://underscorejs.org/#find
            result = _.find( this.countries , function( country ){
                return id == country['country-code'];
            });

            return result;

        };

        return CountryHelper

    })();

    $.get('./data/countries.json', function( response ){
        opendata.CountryHelper = new CountryHelper( response );
    });

})();
