var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var appConstants = require('../constants/appConstants');
var appUtilities = require('../utils/appUtilities');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

/*stores*/
var PriorityStore = require('../stores/PriorityStore');

var CHANGE_EVENT = 'change';

var _task_store = {
	list: [],
	filteredList: [],
	selectedTaskId : null,
};

var addTask = function(task){
	_task_store.list.push(appUtilities.convertRawTask(task));
}

var removeTask = function(_taskId){
	var elementPos = _task_store.list.map(function(task) {return task.id; }).indexOf(_taskId);
	_task_store.list.splice(elementPos, 1);
}

var completeTask = function(data){
	_task_store.list[data.index].complete = !data.complete;
}

var setTaskPriorityFilter = function() {

	var filteredList = [];
	
	_priority = PriorityStore.getSelectedPriority();

	for( var i in _task_store.list ) {
		if( _priority ==  _task_store.list[i].priority ) {
			filteredList.push( _task_store.list[i] );
		}
	}
	
	_task_store.filteredList = filteredList;

}

var selectTask = function( id ) {
	_task_store.selectedTaskId = id;
}

var getAllTasks = function() {
	
	_task_store.list.sort(function(a, b) {
		if (b.timestamp < a.timestamp) {
			return -1;
		} 
		else if (b.timestamp > a.timestamp) {
			return 1;
		}
		return 0;
	});

	return _task_store.list;

}

var getAllFilteredTasks = function() {
	if( PriorityStore.getSelectedPriority()  == -1 ) {
		return getAllTasks();
	}
	else {
		return _task_store.filteredList;
	}
}

var taskStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.removeListener(CHANGE_EVENT, cb);
	},
	getFilteredTaskList: function(){
		return getAllFilteredTasks();
	},
	getSlectedItemId: function() {
		return _task_store.selectedTaskId;
	},
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case appConstants.ADD_ITEM:
			addTask(action.data);
			taskStore.emit(CHANGE_EVENT);
			break;
		case appConstants.REMOVE_ITEM:
			removeTask(action.data);
			taskStore.emit(CHANGE_EVENT);
			break;
		case appConstants.COMPLETE_ITEM:
			completeTask(action.data);
			taskStore.emit(CHANGE_EVENT);
			break;
		case appConstants.SELECT_ITEM:
			selectTask(action.data);
			taskStore.emit(CHANGE_EVENT);
			break;
		case appConstants.SELECT_PRIORITY:
			setTaskPriorityFilter();
			taskStore.emit(CHANGE_EVENT);
			break;
		default:
		return true;
	}
});

module.exports = taskStore;
