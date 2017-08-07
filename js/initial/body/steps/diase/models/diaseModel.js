define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
  var Model = Backbone.Model.extend({
    urlRoot: 'https://httpbin.org',

    url: function () {
      var url = this.urlRoot + '/get';
      return url;

    },
    parse: function (data) {
      data = [
        {
          "Value": "1",
          "Text": "Fiebre del heno",
          "Description": 'Las principales consecuencias de esta patologias son...',
          "Comment": "Es recomendable una vez al día...y acudir a su médico",
          "CurrentProbability": 89
          },
        {
          "Value": "2",
          "Text": "Rinitis no alérgica",
          "Description": 'Las principales consecuencias de esta patologias son...',
          "Comment": "Es recomendable una vez al día...y acudir a su médico",
          "CurrentProbability": 2
          },
        {
          "Value": "3",
          "Text": "Resfriado común",
          "Description": 'Las principales consecuencias de esta patologias son...',
          "Comment": "Es recomendable una vez al día...y acudir a su médico",
          "CurrentProbability": 16
          }
      ];
      this.set("listPatientDiseases", (_.sortBy(data, "CurrentProbability")).reverse());
    },


    defaults: {
      listPatientDiseases: [],
      collection: []
    }

  });

  return Model;
});
