define([
    'backbone',
    'marionette',
    "../models/bodyModel",
    "text!../template/bodyTemplate.html",
    "../steps/userData/views/userDataView",
    "../steps/insane/views/insaneDataView",
    "../steps/diase/views/diaseView",
    "../steps/valoration/views/valorationView",
    "../../../alerts"


  ], function (Backbone, Mn, Model, Template, UserDataView, Insane, Diase, Valoration, Alerts) {

  var View = Mn.View.extend({
    template: _.template(Template),
    currentView: null,
    currentName: '',
    regions: {
      "bodyView": "#bodyContainerView"
    },
    events:{
      "click .btn.btn-default": "onClickLater"
    },
    initialize: function () {
      this.model = new Model();
      this.indexView();
      this.alerts = new Alerts();
    },
    onClickLater: function () {
      if ( this.currentName == "insane" ){
        this.indexView();
      }
      else if ( this.currentName == "disease" ){
        this.insaneView();
      }
      else if ( this.currentName == "valoration" ){
        this.diseaseView();
      }
    },
    acceptPersonalData: function (model) {
      if (model.get("generoUser")) {
        this.model.set("personalData", model.attributes);
        this.insaneView();
      } else {
        this.alert("error", "Debe de seleccionar un sexo");
      }
    },
    acceptInsane: function (model) {
      if (model.get("listSelectedInsane").length > 1) {
        this.model.set("insane", model.get("listSelectedInsane"));
        this.diseaseView();
      } else {
        this.alert("error", "Debe de seleccionar al menos dos sintomas");
      }
    },
    acceptDiase: function (model) {
      if (model.get("radioOption")) {
        this.model.set("diase", model.get("radioOption"));
        this.valorationView();
      } else {
        this.alert("error", "Debe de seleccionar el diagnóstico que crea mas certero");
      }
    },
    acceptValoration: function (model) {
      this.alerts.notify("El proceso ha finalizado. Gracias por usar la aplicación");
      this.indexView();
    },
    indexView: function () {
      this.currentName = "index";
      var userDataView = new UserDataView();
      this.showView(userDataView);
      this.listenTo(userDataView, 'acceptPersonalData', _.bind(this.acceptPersonalData, this));
    },
    insaneView: function () {
      this.currentName = "insane";
      var insaneView = new Insane();
      this.showView(insaneView);
      insaneView.onShow();
      this.listenTo(insaneView, 'acceptInsane', _.bind(this.acceptInsane, this));
    },
    diseaseView: function () {
      this.currentName = "disease";
      var diseaseView = new Diase();
      this.showView(diseaseView);
      diseaseView.onShow();
      this.listenTo(diseaseView, 'acceptDiase', _.bind(this.acceptDiase, this));
    },
    valorationView: function () {
      this.currentName = "valoration";
      var valorationView = new Valoration();
      this.showView(valorationView);
      this.listenTo(valorationView, 'acceptValoration', _.bind(this.acceptValoration, this));
    },
    showView: function (view) {
      if (this.currentView) this.currentView.remove();
      this.currentView = view;
      this.currentView.render();
      this.render();
    },
    onRender: function () {
      if (this.currentView) this.showChildView("bodyView", this.currentView);

    },
    alert: function (type, text) {
      Lobibox.alert(type, //AVAILABLE TYPES: "error", "info", "success", "warning"
        {
          msg: text
        });
    }
  });
  return View;
});
