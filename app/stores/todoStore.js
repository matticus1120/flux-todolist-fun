var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _task_store = {
  list: [],
  selectedItemId : null
};

var _comments = [];

var getCurrentTime = function() {
  var d = new Date();
  var theTime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ', ' + d.getHours() + ':' + d.getMinutes();
  return theTime;
}

var convertRawTask = function(item) {
  item.time = getCurrentTime();
  item.author = 'Matty Mick-C';
  item.itemIndex = _task_store.list.length;
  return item;
}

var convertRawComment = function(comment) {
  var newComment = {};
  newComment.time = getCurrentTime();
  newComment.comment = comment;
  newComment.author = 'Matty Mick-C';
  newComment.itemId = _task_store.selectedItemId;
  return newComment;
}


var addItem = function(item){
  _task_store.list.push(convertRawTask(item));
};

var removeItem = function(index){
  _task_store.list.splice(index, 1);
}

var completeItem = function(data){
  _task_store.list[data.index].complete = !data.complete;
}

var selectItem = function(index) {
  _task_store.selectedItemId = index;
}

var addComment = function(commentObject) {
  console.log(commentObject);
  _comments.push(convertRawComment(commentObject));
}

var todoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _task_store.list;
  },
  getSlectedItemId: function() {
    return _task_store.selectedItemId;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.COMPLETE_ITEM:
      completeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.SELECT_ITEM:
      selectItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.ADD_COMMENT:
      addComment(action.data.comment);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = todoStore;
