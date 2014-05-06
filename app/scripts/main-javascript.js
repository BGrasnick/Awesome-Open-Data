window.opendata = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function(){
        Backbone.history.start()

        opendata.Map = new opendata.Views.Map()
    }
}

$( function(){

    opendata.init()

} );
