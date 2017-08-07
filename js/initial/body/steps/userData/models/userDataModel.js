define([
    'backbone'
], function(Backbone) {
  var Item = Backbone.Model.extend({
    defaults: {
      date: 0,
      generoUser: null
    }
  });
  return Item;
});
