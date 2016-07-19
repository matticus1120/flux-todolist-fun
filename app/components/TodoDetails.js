var React = require('react');

/*components*/
var TodoAddComment = require('./TodoAddComment');

/*actions*/
var todoCommentActions = require('../actions/todoCommentActions');

var TodoDetails = React.createClass({
	handleAddComment: function(comment) {
		todoCommentActions.addTodoComment(comment);
	},
	render : function() {
		var details = false;
		if( this.props.item ) {
			details = <div className="todo-details">
						<h3>{this.props.item.task}</h3>
						<p><small>{this.props.item.time}</small></p>
						<p><small>By: <em>{this.props.item.author}</em></small></p>
						<p>This is a bit of a description!</p>
					</div>;
		}

		return (
			<div className="todo-details-outer">
				{details}
				<TodoAddComment add={this.handleAddComment} />
			</div>
		)
	}	
});

module.exports = TodoDetails;