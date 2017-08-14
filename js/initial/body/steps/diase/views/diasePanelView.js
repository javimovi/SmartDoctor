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
      var textNormal = "Yo pienso que este diagnóstico se acerca más";
      var textChooseSystem = "El sistema cree que este diagnóstico se acerca más";

      this.$el.find('#descriptionDiase').append('<p>' + this.model.get("description") + '</p>');
      this.$el.find('#commentDiase').append('<p>' + this.model.get("comment") + '</p>');

      this.$el.find('.divRadioButton span').text(this.model.get("chooseSystem") ? textChooseSystem : textNormal);

      if (this.model.get("chooseSystem")) {
        this.$el.find('.divRadioButton input').prop("checked", "true").change(); 
      }
    }
  });
  return View;
});
