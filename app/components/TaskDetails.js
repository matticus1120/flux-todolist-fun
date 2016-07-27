var React = require('react');

/*actions*/
var commentActions = require('../actions/commentActions');

/*components*/
var CommentsContainer = require('./CommentsContainer');

var TaskDetails = React.createClass({
	render : function() {
		var details = false;
		var hi = 'no';
		if( this.props.item ) {
			details = (
				<div>
					<div className="todo-details">
						<h3>{this.props.item.task}</h3>
						<p><small>{this.props.item.time}</small></p>
						<p><small>By: <em>{this.props.item.author}</em></small></p>
						<p>This is a bit of a description!</p>
					</div>
					<CommentsContainer taskId={this.props.taskId}/>
				</div>
			)
		}

		return (
			<div className="todo-details-outer">
				{details}
			</div>
		)
	}	
});

module.exports = TaskDetails;








