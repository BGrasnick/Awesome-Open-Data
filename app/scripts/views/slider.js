/*global OpenData, Backbone, JST*/

OpenData.Views = OpenData.Views || {};

(function () {
    'use strict';

    OpenData.Views.Slider = Backbone.View.extend({

        template: JST['app/scripts/templates/slider.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
