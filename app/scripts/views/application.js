opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        map: null,
        nav: null,
        // slider: null,
        countrydetail: null,

        initialize: function () {

            var that = this;

            opendata.Router = new ApplicationRouter();

            this.map = new opendata.Views.Map();
            this.nav = new opendata.Views.Navigation();
            // this.slider = new opendata.Views.Slider();
            this.countrydetail = new opendata.Views.Countrydetail();

            opendata.Countries = new opendata.Collections.Country();
            opendata.Countries.fetch({
                url: './data/drugs.json',
                success: function(col, resp){
                    opendata.CountryHelper.setDetailCountries( resp );
                    that.map.render();
                }
            });

            this.map.on( 'select:country', function ( evt ) {      
                var id = evt.id;
                that.countrydetail.setCountry( id );
            });            
            this.map.on( 'deselect:country', function ( evt ) {
                that.countrydetail.reset();
            });


        }

    });

})();
