var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require("object-assign");

var CHANGE_EVENT = 'change';
var _nodes = [];

var ExampleStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(listener){
    this.removeListener(CHANGE_EVENT,listener)
  },

  get: function(id) {
    return _nodes[id];
  },

  getAll: function() {
    return _nodes;
  },
});


ExampleStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case "RECEIVE_NODES":
      _nodes = action.rawNodes;
      ExampleStore.emitChange();
      break;  
    default:
      // do nothing
  }

});

module.exports = ExampleStore;
