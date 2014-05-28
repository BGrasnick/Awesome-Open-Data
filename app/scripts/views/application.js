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

            _.bindAll( this, 'render' );

            opendata.Router = new ApplicationRouter();

            this.map = new opendata.Views.Map();
            this.nav = new opendata.Views.Navigation();
            this.country = new opendata.Views.Country();

            this.map.on( 'select:country', this.selectCountry, this );
            this.map.on( 'deselect:country', function () { that.country.reset(); });

            opendata.Countries = new opendata.Collections.Country({
                success: that.render
            });

        },

        render: function() {
            this.map.render();
            this.nav.render();
        },

        selectCountry: function ( evt ) {
            var country,
                id = evt.id;

            if( country = opendata.Countries.get( id ) )
                this.country.setCountry( country );
            else
                this.country.reset();

        }


    });

})();
