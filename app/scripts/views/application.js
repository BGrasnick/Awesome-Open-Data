opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.App = Backbone.View.extend({

        el: 'body',

        map: null,
        nav: null,
        // slider: null,
        countrydetail: null,

        initialize: function () {

            var that = this;

            opendata.Router = new ApplicationRouter()

            this.render()
            this.map = new opendata.Views.Map();
            this.nav = new opendata.Views.Navigation();
            // this.slider = new opendata.Views.Slider();
            this.countrydetail = new opendata.Views.Countrydetail();

            this.map.on( 'select:country', function ( evt ) {      
                var id = evt.id;
                that.countrydetail.selectedCountry( id );
            });            
            this.map.on( 'deselect:country', function ( evt ) {
                that.countrydetail.deselectedCountry();
            });
        },

    });

})();
