opendata.Collections = opendata.Collections || {};
opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    opendata.Models.Country = Backbone.Model.extend({

        initialize: function() {
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

        model: opendata.Models.Country

    });

})();

