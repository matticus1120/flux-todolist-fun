var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var commentActions = {
  addTodoComment: function(comment){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_COMMENT,
      data: comment
    });
  },
};

module.exports = commentActions;
