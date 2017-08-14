define([
    'backbone',
    'marionette',
    "../models/valorationModel",
    "text!../template/valorationTemplate.html",
    "../../../../../alerts"


  ], function (Backbone, Mn, Model, Template, Alerts) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "click #buttonGenerateCode": "onClickGenerateCode",
      "click #spanGenerateCodeClose": "onClickGenerateCodeClose",
      "click #acceptValidation": "onClickSave"
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

    },
    onClickSave: function (e) {
      this.model.set("comment", this.$el.find('#textAreaValoration').val());
      this.trigger('acceptValoration', this.model);
    },
    onClickGenerateCode: function (e) {
      var that = this;
      that.model.fetch({
        "success": function (data) {
          that.hideValorationNow();
          that.model.set("isCodeGenerate", true);
          that.$el.find('#divGenerateCode').css('display', 'block');
          that.$el.find('#spanGenerateCode').text(that.model.get("codeValoration"));

          that.alerts.notify("Se ha generado el código correctamente");
        },
        "error": function (data) {
          $('#gifWait').css('display', 'none');
          that.alerts.notify("No se ha podido generar el código de valoración", "error");
        }
      });
    },
    onClickGenerateCodeClose: function (e) {
      this.$el.find('#divGenerateCode').css('display', 'none');
      this.model.set("isCodeGenerate", false);
      this.showValorationNow();
    },
    hideValorationNow() {
      this.$el.find('#sliderProbabilityUser').slider("disable");
      this.$el.find('#sliderProbability').slider("disable");
      this.$el.find('#commentValoration textarea').prop("disabled", "true");
    },
    showValorationNow() {
      this.$el.find('#sliderProbabilityUser').slider("enable");
      this.$el.find('#sliderProbability').slider("enable");
      this.$el.find('#commentValoration textarea').removeProp( "disabled");
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
