var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var todoCommentActions = {
  addTodoComment: function(comment){
    console.log('comment');
    /*AppDispatcher.handleAction({
      actionType: appConstants.ADD_COMMENT,
      data: item
    });*/
  },
};

module.exports = todoCommentActions;
