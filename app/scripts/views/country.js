/*global opendata, Backbone, JST*/

opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Country = Backbone.View.extend({

        template: JST['app/scripts/templates/country.ejs'],

        events: {
            "click .country-pin"   : 'triggerPin',
            "click .country-close" : 'triggerClose'
        },

        triggerPin : function(evt){
            var that = this,
                btn = $(evt.target);


            btn.button('loading');

            setTimeout( function () {

                btn.button('reset');

                that.trigger('pin')

            }, 500);

        },

        triggerClose : function(){
            this.trigger('close', {
                id : this.model.id
            })
        },

        initialize: function () {

            this.render();
        },

        render: function () {

            var data = this.model.toJSON();
            data.isPinned = opendata.PinnedCountries.contains(this.model);

            this.$el.html( this.template( data ) );

        }

    });

})();
