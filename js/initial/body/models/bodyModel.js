define([
    'backbone'
], function(Backbone) {
  var Item = Backbone.Model.extend({
    defaults: {
      personalData: null,
      insane: null
    }
  });
  return Item;
});
