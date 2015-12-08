var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AppStore = assign({}, EventEmitter.prototype,{
  bookInfo : {},
  emitChange : function(bookInfo){
    this.bookInfo = bookInfo;
    this.emit(CHANGE_EVENT);
  },
  getBookInfo : function(){
    return this.bookInfo;
  }
});

AppDispatcher.register(function(payload){
  var type = payload.action.actionType;
  switch (type) {
    case Constants.UPDATE_CONTENTS:
      console.log(type);
      AppStore.emitChange(payload.action.bookInfo);
      break;
    default:
      return true;
  }
});
module.exports = AppStore;
