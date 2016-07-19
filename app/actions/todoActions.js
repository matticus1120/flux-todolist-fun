var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoActions = {
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  },
  completeItem: function(index, complete) {
    data = {index : index, complete : complete};
    AppDispatcher.handleAction({
      actionType: appConstants.COMPLETE_ITEM,
      data: data
    });
  },
  selectItem: function(index) {
    AppDispatcher.handleAction({
      actionType: appConstants.SELECT_ITEM,
      data: index
    });
  }
};

module.exports = todoActions;
