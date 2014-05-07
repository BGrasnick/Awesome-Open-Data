opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Navigation = Backbone.View.extend({

        template: JST['app/scripts/templates/navigation.ejs'],

        el: 'nav',

        events: {},

        initialize: function () {
            this.render()
        },

        render: function ( countryname ) {

            //this.$el.html(this.template(this.model.toJSON()));
            this.$el.html( this.template({
                name : countryname
            }) );
        }

    });

})();
