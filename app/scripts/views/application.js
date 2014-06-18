opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        initialize: function () {

            _.bindAll( this, 'render' );

            opendata.Router = new ApplicationRouter();

            this.map     = new opendata.Views.Map();
            this.nav     = new opendata.Views.Navigation();
            this.overlay = new opendata.Views.Overlay();

            this.map.on( 'country:focus', this.selectCountry, this );
            this.map.on( 'country:blur',  this.overlay.reset, this.overlay );

            opendata.Countries = new opendata.Collections.Country({
                success : this.render
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
                this.overlay.setCountry( country );
            else
                this.overlay.reset();

        }


    });

})();
