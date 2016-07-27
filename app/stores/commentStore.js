var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appUtilities = require('../utils/appUtilities');
var TaskStore = require('./TaskStore');

var CHANGE_EVENT = 'change';



var _comments = [];

var addComment = function(commentObject) {
	_comments.push(appUtilities.convertRawComment(commentObject));
}

var getCommentsForTask = function(_taskId) {
	
	var taskComments = [];

	if( _comments.length < 1 ) return taskComments;

	for(var i in _comments) {
		if( _comments[i].taskId == _taskId ) {
			taskComments.push(_comments[i]);
		}
	}

	taskComments.sort(function(a, b) {
		if (b.timestamp < a.timestamp) {
			return -1;
		} 
		else if (b.timestamp > a.timestamp) {
			return 1;
		}
		return 0;
	});

	return taskComments;
}

var getCommentsForSelectedTask = function() {
	return getCommentsForTask(TaskStore.getSlectedItemId());
}

var commentStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.removeListener(CHANGE_EVENT, cb);
	},
	getCommenstForTask: function() {
		return getCommentsForSelectedTask();
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case appConstants.ADD_COMMENT:
			addComment(action.data);
			commentStore.emit(CHANGE_EVENT);
			break;
		case appConstants.SELECT_ITEM:
			commentStore.emit(CHANGE_EVENT);
			break;
		default:
		return true;
	}
});

module.exports = commentStore;
