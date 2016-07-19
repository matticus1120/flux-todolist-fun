var React = require('react');

var TodoAddComment = React.createClass({

	render : function() {
		return (

			<div className="todo-add-comment">
				<h5>Hello this is a comment add section</h5>
				<button className="btn-todo-add-comment btn btn-primary" onClick={this.addTodoComment}>Add Comment</button>
			</div>
			
		);
	}

});

module.exports = TodoAddComment;