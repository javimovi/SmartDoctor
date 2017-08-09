define([
    'jquery',
    'underscore',
    'marionette',
    'backbone',
    'lobibox'
], function ($, _, Marionette) {
    return Marionette.Object.extend({
        pool: [], // Pool of opened alerts. Don forget to implement beforeClose event on new alerts types

        initialize: function () {
            Lobibox.notify.DEFAULTS.soundPath = '../bower_components/lobibox/sounds/';
            Lobibox.alert.DEFAULTS.iconClass = false;
            _.bindAll(this, 'alert','alertConfirm','notify');
        },
        /*alerts:
            msg: text of message.(mandatory)
            type: type of alerts. options->[info,warning,error,success]
        */
        alert: function (msg, type, options) {
            type = _.isUndefined(type) ? "error" : type;
            var alert = Lobibox.alert(type, _.extend({
                msg: msg,
                buttons: {
                    ok: {
                        'class': 'btn btn-warning',
                        closeOnClick: true
                    }
                }
            },options));
            this.pool.push(alert);
        },
        alertConfirm: function (msg,callbackSuccess, callbackError, options) {
            var alert = Lobibox.alert('info', _.extend({
                msg: msg,
                buttons: {
                    no: {
                        'class': 'btn-mnt enabledCancel',
                        closeOnClick: true
                    },
                    yes: {
                        'class': 'btn-mnt enabledAccept',
                        closeOnClick: true
                    }
                },
                callback: function (lobibox, type) {
                    var btnType;
                    if (type === 'no' && !_.isUndefined(callbackError) && !utils.isNullUndefinedOrEmpty(callbackError)) {
                        callbackError();
                    } else if (type === 'yes') {
                        callbackSuccess();
                    } 
                },
                beforeClose: _.bind(function (lbbox){
                    this.pool = _.without(this.pool, _.find(this.pool, function(poolAlert){
                        return poolAlert.$el === lbbox.$el;
                    }));
                    if (!utils.isNullUndefinedOrEmpty(lbbox.$options.onBeforeClose)) lbbox.$options.onBeforeClose();
                }, this)

            }, options));
            this.pool.push(alert);
        },
        //notify
        notify: function (msg, type, options) {
            type = _.isUndefined(type) ? "success" : type;
            var alert = Lobibox.notify(type, _.extend({
                size: 'mini',
                sound: false,
                showClass: 'jumpUp',
                hideClass: 'zoomOut',
                position: 'center bottom',
                delayIndicator: false,
                msg: msg,
                beforeClose: _.bind(function (lbbox){
                    this.pool = _.without(this.pool, _.find(this.pool, function(poolAlert){
                        return poolAlert.$el === lbbox.$el;
                    }));
                    if (!utils.isNullUndefinedOrEmpty(lbbox.$options.onBeforeClose)) lbbox.$options.onBeforeClose();
                }, this)

            }, options));
            //this.pool.push(alert);
        },

        closeAll: function() {
            _.each(this.pool, function(alert){
                alert.destroy();
            });
            this.pool = [];
        }
    });
});