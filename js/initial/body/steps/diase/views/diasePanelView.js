define([
    'backbone',
    'marionette',
    "../models/diasePanelModel",
    "text!../template/diasePanelTemplate.html"


  ], function (Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "change [type='radio']": "onChangeRadio"
    },
    initialize: function (options) {
      var that = this;
      this.model = new Model(options);
    },
    onChangeRadio: function (e) {
      
    },
    onRender: function () {
      this.$el.find('#descriptionDiase').append('<p>' + this.model.get("description") + '</p>');
      this.$el.find('#commentDiase').append('<p>' + this.model.get("comment") + '</p>');
      
    }
  });
  return View;
});
