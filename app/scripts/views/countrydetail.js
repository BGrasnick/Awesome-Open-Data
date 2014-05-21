opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Countrydetail = Backbone.View.extend({

        template: JST['app/scripts/templates/countrydetail.ejs'],

        el: '#countrydetail',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( this.template({}) );
        },

        selectedCountry: function ( id ) {
            var countryname = opendata.CountryHelper.getCountryByID(id).name;
            this.$el.html( this.template({
                countryname : countryname
            }) );
        },

        deselectedCountry: function () {
            this.render();
        }

    });

})();
