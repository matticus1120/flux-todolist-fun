var React = require('react');

var TaskPriorityList = React.createClass({
	render : function() {
		var allPriorities = this.props.priorities.map(function(priority, index){
			return (
				<li className="list-group-item" key={index + 1} >
					<a href="#" onClick={this.props.selectPriority.bind(null, priority)}>{priority}</a>
				</li>
			);
		}.bind(this));
		return (
			<div clasName="priority-list-outer">
				<h4>Select Priority</h4>
				<ul className="list-group priority-list">
					<li className="list-group-item" key="0"><a href="#" onClick={this.props.selectPriority.bind(null, false)}>All</a></li>					
					{allPriorities}
				</ul>
			</div>
		);
	}
});

module.exports = TaskPriorityList;