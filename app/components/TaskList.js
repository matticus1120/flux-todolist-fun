var React = require('react');
var classNames = require('classnames');

var PriorityStore = require('../stores/PriorityStore');

var TaskList = React.createClass({
	render: function(){
		
		var taskListItem = this.props.tasks.map(function(task, index){
			var complete = task.complete ? 'Completed' : 'Complete';
			var activeClass = classNames({
				'table-item' : true,
				'is-complete' : task.complete,
				'not-complete' : !task.complete,
				'active': task.id == this.props.activeTask
			});
			var priorityObj = PriorityStore.getPriorityObject(task.priority);
			return (
				<tr key={index} className={activeClass} onClick={this.props.select.bind(null, task.id)}>
					<td>
						<span onClick={this.props.remove.bind(null, task.id)} >
							<i className="glyphicon glyphicon-remove"></i>
						</span>
					</td>
					<td>
						<span>{task.task}</span>
						</td>
					<td>
						<span><em>{priorityObj.priority}</em></span>
					</td>
					<td>
						{task.time}
					</td>
					<td>
						<span className="complete-button" onClick={this.props.complete.bind(null, task.id)}>{ complete }</span>
					</td>
				</tr>
				)
		}.bind(this));
		return (

			<div className="task-list-outer">
				<header className="task-list-header">
					<p>Displaying {this.props.tasks.length} { this.props.tasks.length == 1  ? 'task' : 'tasks' }.</p>
				</header>
				<table  className="table table-striped">
					<thead>
					<tr>
						<th></th>
						<th>Task</th>
						<th>Priority</th>
						<th>Time</th>
						<th>Complete</th>
					</tr>
					</thead>
					<tbody>
						{taskListItem}
					</tbody>
				</table>

			</div>

			)
	}
});

module.exports = TaskList;






