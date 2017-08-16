define([
    'backbone',
    'marionette',
    "../models/diaseModel",
    "text!../template/diaseTemplate.html",
    "./diasePanelView"


  ], function (Backbone, Mn, Model, Template, DiasePanelView) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "click #buttonDiase:not(.disabled)": "acceptDiase",
      "change [type='radio']": "onChangeRadio"
    },
    initialize: function () {
      var that = this;
      this.model = new Model();
      this.model.fetch({
        "success": function (data) {
          that.createListDiase();
          $('#gifWait').css('display', 'none');
        },
        "error": function (data) {
          $('#gifWait').css('display', 'none');
        }
      });
    },
    onChangeRadio: function (e) {
      this.model.set("radioOption", e.currentTarget.id)
    },
    acceptDiase: function () {
      this.trigger('acceptDiase', this.model)
    },
    createListDiase: function () {
      var that = this;


      _.each(this.model.get("listPatientDiseases"), function (diase, iteratee) {
        var div = '<h3 id="' + diase.Value + '" style="margin-top: 6px !important;height: 37px;    width: 95%;margin: 0 auto;"></h3><div style=" border: none;" id="diaseAccordion' + diase.Value + '"></div>';

        var innerDiv = '<div class="nameAccodion">' + diase.Text + '</div><span class="badge">' + diase.CurrentProbability + '%</span>';

        if(iteratee == 0) that.model.set("radioOption", diase.Value);

        var diasePanel = new DiasePanelView({
          description: diase.Description,
          comment: diase.Comment,
          id: diase.Value,
          chooseSystem: iteratee == 0
        });
        diasePanel.render();
        that.model.get("collection").push(diasePanel);

        that.$el.find('#viewDiase #listAccordion').append(div);
        that.$el.find('#viewDiase #listAccordion #' + diase.Value).append(innerDiv);
        that.$el.find('#viewDiase #listAccordion #diaseAccordion' + diase.Value).append(diasePanel.$el);
      });

      this.$el.find("#listAccordion").accordion({
        collapsible: true
      });

    }
  });
  return View;
});
