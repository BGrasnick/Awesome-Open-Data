/*global opendata, Backbone, JST*/

opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Country = Backbone.View.extend({

        template: JST['app/scripts/templates/country.ejs'],



        initialize: function () {

            return this;
        },

        render: function () {

            return this.template( this.model.toJSON() );

        }

    });

})();
