opendata.Views = opendata.Views || {};

(function () {
    'use strict';

    opendata.Views.Map = Backbone.View.extend({

        el: '#map',

        initialize: function () {

            this.g = null;
            this.filter = 'greenTest';
            this.colorScale = d3.scale.category20c();

            _.bindAll( this, 'requestCountryColor', 'render' );
            
            // When the user resizes the window:
            // only call render when he did not resize it anymore for 300 ms
            $(window).on( "resize.rerender" , _.debounce( this.render, 300 ));

        },

        setGlobalFilter: function ( filter ){
            this.filter = filter;

            // Update colors
            this.g.selectAll(".country")
                .style("fill", this.requestCountryColor)
        },

        render: function () {          

            var europeIdArray = [
              620,
              724,
              250,
              826,
              372,
              578,
              246,
              752,
              276,
              380,
              208,
              528,
              56,
              616,
              203,
              40,
              703,
              792,
              348,
              705,
              191,
              300,
              100,
              642,
              196,
              440,
              428,
              // fill empty holes, unfortunately no data
              756,
              442,
              70,
              688,
              807,
              8,
              499
            ];

            this.$el.empty();

            var that = this;

            var width = this.$el.outerWidth(),
                height = this.$el.outerHeight() - 3,
                active = d3.select(null);

            d3.select(self.frameElement).style("height", height + "px");

            var projection = d3.geo.mercator()
              .scale(170)
              .translate([width / 2, height / 2])
              .precision(0.1);

            var zoom = d3.behavior.zoom()
              .translate([0, 0])
              .scale(1)
              .scaleExtent([1, 8])
              .on("zoom", function () {
                  that.g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
              });

            var path = d3.geo.path()
              .projection(projection);

            var graticule = d3.geo.graticule();

            var svg = d3.select( this.el ).append("svg")
              .attr("width", width)
              .attr("height", height);

            svg.append("defs").append("path")
              .datum({type: "Sphere"})
              .attr("id", "sphere")
              .attr("d", path);

            svg.append("use")
              .attr("class", "fill")
              .attr("xlink:href", "#sphere");

            this.g = svg.append("g");

            svg
              .call(zoom) // delete this line to disable free zooming
              .call(zoom.event);

            d3.json("data/world.topo.json", function(error, world) {

                // var neighbours = topojson.neighbors( world.objects.countries.geometries)

                that.g.selectAll(".country")
                  .data( topojson.feature( world, world.objects.countries ).features )
                .enter().insert("path", ".graticule")
                  .attr("class", that.getClasses)
                  .attr("country-id", function( d ) { return d.id })
                  .attr("d", path)
                  .style("fill", that.requestCountryColor)
                  .on("click", clicked);

                // Country Borders
                that.g.insert("path", ".graticule")
                  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                  .attr("class", "boundary")
                  .attr("d", path);

                that.g.append("path")
                  .datum(topojson.merge(world, world.objects.countries.geometries.filter(function (d) { return _.contains(europeIdArray,d.id) ? d : null;})))
                  .attr("id", "europeOverlay")
                  .style("fill", "#5BCC8D")
                  .attr("d", path)
                  .on("click", clicked);

            });

            d3.json("/data/us.topo.json", function(error, us) {
                that.g.append("g")
                  .attr("id", "states")
                  .selectAll(".state")
                  .data( topojson.feature(us, us.objects['us_states_census.geo'] ).features )
                .enter()
                  .append("path")
                  .attr("class", "state")
                  .attr("state-id", function(d) { return d.id; })
                  .attr("d", path)
                  .style("stroke-width","0.2")
                  .style("stroke","white")
                  .style("fill", that.requestCountryColor)
                  .on("click", clicked);
            });

            function clicked(d) {
                if (d.id < 10000){
                    if (d.id === 840 ) {
                        $("#states").toggle()
                        $(".country.US").toggle()
                    }else{
                        $("#states").hide()
                        $(".country.US").show()
                    }
                }

                if (active.node() === this) return reset();
                active.classed("active", false);
                active = d3.select(this).classed("active", true);

                var bounds = path.bounds(d),
                    dx = bounds[1][0] - bounds[0][0],
                    dy = bounds[1][1] - bounds[0][1];

                // Sets a maximum zoom level
                if(dx < 25) dx = 40;

                var x = (bounds[0][0] + bounds[1][0]) / 2,
                    y = (bounds[0][1] + bounds[1][1]) / 2,
                    scale = .5 / Math.max(dx / width, dy / height),
                    translate = [width / 2 - scale * x, height / 2 - scale * y];

              svg.transition()
                .duration(750)
                .call(zoom.translate(translate).scale(scale).event)
                .each('end', function(){ that.trigger('country:focus', { id: d.id }) });
            }

            function reset() {

                active.classed("active", false);
                active = d3.select(null);

                that.trigger('country:blur');

                svg.transition()
                  .duration(750)
                  .call(zoom.translate([0, 0]).scale(1).event)
                  .each('end', function(){
                      $('#states').hide();
                      $('.country.US').show();
                  });
            }

            // If the drag behavior prevents the default click,
            // also stop propagation so we don’t click-to-zoom.
            function stopped() {
              if (d3.event.defaultPrevented) d3.event.stopPropagation();
            }

        },

        getClasses: function( d ){

            var classes = "country "
            var country = opendata.Countries.get( d.id );

            if ( ! country )
                throw "Missing country with id " + d.id;

            if( country.get('alpha-2') )
                classes += country.get('alpha-2')

            if( ! country.get('drugs') )
                classes += ' no-data '

            return classes;
        },

        requestCountryColor: function( d ){

            var currentFilter     = this.filter;
            var currentColorScale = this.colorScale;

            var country = opendata.Countries.get( d.id );

            if (! country ) return "red";

            if (currentFilter === 'greenTest') {

                try{
                    var cannabisData = country.get('drugs')['cannabis'];

                    var mostRecentEntry = _.max(cannabisData, function(obj) {
                        return (obj.population === 'all') ? obj.year : 0
                    });

                    var x = d3.scale.linear()
                      .domain([0, 30, 50])
                      .range([d3.rgb(255,255,255),d3.rgb(91,204,141),d3.rgb(91,204,141)])

                    return x(mostRecentEntry.prevalence);

                } catch(e) {
                    return '#222'
                }

            } else
                return currentColorScale( country.get(currentFilter) );

        }

    });

})();
