/*global opendata, Backbone, JST*/

opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Country = Backbone.View.extend({

        template: JST['app/scripts/templates/country.ejs'],

        events: {
            "click .country-pin"    : 'triggerPin',
            "click .country-close"  : 'triggerClose',
            "click a[data-toggle]"  : 'updateActiveTab',
            "click a[role]"         : 'updateActiveFilter',
            "change input"          : 'updateSlider'
        },

        triggerPin : function(evt){
            var that = this,
                btn = $(evt.target);


            btn.button('loading');

            setTimeout( function () {

                btn.button('reset');

                that.trigger('pin');

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

        updateActiveFilter: function(evt) {

          this.sliderValues = [];
          this.filter = $(evt.target).html().toLowerCase();
          var that = this;

          if ( this.filter == 'default' ) {
            this.filter = undefined;
            this.sliderValue = undefined;
          } else if ( this.filter == 'ages' ) {
            var drugs = this.model.get('drugs');

            var counter = 0;
            _.each(drugs, function(drug){

              if ( counter == 0 ) {

                var data = drug;

                var firstYear = '';
                var nestedCounter1 = 0;
                var nestedCounter2 = 0;
                _.each(drug, function(dataSet) {

                  if ( nestedCounter1 == 0 ) {
                    firstYear = dataSet.year;
                  }

                  if ( dataSet.year == firstYear ) {
                    that.sliderValues[nestedCounter2] = dataSet.population;
                    nestedCounter2++;
                  }

                  nestedCounter1++;
                });
              }

              counter++;
            });
          } else if ( this.filter == 'years' ) {
            var drugs = this.model.get('drugs');

            var counter = 0;
            _.each(drugs, function(drug){

              if ( counter == 0 ) {

                var data = drug;

                var firstPopulation = '';
                var nestedCounter1 = 0;
                var nestedCounter2 = 0;
                _.each(drug, function(dataSet) {

                  if ( nestedCounter1 == 0 ) {
                    firstPopulation = dataSet.population;
                  }

                  if ( dataSet.population == firstPopulation ) {
                    that.sliderValues[nestedCounter2] = dataSet.year;
                    nestedCounter2++;
                  }

                  nestedCounter1++;
                });
              }

              counter++;
            });
          }

          this.sliderValue = this.sliderValues[0];

          this.render();

        },

        initialize: function () {

            this.render();
        },

        render: function () {

            var data = this.model.toJSON();
            data.isPinned = opendata.PinnedCountries.contains(this.model);
            data.filter = this.filter;
            data.sliderValue = this.sliderValue;

            this.$el.html( this.template( data ) );

            this.renderChart();

            this.renderSlider();

        },

        renderChart : function() {

            var that = this;

            var drugs = that.model.get('drugs');

            if ( ! drugs ){
                return false;
            }

            _.each(drugs, function(drug, key){

              var data = drug;

              if ( that.filter ) {
                data = [];
                var counter = 0;
                _.each(drug, function(dataSet) {
                  if ( (that.filter == "ages" && dataSet.population == that.sliderValue) || ( that.filter == "years" && dataSet.year == that.sliderValue ) ) {
                    data[counter] = dataSet;
                    counter++;
                  }
                });
              }

              var x = d3.scale.linear()
              .domain( [0, d3.max(data, function(d){ return d.prevalence })] )
              .range( [0, 290] );

              d3.select( that.$('.chart-' + key)[0] ).selectAll('div')
              .data(data)
              .enter()
              .append('div')
              .style('width', function(d) { return x(d.prevalence) + 'px'; })
              .attr('class', 'bar ' + key)
              .text(function(d) { return d.year + " / " + d.population + ': ' + d.prevalence + '%'; });

            });

        },

        renderSlider: function() {
          if ( this.sliderValue ) {
            var $slider = $('input[type="range"]');

            $slider.val(this.sliderValues.indexOf(this.sliderValue));
          }
        },

        updateSlider: function() {
          var $slider = $('input[type="range"]');
          this.sliderValue = this.sliderValues[$slider.val()];

          this.render();
        }


    });

})();
