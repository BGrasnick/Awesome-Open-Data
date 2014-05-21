opendata.Collections = opendata.Collections || {};opendata.Models = opendata.Models || {};

(function () {
    'use strict';

    opendata.Models.Country = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });



    opendata.Collections.Country = Backbone.Collection.extend({

        model: opendata.Models.Country

    });

})();

