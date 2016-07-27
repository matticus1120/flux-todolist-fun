var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var taskActions = {
	addTask: function(item){
		AppDispatcher.handleAction({
			actionType: appConstants.ADD_ITEM,
			data: item
		});
	},
	removeTask: function(index){
		AppDispatcher.handleAction({
			actionType: appConstants.REMOVE_ITEM,
			data: index
		})
	},
	completeTask: function(taskId) {
		AppDispatcher.handleAction({
			actionType: appConstants.COMPLETE_ITEM,
			data: taskId
		});
	},
	selectTask: function(id) {
		AppDispatcher.handleAction({
			actionType: appConstants.SELECT_ITEM,
			data: id
		});
	},
	selectPriority: function(priority) {
		AppDispatcher.handleAction({
			actionType: appConstants.SELECT_PRIORITY,
			data: priority
		});
	}
};

module.exports = taskActions;
