(function () {

    ApplicationRouter = Backbone.Router.extend({

        routes : {
            "country/:id"   : "country",
            "*path"   : "default"
        },

        default : function(path){

            console.log("default route triggered: " + path);
        },

        country: function(id){
            window.opendata.App.goToCountry(id);
        }

    });

})();
