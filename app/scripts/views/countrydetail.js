opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Contrydetail = Backbone.View.extend({

        template: JST['app/scripts/templates/contrydetail.ejs'],

        el: '#cdetail'

        events: {},

        initialize: function () {
            this.render()
        },

        render: function () {
            // this.$el.html(this.template(this.model.toJSON()));
            this.$el.html( this.template({ }) );
        }

    });

})();
