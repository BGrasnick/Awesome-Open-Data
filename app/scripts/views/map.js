opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Map = Backbone.View.extend({

        el: '#map',

        events: {
            //'mouseover   .country' : 'handleMouseover'
        },

        initialize: function () {

            this.filter = 'detail';
            this.colorScale = d3.scale.category20c();

            _.bindAll(this, 'getCountryColor', 'render');

            // When the user resizes the window:
            // only call render when he did not resize it anymore for 300 ms
            $(window).on( "resize.rerender" , _.debounce( this.render, 300 ));

            // render the first time when the map is created
            this.render()
        },

        setRegionFilter: function ( filter ){
            this.filter = filter;
            this.render();
        },

        render: function () {

            this.$el.empty();

            var that = this;

            var that = this;

            var width = this.$el.outerWidth(),
                height = this.$el.outerHeight() - 3,
                active = d3.select(null);

            var projection = d3.geo.mercator()
                .scale(170)
                .translate([width / 2, height / 2])
                .precision(0.1);

            var zoom = d3.behavior.zoom()
                .translate([0, 0])
                .scale(1)
                .scaleExtent([1, 8])
                .on("zoom", zoomed);

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


            // svg.append("path")
            //     .datum(graticule)
            //     .attr("class", "graticule")
            //     .attr("d", path);

            d3.json("data/world.json", function(error, world) {

                var countries = topojson.feature( world, world.objects.countries ).features,
                    neighbors = topojson.neighbors( world.objects.countries.geometries);

                svg.selectAll(".country")
                    .data(countries)
                    .enter().insert("path", ".graticule")
                    .attr("class", that.getClasses)
                    .attr("country-id", function( d ) { return d.id })
                    .attr("d", path)
                    .style("fill", that.getCountryColor)
                    .on("click", clicked);

                svg.insert("path", ".graticule")
                    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                    .attr("class", "boundary")
                    .attr("d", path);

            });

            d3.select(self.frameElement).style("height", height + "px");

            function clicked(d) {
              if (active.node() === this) return reset();
              active.classed("active", false);
              active = d3.select(this).classed("active", true);

              var bounds = path.bounds(d),
                  dx = bounds[1][0] - bounds[0][0],
                  dy = bounds[1][1] - bounds[0][1],
                  x = (bounds[0][0] + bounds[1][0]) / 2,
                  y = (bounds[0][1] + bounds[1][1]) / 2,
                  scale = .5 / Math.max(dx / width, dy / height),
                  translate = [width / 2 - scale * x, height / 2 - scale * y];

              svg.transition()
                  .duration(750)
                  .call(zoom.translate(translate).scale(scale).event);
            }

            function reset() {
              active.classed("active", false);
              active = d3.select(null);

              svg.transition()
                  .duration(750)
                  .call(zoom.translate([0, 0]).scale(1).event);
            }

            function zoomed() {
              svg.style("stroke-width", 1.5 / d3.event.scale + "px");
              svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }

            // If the drag behavior prevents the default click,
            // also stop propagation so we don’t click-to-zoom.
            function stopped() {
              if (d3.event.defaultPrevented) d3.event.stopPropagation();
            }

        },

        getClasses: function( d , index ){

            var classes = "country "
            var country = opendata.CountryHelper.getCountryByID( d.id );

            if( country && country['alpha-2'])
                classes += country['alpha-2']

            return classes;
        },

        getCountryColor: function( d ){

            if (d.id < 0) //-99
                return "RGBA(255,255,255,0)";

            var currentFilter     = this.filter;
            var currentColorScale = this.colorScale;

            var country = opendata.CountryHelper.getCountryByID( d.id );

            if( currentFilter === 'detail'){

                var config = window.opendata.Config;

                return country && country.detail ? config.detailAvailableColor : config.detailUnavailableColor;

            } else {

                return currentColorScale( country[currentFilter] );
            }

        }

//        handleMouseover: function( evt ){
//            var $el = $( evt.target );
//            if( $el ){
//
//                var country = opendata.CountryHelper.getCountryByID( $el.attr("country-id") );
//
//                if( country && country.name )
//                    opendata.App.nav.render( country.name );
//
//            }
//
//        }

    });

})();
