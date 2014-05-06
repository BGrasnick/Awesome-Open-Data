opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        map: null,

        initialize: function () {

            opendata.Router = new ApplicationRouter()

            this.render()
            this.Map = new opendata.Views.Map()

        },

        goToCountry: function ( id ){
            console.log("Now showing info for county " + opendata.CountryHelper.getCountryByID(id).name );
        }
    });

})();
