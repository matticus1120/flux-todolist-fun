var React = require('react');

/*components*/
var TodoAddComment = require('./TodoAddComment');

/*actions*/
var todoCommentActions = require('../actions/todoCommentActions');

var TodoComments = React.createClass({

	handleAddTodoComment : function(newComment) {
		todoCommentActions.addTodoComment(newComment);
	},
	render : function() {
		return (

			<div className="todo-comments">
				<h4>Hello this is a comment section, for all comments</h4>
				<TodoAddComment itemIndex={this.props.itemIndex} add={this.handleAddTodoComment}/>
			</div>
			
		);
	}

});

module.exports = TodoComments;