var React = require('react');

/*stores*/
var PriorityStore = require('../stores/PriorityStore');

var TaskPriorityList = React.createClass({

	getInitialState: function() {
		return {
			priorities : PriorityStore.getAllPriorities(),
			selectedPriorityIndex : null
		}
	},
	selectPriority: function( index ) {
		setState({ selectedPriorityIndex : index  });
	},
	render : function() {
		var allPriorities = this.state.priorities.map(function(priority, index){
			return (
				<li className="list-group-item" key={index + 1} >
					<a href="#" onClick={this.selectPriority.bind(null, index)}>{priority.priority}</a>
				</li>
			);
		}.bind(this));
		return (
			<div clasName="priority-list-outer">
				<h4>Select Priority</h4>
				<ul className="list-group priority-list">
					<li className="list-group-item" key="0"><a href="#" onClick={this.selectPriority.bind(null, false)}>All</a></li>					
					{allPriorities}
				</ul>
			</div>
		);
	}
});

module.exports = TaskPriorityList;