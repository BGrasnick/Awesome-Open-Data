opendata.Collections = opendata.Collections || {};
opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    var detailCountries = [
        276, // Germany
        840 // United States
    ];

    var inactiveCountries = [
        10 // Antarctica
    ];

    opendata.Models.Country = Backbone.Model.extend({

        defaults: {
            "details"  : false,
            "inactive" : false
        },

        initialize: function() {

            if( _.contains( detailCountries, this.id ) )
                this.set('details', true)

            if( _.contains( inactiveCountries, this.id ) )
                this.set('inactive', true)

        },

        parse: function( resp ) {
            var drugs = {};

            _.each( ['amphetamines', 'cannabis', 'cocaine', 'ecstasy'] , function( k ) {
                if( resp[k] ){
                    drugs[k] = resp[k];
                    delete resp[k]
                }
            })

            if( Object.keys( drugs ).length )
                resp.drugs = drugs;

            return resp;
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

            _.each( resp, function(country) {

                if ( _.isString( country.id ) )
                    country.id = parseInt(country.id);

            })

            return resp;

        }

    });

})();

