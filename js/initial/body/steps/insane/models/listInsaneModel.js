
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
      data = {"listInsane": [
        {"Value":"1","Text": "Dificultad para respirar"},
        {"Value":"2","Text": "Dificultad para tragar"},
        {"Value":"3","Text": "Dolor abdominal"},
        {"Value":"4","Text": "Dolor de cabeza"},
        {"Value":"5","Text": "Dolor de cadera"},
        {"Value":"6","Text": "Dolor de cuello"},
        {"Value":"7","Text": "Dificultad para respirar2"},
        {"Value":"8","Text": "Dificultad para tragar2"},
        {"Value":"9","Text": "Dolor abdominal2"},
        {"Value":"10","Text": "Dolor de cabeza2"},
        {"Value":"11","Text": "Dolor de cadera2"},
        {"Value":"12","Text": "Dolor de cuello2"},
      ]};
      return data;
    },
    defaults: {
      listInsane: [],
      listSelectedInsane: []
    }

  });

  return Model;
});

