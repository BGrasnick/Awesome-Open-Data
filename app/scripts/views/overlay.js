opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Overlay = Backbone.View.extend({

        template: JST['app/scripts/templates/overlay.ejs'],

        el: '#overlay',

        events: {
            'click .country-close'    : 'close',
            'click .country-add-view' : 'addView'
        },

        initialize: function () {
            this.currentCountry = null;
            this.numberOfViews  = 0;

            _.bindAll(this, 'setCountry', 'close');
        },

        render: function () {

            if( !this.currentCountry && !opendata.PinnedCountries.length )
                return this.$el.empty()


            this.$el.html( this.template() );

            if( this.currentCountry ){

                var currentCountry = new opendata.Views.Country({ model: this.currentCountry });

                $('#current-country-card').html( currentCountry.render() );

            }

            var pinned = $('#pinned-country-cards');

            var that = this,
                view = null,
                id   = null;

            opendata.PinnedCountries.each( function( Country ) {
                view = new opendata.Views.Country({ model: Country })

                view.on('close', function( evt ){
                    console.log(evt);
                    opendata.PinnedCountries.remove( evt.id )
                    that.render();
                });

                pinned.append( view.render() )
            });

//            this.renderButton();
        },

        renderButton: function() {

            var that = this;

            var drugs = that.currentCountry.get('drugs');


            // Why use d3? use jquery instead -> way simpler
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


        close: function( evt ){
            var id = $(evt.target).data('id');

            // First: Check if we have a country to safely access it's id
            if( this.currentCountry && id === this.currentCountry.id ){
                console.log("remove current country")
                this.currentCountry = null;
            }

            opendata.PinnedCountries.remove(id);

            this.render()
        }

    });

})();
