var React = require('react');

var TodoDetails = React.createClass({
	render : function() {
		return (
			<div className="todo-details">
				<h3>This is a pretty sweet to do!</h3>
				<p><small>June 27, 1986</small></p>
				<p>This is a bit of a description!</p>
			</div>
		)
	}	
});

module.exports = TodoDetails;