(function () {

    CountryHelper = (function(){

        function CountryHelper(data){
            console.log("init helper");

            this.data = data;
        }

        CountryHelper.prototype.getCountryByID = function(iso){

            // see http://underscorejs.org/#find
            var result = _.find( this.data , function( country ){
               return iso == country['country-code'];
            })

            if( result ){
                return result.name;
            }else{
                return null;
            }

        }

        return CountryHelper

    })();

    $.get('./data/countries.json', function(resp){
        opendata.CountryHelper = new CountryHelper(resp);
    });

})();
