define([
    'backbone',
    'marionette',
    "../models/valorationCodeModel",
    "text!../template/valorationCodeTemplate.html",
    "../../../../../alerts"


  ], function (Backbone, Mn, Model, Template, Alerts) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "click #btnCheckCode": "onCheckCode",
      "click #acceptValidationCode:not(.disabled)": "onClickSave"
    },
    initialize: function () {
      this.model = new Model();
      this.alerts = new Alerts();
    },
    onRender: function () {
      var that = this;
      this.createSlider('sliderProbabilityUser', [0, 100], 0, function (event, ui) {
        that.$el.find('#amountProbabilityUser').text(ui.value + '%');
        that.model.set("probabilityUser", ui.value);
      }, 'amountProbabilityUser', 10, '0%');

      this.createSlider('sliderProbability', [0, 10], 0, function (event, ui) {
        that.$el.find('#amountProbability').text(ui.value);
        that.model.set("probability", ui.value);
      }, 'amountProbability', 1, '0');
      this.hideValorationNow();
    },
    onClickSave: function (e) {
      this.model.set("comment", this.$el.find('#textAreaValoration').val());
      this.trigger('acceptValorationCode', this.model);
    },
    onCheckCode: function (e) {
      var that = this;
      that.model.fetch({
        "success": function (data) {
          if (that.model.success) {
            that.showValorationNow();
            that.$el.find('#acceptValidationCode').removeClass('disabled');
            that.alerts.notify("El código es correcto");
          }
          else{
            that.alerts.notify("El código no es correcto", "error");
            return;
          }
        },
        "error": function (data) {
          $('#gifWait').css('display', 'none');
          that.alerts.notify("No se ha podido comprobar el código", "error");
        }
      });
    },
    hideValorationNow() {
      this.$el.find('#sliderProbabilityUser').slider("disable");
      this.$el.find('#sliderProbability').slider("disable");
      this.$el.find('#commentValoration textarea').prop("disabled", "true");
    },
    showValorationNow() {
      this.$el.find('#sliderProbabilityUser').slider("enable");
      this.$el.find('#sliderProbability').slider("enable");
      this.$el.find('#commentValoration textarea').removeProp("disabled");
    },
    createSlider: function (div, range, value, callback, text, steps, initValue) {
      this.$el.find("#" + div).slider({
        range: "min",
        min: range[0],
        max: range[1],
        value: value,
        slide: callback,
        step: steps,
      });
      this.$el.find("#" + text).text(initValue);
    }

  });
  return View;
});
