var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var appConstants = require('../constants/appConstants');
var appUtilities = require('../utils/appUtilities');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _priority_store = {
	// priorities : [ 'Who cares?', 'Pretty Low', 'Medium-Low', 'Medium', 'High Priority Shit', 'Oh God!!' ],
	priorities : [
		{ order : 0, priority : 'Who cares?' },
		{ order : 1, priority : 'Pretty Low' },
		{ order : 2, priority : 'Medium-Low' },
		{ order : 3, priority : 'Medium' },
		{ order : 4, priority : 'High Priority Shit' },
		{ order : 5, priority : 'Oh God!!' }
	],
	selectedPriority : -1
};

var getPriorities = function() {
	return _priority_store.priorities;
}

var setSelectedPriorityIndex = function(index) {
	_priority_store.selectedPriority = index;
}

var PriorityStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.removeListener(CHANGE_EVENT, cb);
	},
	getAllPriorities: function() {
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