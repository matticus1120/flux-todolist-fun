var React = require('react');

/*actions*/
var todoCommentActions = require('../actions/todoCommentActions');

/*components*/
var TodoComments = require('./TodoComments');

var TodoDetails = React.createClass({
	render : function() {
		var details = false;
		if( this.props.item ) {
			details = 
			<div>
				<div className="todo-details">
						<h3>{this.props.item.task}</h3>
						<p><small>{this.props.item.time}</small></p>
						<p><small>By: <em>{this.props.item.author}</em></small></p>
						<p>This is a bit of a description!</p>
					</div>
					<TodoComments itemIndex={this.props.item.itemIndex}/>
				</div>;
		}

		return (
			<div className="todo-details-outer">
				{details}
			</div>
		)
	}	
});

module.exports = TodoDetails;