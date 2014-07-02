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

            if( !options )
                return;

            var that = this;
            $.when(

                that.fetch({
                    url     : './data/countriesMeta.json'
                })              


            ).done(function (){  

                $.when(

                    $.get("./data/us.topo.json", function( resp ) {

                        var path = resp.objects['us_states_census.geo'].geometries;

                        var states = _.map(path, function( state ){
                            return {
                                id   : state.properties['STATE'],
                                name : state.properties['NAME']
                            }
                        });

                        that.add(states);
                    })

                ).done(function() {            

                    $.get("./data/drugData.json", function( resp ) {
                        _.each( resp, function( country ) {

                            if (that.get(country.id) != undefined) {
                                that.get(country.id).attributes.drugs = country;
                                delete that.get(country.id).attributes.drugs.id
                            }
                        })
                        options.success();
                    })

                })  

            });

        },

        parse : function( resp ) {

            return _.each( resp, function( country ) {

                if ( _.isString( country.id ) ){
                    country.id = parseInt(country.id);
                }

            });

        },

        getContinentAverage : function ( country, drug ){

            var items = 0,
                val,
                sum = this.reduce(function ( memo, C ) {

                if(country.get('region-code') !== C.get('region-code') )
                    return memo;

                try{
                    val = memo + C.get('drugs')[drug][0].prevalence
                }catch(e){
                    return memo
                }

                items++;
                return val

            }, 0);

            return sum/items;

        }

    });

})();

