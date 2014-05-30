opendata.Collections = opendata.Collections || {};
opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    opendata.Models.Country = Backbone.Model.extend({

        initialize: function() {

        },

        parse: function( resp ) {
            var drugs = {};

            _.each( ['amphetamines', 'cannabis', 'cocaine', 'ecstasy'] , function( k ) {
                if( resp[k] ){
                    drugs[k] = resp[k];
                    delete resp[k]
                }
            });

            if( Object.keys( drugs ).length )
                resp.drugs = drugs;

            return resp;
        }
    });


    opendata.Collections.Country = Backbone.Collection.extend({

        model: opendata.Models.Country,

        initialize: function(options) {

            var that = this;

            $.when(
                this.fetch({
                    url: './data/drugData.json'
                }),
                this.fetch({
                    url: './data/countriesMeta.json'
                })
            ).done(options.success);

            $.ajax("./data/us.topo.json").done(function(resp) {
                var path = resp.objects['us_states_census.geo'].geometries;

                var states = _.map(path, function( state ){
                    return {
                        id   : state.properties['STATE'],
                        name : state.properties['NAME']
                    }
                });

                that.add(states);
            });

        },

        parse : function(resp) {

            _.each( resp, function(country) {

                if ( _.isString( country.id ) )
                    country.id = parseInt(country.id);

            });

            return resp;

        }

    });

})();

