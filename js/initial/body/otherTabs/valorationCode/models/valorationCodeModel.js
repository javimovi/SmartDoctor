define([
    'backbone'
], function(Backbone) {
  var Item = Backbone.Model.extend({
    urlRoot: 'https://httpbin.org',

    url: function () {
      var url = this.urlRoot + '/get';
      return url;
    },
    parse: function (data) {
      this.success = true;
    },
    defaults: {
      probabilityUser: 0,
      probability: 0,
      comment: ''
    }
  });
  return Item;
});
