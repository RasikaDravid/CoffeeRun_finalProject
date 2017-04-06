(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No Remote URL supplied');
        }
        this.serverUrl = url;

    }
    RemoteDataStore.prototype.add = function(key, val) {
        //alert("I am here");
        //HEre I am over writing the value of id from db.jason server by email id here key is email id
        // and val is id
        var idg = {
            id: key
        };
        $.extend(val, idg);
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function(cb) {
        return $.get(this.serverUrl, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.get = function(key, cb) {
        return $.get(this.serverUrl + '/' + key, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.remove = function(key) {
        console.log(key);
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };


    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
