define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
  var Model = Backbone.Model.extend({
    initialize: function(options){
      if(options) this.set(options);
    }

  });

  return Model;
});
