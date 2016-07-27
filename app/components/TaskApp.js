var React = require('react');

/*components*/
var TaskPriorityList = require('./TaskPriorityList');
var TaskAdd = require('./TaskAdd');
var TaskList = require('./TaskList');
var TaskDetails = require('./TaskDetails');

/*stores*/
var taskStore = require('../stores/taskStore');

/*actions*/
var taskActions = require('../actions/taskActions');

var TaskApp = React.createClass({
	getInitialState: function(){
		return {
			list: taskStore.getFilteredTaskList(),
			selectedTaskId: null,
			priorities: taskStore.getAllPriorities()
		}
	},
	componentDidMount: function(){
		taskStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		taskStore.removeChangeListener(this._onChange);
	},
	handleAddTask: function(newItem){
		taskActions.addTask(newItem);
	},
	handleRemoveTask: function(index){
		taskActions.removeTask(index);
	},
	handleCompleteTask: function(index, complete, e){
		if (!e) var e = window.event;
			e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
			taskActions.completeTask(index, complete);
	},
	handleSelectTask : function( id ) {
		taskActions.selectTask( id );
	},
	_onChange: function(){
		this.setState({
			list: taskStore.getFilteredTaskList(),
			selectedTaskId : taskStore.getSlectedItemId()
		});
	},
	getItemObject: function() {
		if(!this.state.selectedTaskId) return false;
		var selectedTaskId = this.state.selectedTaskId;
		var object = this.state.list.filter( function(task) { return task.id == selectedTaskId } );
		return object[0];
	},
	handleSelectPriority : function(priority,e) {
		e.preventDefault();
		taskActions.selectPriority(priority);
	},
	render: function(){
		return (
			<div className="row">
				<div className="col-sm-2">
					<TaskPriorityList priorities={this.state.priorities} selectPriority={this.handleSelectPriority} />
				</div>
				<div className="col-sm-6 task-app-outer">
					<h3>Task List</h3>
					<TaskAdd add={this.handleAddTask} priorities={this.state.priorities}/>
					<TaskList tasks={this.state.list} remove={this.handleRemoveTask} complete={this.handleCompleteTask} select={this.handleSelectTask} activeTask={this.state.selectedTaskId}/>
				</div>
				<div className="col-sm-4 task-details-outer">
					<TaskDetails item={this.getItemObject()} taskId={this.state.selectedTaskId}/>
				</div>
			</div>
			)
	}
});

module.exports = TaskApp;