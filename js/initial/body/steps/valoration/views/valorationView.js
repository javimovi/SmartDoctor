define([
    'backbone',
    'marionette',
    "../models/valorationModel",
    "text!../template/valorationTemplate.html",


  ], function (Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    initialize: function () {
      this.model = new Model();
    }    
  });
  return View;
});
