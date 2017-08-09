define([
    'backbone',
    'marionette',
    "../models/insaneDataModel",
    "text!../template/insaneDataTemplate.html",
    "./listInsaneView",


  ], function (Backbone, Mn, Model, Template, ListInsane) {
  var View = Mn.View.extend({
    regions:{
      "listInsane": "#listInsane"
    },
    events:{
      "click #buttonInsaneData:not(.disabled)": "acceptInsane"
    },
    template: _.template(Template),
    initialize: function () {
      this.model = new Model();
      this.listInsane = new ListInsane();
    },
    acceptInsane: function () {
      this.trigger('acceptInsane',this.listInsane.model)
    },
    onRender: function () {
      this.showChildView("listInsane", this.listInsane);
    },
    onShow: function () {
      $('#gifWait').css('display','block');
    }
  });
  return View;
});
