opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        map: null,
        nav: null,
        // slider: null,
        country: null,

        initialize: function () {

            var that = this;

            opendata.Router = new ApplicationRouter();

            this.map = new opendata.Views.Map();
            this.nav = new opendata.Views.Navigation();
            // this.slider = new opendata.Views.Slider();
            this.country = new opendata.Views.Country();

            opendata.Countries = new opendata.Collections.Country({
                success:  that.map.render
            });


            this.map.on( 'select:country', function ( evt ) {      
                var id = evt.id;
                var country;

                if( country = opendata.Countries.get( id ) )
                    that.country.setCountry( country );
                else
                    that.country.reset();

            });            
            this.map.on( 'deselect:country', function ( evt ) {
                that.country.reset();
            });


        }

    });

})();
