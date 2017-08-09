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
      this.set("codeValoration", 'BX35D');
    },
    defaults: {
      codeValoration: '',
      probabilityUser: 0,
      probability: 0,
      comment: '',
      isCodeGenerate: true
    }
  });
  return Item;
});
