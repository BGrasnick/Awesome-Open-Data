opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Navigation = Backbone.View.extend({

        template: JST['app/scripts/templates/navigation.ejs'],

        el: 'nav',

        events: {
            'click li' : 'setCountryFilter'
        },

        initialize: function () {

        },


        setCountryFilter: function ( evt ){
            var $target = $(evt.target);

            opendata.App.map.setRegionFilter( $target.data("filter") );

        },

        render: function ( countryname ) {

            this.$el.html( this.template() );
        }

    });

})();
