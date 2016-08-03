var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var appConstants = require('../constants/appConstants');
var appUtilities = require('../utils/appUtilities');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
console.log('priority');
/*stores*/
// var TaskStore = require('./TaskStore');


var _priority_store = {
	priorities : [
		{ order : 0, priority : 'Who cares?', taskCount : 0 },
		{ order : 1, priority : 'Pretty Low', taskCount : 0 },
		{ order : 2, priority : 'Medium-Low', taskCount : 0 },
		{ order : 3, priority : 'Medium', taskCount : 0 },
		{ order : 4, priority : 'High Priority Shit', taskCount : 0 },
		{ order : 5, priority : 'Oh God!!', taskCount : 0 }
	],
	selectedPriority : -1
};

var getPriorities = function() {
	return _priority_store.priorities;
}

var setSelectedPriorityIndex = function(index) {
	_priority_store.selectedPriority = index;
}

var getPrioritiesWithTaskCount = function() {
	for( i = 0; i < _priority_store.priorities.length; i++ ) {
		// _priority_store.priorities[i].taskCount = TaskStore.getPriorityTaskCount(index);
	}
	console.log(_priority_store.priorities[i]);
}

var PriorityStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.removeListener(CHANGE_EVENT, cb);
	},
	getAllPriorities: function() {
		getPrioritiesWithTaskCount();
		return _priority_store.priorities;
	},
	getSelectedPriority: function() {
		return _priority_store.selectedPriority;
	},
	getPriorityObject: function(index) {
		return _priority_store.priorities[index];
	}
});


AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType){
		case appConstants.SELECT_PRIORITY:
			setSelectedPriorityIndex(action.data);
			PriorityStore.emit(CHANGE_EVENT);
			break;
		default:
		return true;
	}
});

module.exports = PriorityStore;