opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Map = Backbone.View.extend({

        el: '#map',

        events: {
            'mouseover .country' : 'handleMouseover'
        },

        initialize: function () {

            this.filter = 'detail';
            this.colorScale = d3.scale.category20();

            // When the user resizes the window:
            // only call render when he did not resize it anymore for 300 ms
            var debouncedRender = _.debounce(this.render, 300);
            $(window).on( "resize.rerender" , _.bind( debouncedRender, this ) );

            // render the first time when the map is created
            this.render()
        },

        setRegionFilter: function (filter){;
            this.filter = filter;
            this.render()
        },

        handleMouseover: function( evt ){
            var $country = $(evt.target);
            if( $country ){
                var country = opendata.CountryHelper.getCountryByID($country.attr("country-id"))

                if( country && country.name )
                    opendata.App.nav.render(country.name)

            }

        },

        render: function () {

            this.$el.empty()

            var width = this.$el.outerWidth(),
                height = this.$el.outerHeight() - 3;

            var projection = d3.geo.mercator()
                .scale(170)
                .translate([width / 2, height / 2])
                .precision(.1);

            var path = d3.geo.path()
                .projection(projection);

            var graticule = d3.geo.graticule();

            var svg = d3.select("#" + this.el.id).append("svg")
                .attr("width", width)
                .attr("height", height);

            svg.append("defs").append("path")
                .datum({type: "Sphere"})
                .attr("id", "sphere")
                .attr("d", path);


            svg.append("use")
                .attr("class", "fill")
                .attr("xlink:href", "#sphere");

            svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);


            d3.json("data/world.json", function(error, world) {

                var countries = topojson.feature(world, world.objects.countries).features,
                    neighbors = topojson.neighbors(world.objects.countries.geometries);

                svg.selectAll(".country")
                    .data(countries)
                    .enter().insert("path", ".graticule")
                    .attr("class", "country")
                    .attr("country-id", function( d ) { return d.id; })
                    .attr("d", path)
                    .style("fill", opendata.Views.Map.prototype.getCountryColor);

                svg.insert("path", ".graticule")
                    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                    .attr("class", "boundary")
                    .attr("d", path);

            });

            d3.select(self.frameElement).style("height", height + "px");

        },

        getCountryColor: function( d ){

            var currentFilter     = opendata.App.map.filter;
            var currentColorScale = opendata.App.map.colorScale;

            if( currentFilter === 'detail'){
                var country = opendata.CountryHelper.getCountryByID( d.id );
                var config = window.opendata.Config;

                return country && country.detail ? config.detailAvailableColor : config.detailUnavailableColor;
            }
            else{
                if (d.id == -99)
                    return "RGBA(255,255,255,0)";

                var country = opendata.CountryHelper.getCountryByID(d.id);

                var code = country[currentFilter];

                return currentColorScale(code);
            }

        }

    });

})();
