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

            if( ! this.currentCountry )
                return false;

            this.$el.html(this.template({
                name: this.currentCountry.name
            }));

        },

        setCountry: function ( id ) {
            this.currentCountry = opendata.CountryHelper.getCountryByID( id );
            this.render();
        },

        reset: function () {
            this.currentCountry = null;
            this.render();
        }

    });

})();
