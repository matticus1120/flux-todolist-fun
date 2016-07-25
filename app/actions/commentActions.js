var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var commentActions = {
  addTaskComment: function(comment){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_COMMENT,
      data: comment
    });
  },
};

module.exports = commentActions;
