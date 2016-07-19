var React = require('react');

/*components*/
var TodoAddComment = require('./TodoAddComment');

var TodoComments = React.createClass({

	handleAddTodoComment : function() {
		// todoCommentActions.addTodoComment(comment);
		console.log(this.props.itemIndex);
		console.log('hello');
	},
	render : function() {
		return (

			<div className="todo-comments">
				<h4>Hello this is a comment section, for all comments</h4>
				<TodoAddComment add={this.handleAddTodoComment}/>
			</div>
			
		);
	}

});

module.exports = TodoComments;