var React = require('react');

/*components*/
var TaskAdd = require('./TaskAdd');
var TaskList = require('./TaskList');
var TaskDetails = require('./TaskDetails');

/*stores*/
var taskStore = require('../stores/taskStore');

/*actions*/
var taskActions = require('../actions/taskActions');

var TasksContainer = React.createClass({
	getInitialState: function(){
		return {
			list: taskStore.getTaskList(),
			selectedTaskId: null
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
			list: taskStore.getTaskList(),
			selectedTaskId : taskStore.getSlectedItemId()
		});
	},
	getItemObject: function() {
		var selectedTaskId = this.state.selectedTaskId;
		var object = this.state.list.filter( function(task) { return task.id == selectedTaskId } );
		return object[0];
	},
	render: function(){
		return (
			<div className="row">
				<div className="col-sm-6">
						<h3 className="text-center"> Todo List </h3>
						<TaskAdd add={this.handleAddTask}/>
						<TaskList tasks={this.state.list} remove={this.handleRemoveTask} complete={this.handleCompleteTask} select={this.handleSelectTask} activeTask={this.state.selectedTaskId}/>
				</div>
				<div className="col-sm-6">
					<TaskDetails item={this.getItemObject()} taskId={this.state.selectedTaskId}/>
				</div>
			</div>
			)
	}
});

module.exports = TasksContainer;