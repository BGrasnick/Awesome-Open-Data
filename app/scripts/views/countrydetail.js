opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Countrydetail = Backbone.View.extend({

        template: JST['app/scripts/templates/countrydetail.ejs'],

        el: '#countrydetail',

        events: {},

        initialize: function () {
            this.currentCountry = null;
            this.currentDrug = 'cannabis';

            _.bindAll(this, 'setCountry');
        },

        render: function () {

            if( ! this.currentCountry ){
                this.$el.empty();
                return false;
            }

            this.$el.html(this.template( this.currentCountry.toJSON() ));

            this.renderChart();

        },

        renderChart : function() {
            var that = this;

            var data = this.currentCountry.get('drugs')[that.currentDrug];

            var x = d3.scale.linear()
                .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                .range( [0, 290] );

            d3.select( that.$('.chart')[0] ).selectAll('div')
              .data(data)
            .enter().append("div")
              .style("width", function(d) { return x(d.prevalence) + 'px'; })
              .attr("class", "bar-" + that.currentDrug)
              .text(function(d) { return d.population + ": " + d.prevalence + "%"; });

        },

        setCountry: function ( country ) {
            this.currentCountry = country;
            this.render();
        },

        reset: function () {
            this.currentCountry = null;
            this.render();
        }

    });

})();
