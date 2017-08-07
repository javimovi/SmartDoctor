require.config({

	paths: {
    'jquery': 'lib/jquery',    
    'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',
    'underscore': "../bower_components/underscore/underscore",
    'backbone': '../bower_components/backbone/backbone',
    'backbone.radio' : '../bower_components/backbone.radio/build/backbone.radio',
    'jqueryUI' : '../bower_components/jquery-ui/jquery-ui',
    "text" : 'lib/require-text',
    'lobibox' : '../bower_components/lobibox/js/lobibox'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    'marionette': {
      deps: ["underscore", "jquery"],
      exports: 'Marionette'
    },
    'backbone.radio': {
      deps: ["underscore", "jquery"],
      exports: 'backbone.radio'
    },
    "jqueryUI": {
      deps: ["jquery"]
    },
    "lobibox":{
      deps: ["jquery"]
    }
  }
});

require(
  ["jquery",
   "underscore",
   "backbone",
   'marionette',
   'backbone.radio',
   "initial/views/initialView",
   "jqueryUI",
   "lobibox"
  ],
  function($, _, Backbone, Marionette, BackboneRadio, InitialView) {
    $(function() {
      Backbone.$ = window.$;
      var initial = new InitialView();
      initial.render();
      $(this).find('#initialView').append(initial.$el)
    });
  }
);

