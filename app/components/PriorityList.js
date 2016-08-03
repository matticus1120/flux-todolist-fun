var React = require('react');

/*actions*/
var taskActions = require('../actions/taskActions');

/*stores*/
var PriorityStore = require('../stores/PriorityStore');
var TaskStore = require('../stores/TaskStore');

var TaskPriorityList = React.createClass({

	getInitialState: function() {
		return {
			priorities : PriorityStore.getAllPriorities(),
			selectedPriorityIndex : -1
		}
	},
	selectPriority: function( index ) {
		taskActions.selectPriority(index);
	},
	componentDidMount: function(){
		PriorityStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		PriorityStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState({
			priorities : PriorityStore.getAllPriorities(),
		});
	},
	render : function() {
		var allPriorities = this.state.priorities.map(function(priority, index){
			var text;
			if( TaskStore.getPriorityTaskCount(index) ) {
				text = (
					<p>
						<a href="#" onClick={this.selectPriority.bind(null, index)}>{priority.priority} <em>({ TaskStore.getPriorityTaskCount(index) })</em> </a> 
					</p>
				);
			}
			else {
				text = (
					<p>{priority.priority}</p>
				);
			}
			return (
				<li className="list-group-item" key={index + 1} >{text}</li>
			);
		}.bind(this));
		return (
			<div clasName="priority-list-outer">
				<h4>Select Priority</h4>
				<ul className="list-group priority-list">
					<li className="list-group-item" key="0"><a href="#" onClick={this.selectPriority.bind(null, -1)}>All <em>({TaskStore.getAllTaskCount()})</em></a></li>
					{allPriorities}
				</ul>
			</div>
		);
	}
});

module.exports = TaskPriorityList;