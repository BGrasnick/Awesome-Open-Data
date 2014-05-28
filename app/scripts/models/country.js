opendata.Collections = opendata.Collections || {};
opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    var detailCountries = [
        276, //"Germany",
        840, //"United States",
        818 //"Egypt"
    ]

    opendata.Models.Country = Backbone.Model.extend({

        defaults: {
            "details": false
        },

        initialize: function() {

            if( _.contains( detailCountries, this.id ) )
                this.set('details', true)

        },

        parse: function(response)  {
            var drugs = {};

            _.each( ['amphetamines', 'cannabis', 'cocaine', 'ecstasy'] , function( k ){
                if( response[k] ){
                    drugs[k] = response[k];
                    delete response[k]
                }
            })

            if( Object.keys( drugs ).length )
                response.drugs = drugs;

            return response;
        }
    });



    opendata.Collections.Country = Backbone.Collection.extend({

        model: opendata.Models.Country,

        initialize: function(options) {

            $.when(
                this.fetch({
                    url: './data/drugs.json'
                }),
                this.fetch({
                    url: './data/countries.json'
                })
            ).done(options.success)

        },

        parse : function(resp) {
            _.each(resp, function(country) {

                if (_.isString(country.id)) {
                    country.id = parseInt(country.id);
                }

            })

            return resp;

        }

    });

})();

