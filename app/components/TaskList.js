var React = require('react');
var classNames = require('classnames');

var TaskList = React.createClass({
	render: function(){
		var styles = {
			uList: {
				paddingLeft: 0,
				listStyleType: "none"
			},
			listGroup: {
				margin: '5px 0',
				borderRadius: 5
			},
			removeItem: {
				fontSize: 20,
				float: "left",
				position: "relative",
				top: 0,
				left: 6,
				cursor: "pointer",
				color: "rgb(222, 79, 79)"
			},
			todoItem: {
				paddingLeft: 20,
				fontSize: 17
			}
		};
		var taskListItem = this.props.tasks.map(function(task, index){
			var complete = task.complete ? 'Completed' : 'Complete';
			var activeClass = classNames({
				'table-item' : true,
				'is-complete' : task.complete,
				'not-complete' : !task.complete,
				'active': task.id == this.props.activeTask
			});
			return (
				<tr key={index} className={activeClass} onClick={this.props.select.bind(null, task.id)}>
					<td>
						<span
							className="glyphicon glyphicon-remove"
							style={styles.removeItem}
							onClick={this.props.remove.bind(null, task.id)} >
						</span>
					</td>
					<td>
						<span>{task.task}</span>
						</td>
					<td>
						<span><em>{task.priority}</em></span>
					</td>
					<td>
						{task.time}
					</td>
					<td>
						<span className="complete-button" onClick={this.props.complete.bind(null, index, task.complete)}>{ complete }</span>
					</td>
				</tr>
				)
		}.bind(this));
		return (

			<div className="task-list-outer">
				<header className="task-list-header">
					<p>{this.props.tasks.length} tasks total</p>
				</header>
				<table style={styles.uList} className="table table-striped">
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






