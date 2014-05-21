opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Countrydetail = Backbone.View.extend({

        template: JST['app/scripts/templates/countrydetail.ejs'],

        el: '#countrydetail',

        events: {},

        initialize: function () {
            this.currentCountry = null;

            _.bindAll(this, 'setCountry');
        },

        render: function () {

            if( ! this.currentCountry ){
                this.$el.empty();
                return false;
            }

            this.$el.html(this.template( this.currentCountry.toJSON() ));

        },

        setCountry: function ( country ) {
            this.currentCountry = country;
            this.render();
        },

        reset: function () {
            this.currentCountry = null;
            this.render();
        }

    });

})();
