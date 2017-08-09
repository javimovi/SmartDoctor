define([
    'backbone',
    'marionette',
    "../models/diasePanelModel",
    "text!../template/diasePanelTemplate.html"


  ], function (Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    initialize: function (options) {
      var that = this;
      this.model = new Model(options);
    },

    onRender: function () {
      this.$el.find('#descriptionDiase').append('<p>' + this.model.get("description") + '</p>');
      this.$el.find('#commentDiase').append('<p>' + this.model.get("comment") + '</p>');
      
    }
  });
  return View;
});
