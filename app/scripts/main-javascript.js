window.opendata = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function(){
        Backbone.history.start();
        window.opendata.App = new opendata.Views.App()
    }
}

$( function(){

    opendata.init()

} );
