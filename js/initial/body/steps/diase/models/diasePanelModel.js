define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      description: null,
      comment: null,
      id: null,
      radioOption: null
    },
    initialize: function (options) {
      if (options) this.set(options);
    }

  });

  return Model;
});
