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
	var theTime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
	return theTime;
}

var convertRawTask = function(item) {
	var timestamp = Date.now();
	item.time = getCurrentTime();
	item.author = 'Matty Mick-C';
	item.itemIndex = _task_store.list.length;
	item.id = 'task_' + timestamp;
	return item;
}

var convertRawComment = function(comment) {
	
	var newComment = {};
	var timestamp = Date.now();

	newComment.time = getCurrentTime();
	newComment.timestamp = timestamp;
	newComment.comment = comment;
	newComment.author = 'Matty Mick-C';
	newComment.taskId = _task_store.selectedItemId;
	newComment.id = 'comment_' + timestamp;

	return newComment;

}


var addItem = function(item){
	_task_store.list.push(convertRawTask(item));
};

var removeItem = function(_id){
	// _task_store.list.splice(index, 1);
	console.log(_id);
	_task_store.list = _task_store.list.filter( function(task) { return task.id != _id } );
}

var completeItem = function(data){
	_task_store.list[data.index].complete = !data.complete;
}

var selectItem = function( id ) {
	_task_store.selectedItemId = id;
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

	todoComments.sort(function(a, b) {
		if (b.timestamp < a.timestamp) {
			return -1;
		} 
		else if (b.timestamp > a.timestamp) {
			return 1;
		}
		return 0;
	});

	return todoComments;

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
