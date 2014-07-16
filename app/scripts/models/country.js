opendata.Collections = opendata.Collections || {};
opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    opendata.Models.Country = Backbone.Model.extend({

        initialize: function() {

        },

        parse: function( resp ) {
            var drugs = {};

            _.each( ['amphetamines', 'cannabis', 'cocaine', 'ecstasy', 'cigarette', 'alcohol'] , function( k ) {

                if( resp[k] && resp[k].length ){
                    drugs[k] = resp[k];
                }
                
                delete resp[k]
            });


            if( Object.keys( drugs ).length )
                resp.drugs = drugs;

            return resp;
        }

    });


    opendata.Collections.Country = Backbone.Collection.extend({

        model: opendata.Models.Country,

        initialize: function( options ) {

            if( ! ( options && options.success ) )
                return true;

            var that = this;

            $.when(

                that.fetch({
                    url    : './data/countriesMeta.json',
                    remove : false
                }),

                that.fetch({
                    url    : "./data/drugData.json",
                    remove : false
                }),

                $.get("./data/us.topo.json", function( resp ) {

                    var path = resp.objects['us_states_census.geo'].geometries;

                    var states = _.map( path, function( state ){ return {
                        id   : state.properties['STATE'],
                        name : state.properties['NAME']
                    } });

                    that.add(states, { merge: true, remove: false });
                })

            ).done( options.success );

        },

        parse : function( resp ) {

            return _.each( resp, function( country ) {

                if ( _.isString( country.id ) ){
                    country.id = parseInt(country.id);
                }

            });

        },

        getContinentAverage : function ( country, drug ){

            var continent = null,
                key = null;

            // EU
            if( country.get('region-code') == 150 ){
                continent = 1;
                key = 'all';
            }
            // US
            else if( country.get('id') > 10000 || country.get('id') === 840 ){
                continent = 840;
                key = '26+';
            }

            var averageDrugData = opendata.Countries.get( continent ).get('drugs')[ drug ];

            return _.findWhere( averageDrugData, { population : key }).prevalence

        }

    });

})();

