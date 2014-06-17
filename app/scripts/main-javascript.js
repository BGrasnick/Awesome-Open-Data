window.opendata = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Config: {
        detailAvailableColor   : '#c0392b',
        detailUnavailableColor : '#95a5a6'
    },
    PinnedCountries: null,

    init: function(){
        Backbone.history.start();
        window.opendata.App = new opendata.Views.App()
        window.opendata.PinnedCountries = new opendata.Collections.Country();
    }

};

$( opendata.init );
