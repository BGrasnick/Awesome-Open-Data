window.opendata = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Config: {
        detailAvailableColor: '#c0392b',
        detailUnavailableColor: '#95a5a6'
    },
    init: function(){
        Backbone.history.start();
        window.opendata.App = new opendata.Views.App()
    }

}

$( function(){

    opendata.init()

} );
