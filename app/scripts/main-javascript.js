window.opendata = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function(){
        Backbone.history.start()

        window.opendata.Map = new opendata.Views.Map()
    }
}

$( function(){

    opendata.init()

} );
