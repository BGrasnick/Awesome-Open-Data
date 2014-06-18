opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Overlay = Backbone.View.extend({

        template: JST['app/scripts/templates/overlay.ejs'],

        el: '#overlay',


        initialize: function () {
            this.currentCountry = null;
            this.numberOfViews  = 0;

            _.bindAll(this, 'setCountry');
        },

        render: function () {

            if( !this.currentCountry && !opendata.PinnedCountries.length )
                return this.$el.empty()


            var that = this;
            this.$el.html( this.template() );


            if( this.currentCountry && ! opendata.PinnedCountries.contains(this.currentCountry) ){

                console.log("render current: ", this.currentCountry.get('name'));

                var currentCountry = new opendata.Views.Country({
                    el    : '#current-country-card',
                    model : this.currentCountry
                });

                currentCountry.on('pin', function() {

                    opendata.PinnedCountries.add(this.model);
                    that.render();

                });

                currentCountry.on('close', function() {

                    that.currentCountry = null;
                    that.render();

                });

            }

            var pinned = $('#pinned-country-cards');

            var that = this,
                view = null;

            opendata.PinnedCountries.each( function( Country ) {

                view = new opendata.Views.Country({ model: Country });

                console.log("render pinned: ", Country.get('name'));

                view.on('close', function( evt ){

                    opendata.PinnedCountries.remove( evt.id );

                    that.render();
                });

                pinned.append( view.$el )

            });

        },
//
//        renderButton: function() {
//
//            var that = this;
//
//            var drugs = that.currentCountry.get('drugs');
//
//
//            // Why use d3? use jquery instead -> way simpler
//            if ( drugs ){
//
//                d3.select( that.$('.country-add-view-container')[0] ).selectAll('div')
//                .data('+')
//                .enter().append('div')
//                .attr('class', 'country-add-view')
//                .text('+');
//            }
//        },


        setCountry: function ( country ) {
            this.currentCountry = country;
            this.render();
        }

    });

})();
