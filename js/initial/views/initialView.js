define([
    'backbone',
    'marionette',
    "../models/initialModel",
    "text!../template/initialTemplate.html",
    "../header/views/headerView",
    "../sidebar/views/sidebarView",
    "../body/views/bodyView"

  ], function (Backbone, Mn, InitialModel, InitialTemplate, HeaderView, SidebarView, BodyView) {
  var InitialView = Mn.View.extend({
    template: _.template(InitialTemplate),
    regions: {
      "header": "#header",
      "sidebar": "#sidebar",
      "body": "#body"
    },
    events: {
      "click #tabDiase:not(.open)": "onClickTabDiase",
      "click #tabValorationCode:not(.open)": "onClickTabValoration"
    },
    initialize: function () {
      this.model = new InitialModel();

      this.headerView = new HeaderView();
      this.sidebarView = new SidebarView();
      this.bodyView = new BodyView();
      this.listenTo(this.bodyView, 'acceptValorationCodeTrigger', _.bind(this.onClickTabDiase, this));
    },
    onClickTabDiase: function () {
      this.$el.find('#tabValorationCode').removeClass('open');
      this.$el.find('#tabDiase').addClass('open');
      this.$el.find('.row.bs-wizard').css('visibility','initial');
      this.bodyView.showInitialDiase();
    },
    onClickTabValoration: function () {
      this.$el.find('#tabDiase').removeClass('open');
      this.$el.find('#tabValorationCode').addClass('open');
      this.$el.find('.row.bs-wizard').css('visibility','hidden');
      this.bodyView.showValorationCode();
    },
    onRender: function () {
      this.showChildView("header", this.headerView);
      this.showChildView("sidebar", this.sidebarView);
      this.showChildView("body", this.bodyView);
    }
  });
  return InitialView;
});
