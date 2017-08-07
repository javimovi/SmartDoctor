define([
    'backbone',
    'marionette',
    "../models/initialModel",    
    "text!../template/initialTemplate.html",    
    "../header/views/headerView",
    "../sidebar/views/sidebarView",    
    "../body/views/bodyView"
 
  ], function(Backbone, Mn, InitialModel, InitialTemplate, HeaderView, SidebarView, BodyView) {
  var InitialView = Mn.View.extend({
    template: _.template(InitialTemplate),
    regions:{
      "header": "#header",
      "sidebar": "#sidebar",
      "body": "#body"
    },
    initialize: function() {
        this.model = new InitialModel();
    
        this.headerView = new HeaderView();
        this.sidebarView = new SidebarView();
        this.bodyView = new BodyView();
    },
    onRender: function(){
        this.showChildView("header", this.headerView);
        this.showChildView("sidebar", this.sidebarView);
        this.showChildView("body", this.bodyView);
    }                                    
  });
  return InitialView;
});
