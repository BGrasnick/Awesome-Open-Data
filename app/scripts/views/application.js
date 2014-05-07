opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        map: null,
        nav: null,

        initialize: function () {

            opendata.Router = new ApplicationRouter()

            this.render()
            this.map = new opendata.Views.Map()
            this.nav = new opendata.Views.Navigation()

        },

        goToCountry: function ( id ){
            console.log("Now showing info for county " + opendata.CountryHelper.getCountryByID(id).name );
        }
    });

})();
