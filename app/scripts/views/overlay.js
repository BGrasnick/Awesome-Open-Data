opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Overlay = Backbone.View.extend({

        template: JST['app/scripts/templates/overlay.ejs'],

        el: '#overlay',


        initialize: function () {
            this.currentCountry = null;

            _.bindAll(this, 'setCountry', 'reset');
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

        reset: function(){
            this.currentCountry = null;
            this.render();
        },

        setCountry: function ( country ) {
            this.currentCountry = country;
            this.render();
        }

    });

})();
