opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Navigation = Backbone.View.extend({

        template: JST['app/scripts/templates/navigation.ejs'],

        el: 'nav',

        events: {
            'click li' : 'setGlobalFilter'
        },

        setGlobalFilter: function ( evt ){

            var $target = $( evt.target ),
                filter  = $target.data( "filter" );

            opendata.App.map.setGlobalFilter( filter );

            this.render( filter );

        },

        render: function ( filter ) {

            if ( filter ) {
                var filter = filter.charAt(0).toUpperCase() + filter.slice(1);
            }
            var data = {};
            data.filter = filter;
            this.$el.html( this.template( data ) );

        }

    });

})();
