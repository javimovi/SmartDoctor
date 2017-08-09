define([
    'backbone',
    'marionette',
    "../models/userDataModel",
    "text!../template/userDataTemplate.html",


  ], function (Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "click .userSexData": "onCLickUserSexData",
      "click #buttonUserData:not(.disabled)": "acceptPersonalData"
    },
    initialize: function () {
      this.model = new Model();
    },
    acceptPersonalData: function () {
      this.trigger('acceptPersonalData',this.model)
    },
    onRender: function () {
      var that = this;

      var handle = this.$el.find("#custom-handle");
      this.$el.find("#sliderDate").slider({
        range: "min",
        min: 0,
        max: 120,
        value: 0,
        slide: function (event, ui) {
          that.$el.find('#amountUserDate').text(ui.value);
          that.model.set("date", ui.value);
        }
      });
      this.$el.find("#amountUserDate").text(this.$el.find("#sliderDate").slider("value"));
    },
    onCLickUserSexData: function (e) {
      var user = $(e.target),
        sex;
      this.$el.find('.userSexData').parent().removeClass('selectedUserSex');
      user.parent().addClass('selectedUserSex');
      sex = user.prop("id") == "manImgUser" ? "man" : "woman";
      this.model.set("generoUser", sex);
    }
  });
  return View;
});
