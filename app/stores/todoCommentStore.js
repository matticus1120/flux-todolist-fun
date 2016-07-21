var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';


var _comments = [];

var getCurrentTime = function() {
	var d = new Date();
	var theTime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ', ' + d.getHours() + ':' + d.getMinutes();
	return theTime;
}

var convertRawComment = function(comment) {
	var newComment = {};
	var timestamp = Date.now();
	newComment.time = getCurrentTime();
	newComment.comment = comment;
	newComment.author = 'Matty Mick-C';
	newComment.taskId = _task_store.selectedItemId;
	newComment.id = 'comment_' + timestamp;
	return newComment;
}

var addComment = function(commentObject) {
	_comments.push(convertRawComment(commentObject));
}

var getTodoComments = function() {
	
	var todoComments = [];
	if( _comments.length < 1 ) return todoComments;
	for(var i in _comments) {
		if( _comments[i].taskId == _task_store.selectedItemId ) {
			todoComments.push(_comments[i]);
			
		}
	}

	return todoComments;

}

var todoCommentStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.removeListener(CHANGE_EVENT, cb);
	},
	getTodoCommentsForComment: function() {
		return getTodoComments();
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
