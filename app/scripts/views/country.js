opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Country = Backbone.View.extend({

        template: JST['app/scripts/templates/country.ejs'],

        el: '#country',

        events: {
            'click .country-tooltip-close' : 'removeView',
            'click .country-add-view' : 'addView'
        },

        initialize: function () {
            this.currentCountry = null;
            this.currentDrug    = 'cannabis';
            this.numberOfViews  = 0;

            _.bindAll(this, 'setCountry');
        },

        render: function () {

                this.numberOfViews  = 0;

            if( this.currentCountry ) {

                this.$el.html( this.template( this.currentCountry.toJSON(), this.currentDrug ) );

                this.renderButton();

                this.renderChart();

            } else {

                this.$el.empty();

            }

        },

        renderButton: function() {

            var that = this;

            var drugs = that.currentCountry.get('drugs');

            if ( drugs ){

                d3.select( that.$('.country-add-view-container')[0] ).selectAll('div')
                .data('+')
                .enter().append('div')
                .attr('class', 'country-add-view')
                .text('+');
            }
        },

        renderChart : function() {

            var that = this;

            var drugs = that.currentCountry.get('drugs');

            if ( ! drugs ){
                return false;
            }
            var data = drugs['cannabis'];

            var x = d3.scale.linear()
                      .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                      .range( [0, 290] );

            d3.select( that.$('.chart-cannabis')[that.numberOfViews] ).selectAll('div')
              .data(data)
              .enter()
              .append('div')
              .style('width', function(d) { return x(d.prevalence) + 'px'; })
              .attr('class', 'bar ' + 'cannabis')
              .text(function(d) { return d.population + ': ' + d.prevalence + '%'; });

            
            data = drugs['amphetamines'];

            var x = d3.scale.linear()
                      .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                      .range( [0, 290] );

            d3.select( that.$('.chart-amphetamines')[that.numberOfViews] ).selectAll('div')
              .data(data)
              .enter()
              .append('div')
              .style('width', function(d) { return x(d.prevalence) + 'px'; })
              .attr('class', 'bar ' + 'amphetamines')
              .text(function(d) { return d.population + ': ' + d.prevalence + '%'; });

            
            data = drugs['cocaine'];

            var x = d3.scale.linear()
                      .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                      .range( [0, 290] );

            d3.select( that.$('.chart-cocaine')[that.numberOfViews] ).selectAll('div')
              .data(data)
              .enter()
              .append('div')
              .style('width', function(d) { return x(d.prevalence) + 'px'; })
              .attr('class', 'bar ' + 'cocaine')
              .text(function(d) { return d.population + ': ' + d.prevalence + '%'; });


            data = drugs['ecstasy'];

            var x = d3.scale.linear()
                      .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
                      .range( [0, 290] );

            d3.select( that.$('.chart-ecstasy')[that.numberOfViews] ).selectAll('div')
              .data(data)
              .enter()
              .append('div')
              .style('width', function(d) { return x(d.prevalence) + 'px'; })
              .attr('class', 'bar ' + 'ecstasy')
              .text(function(d) { return d.population + ': ' + d.prevalence + '%'; });
        },

        setCountry: function ( country ) {
            this.currentCountry = country;
            this.render();
        },

        removeView: function () {

            var that = this;

            if ( this.numberOfViews <= 0 ) {
                this.currentCountry = null;
                this.render();
            }

            this.numberOfViews--;

            // TODO remove view
        },

        addView: function () {

            var that = this;

            var drugs = that.currentCountry.get('drugs');

            for ( var drug in drugs ) {
                if ( drug != that.currentDrug ) {
                    that.currentDrug = drug;
                    break;
                }
            }

            d3.select( that.$( '.country-drop-container' )[0] )
              .append('div')
              .attr('class', 'country-dropped-container')
              .html( that.template( that.currentCountry.toJSON(), that.currentDrug ) );

            that.numberOfViews = d3.select( that.$( '.country-dropped-container' )['length'] );
            that.renderChart();
        }

    });

})();
