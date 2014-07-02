/*global opendata, Backbone, JST*/

opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Country = Backbone.View.extend({

        template: JST['app/scripts/templates/country.ejs'],

        events: {
            "click .country-pin"   : 'triggerPin',
            "click .country-close" : 'triggerClose',
            "click a[data-toggle] ": 'updateActiveTab'
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

        updateActiveTab: function(evt) {

            opendata.ActiveTabs[this.model.id] = $(evt.target).html().toLowerCase()

        },

        initialize: function () {

            this.render();
        },

        render: function () {

            var data = this.model.toJSON();
            data.isPinned = opendata.PinnedCountries.contains(this.model);

            this.$el.html( this.template( data ) );
            this.renderChart()

        },

        renderChart : function() {

            var that = this;

            var drugs = that.model.get('drugs');

            if ( ! drugs ){
                return false;
            }

            _.each(drugs, function(drug, key){

                var average = opendata.Countries.getContinentAverage(that.model, key);

                var data = drug;

                var x = d3.scale.linear()
                    .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                    .range( [0, 465] );

                var bar = d3.select( that.$('.chart-' + key)[0] ).selectAll('div')
                    .data(data)
                    .enter()
                    .append('div')
                    .style('width', function(d) { return x(d.prevalence) + 'px'; })
                    .attr('class', 'bar ' + key)
                    .text(function(d) { return d.year + " / " + d.population + ': ' + d.prevalence + '%'; });

                bar.append('div')
                    .attr('class', 'baseline')
                    .style('left', x(average) + "px")

            })

        }


    });

})();
