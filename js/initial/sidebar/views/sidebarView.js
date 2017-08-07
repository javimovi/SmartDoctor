define([
    'backbone',
    'marionette',
    "../models/sidebarModel",    
    "text!../template/sidebarTemplate.html",


  ], function(Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    initialize: function() {
        this.model = new Model();
      
    },
    onRender: function(){
      this.$el.find(".btn-nav").on("click tap", function() {
        this.$el.find(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
        this.$el.find.toggleClass("animated");
      });
    }
  });
  return View;
});
