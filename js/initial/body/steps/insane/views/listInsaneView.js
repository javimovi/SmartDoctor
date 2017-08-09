define([
    'backbone',
    'marionette',
    "../models/listInsaneModel",
    "text!../template/listInsaneTemplate.html"


  ], function (Backbone, Mn, Model, Template) {
  var View = Mn.View.extend({
    template: _.template(Template),
    events: {
      "keyup #textFilterSintom": "onKeyUp",
      "click .listSintomParent": "onClickRow"
    },
    initialize: function () {
      var that = this;
      this.model = new Model();
      this.model.fetch({
        "success": function (data) {
          that.createList(data);
          $('#gifWait').css('display', 'none');
        },
        "error": function (data) {
          $('#gifWait').css('display', 'none');
        }
      });
    },
    createList: function (model) {
      var that = this;
      _.each(model.get("listInsane"), function (unit) {
        var row = '<div class="listSintomParent list-group-item"><span class="listSintomClass">' + unit.Text + '</></span>';
        that.$el.find('#listSintom').append(row);
      });
    },
    onKeyUp: function (e) {
      var input, filter, list, i;
      input = this.$el.find("#textFilterSintom");
      filter = input.val().toUpperCase();
      list = this.$el.find("#listSintom");
      var list = list.find(".listSintomClass");
      for (i = 0; i < list.length; i++) {
        text = list[i].innerText;
        if (text) {
          if (text.toUpperCase().indexOf(filter) > -1) {
            list[i].parentElement.style.display = "";
          } else {
            list[i].parentElement.style.display = "none";
          }
        }
      }
    },
    onClickRow: function (e) {
      var elem = $(e.currentTarget),
        text = elem.find('span').text();
      elem.hasClass('selectedItemList') ? this.removeOfList(text) : this.addToList(text);
      elem.toggleClass('selectedItemList');
    },
    addToList: function (text) {
      var row = _.find(this.model.get("listInsane"), {
        "Text": text
      });
      if (row) this.model.get("listSelectedInsane").push(row);
    },
    removeOfList: function (text) {
      var row = _.find(this.model.get("listInsane"), {
        "Text": text
      });
      if (row) {
        var models = this.model.get("listSelectedInsane").filter(function (el) {
          return row.Value !== el.Value;
        });
        this.model.set("listSelectedInsane", models)
      }
    },
    updateListSelected: function () {

    }
  });
  return View;
});
