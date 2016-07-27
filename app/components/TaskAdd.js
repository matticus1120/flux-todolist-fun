var React = require('react');

var TaskAdd = React.createClass({

	getInitialState: function() {
		return { task : null, priority : null };
	},
	handleSubmit: function(e){
		e.preventDefault();
		var newItemObj = {};

		newItemObj.task = this.state.task;
		newItemObj.priority = this.state.priority;
		newItemObj.complete = false;
		var newItem = newItemObj;

		this.setState({ task : null, priority : null });
		this.props.add(newItem);

	},
	handleItemChange : function(e) {
		this.setState({task : e.target.value});
	},
	handlePriorityChange: function(e) {
		this.setState({ priority : e.target.value });
	},
	render: function(){
		var allPriorities = this.props.priorities.map(function(priority, index){
			return (
				<option value={priority} key={index + 1}>{priority}</option>
			);
		});
		return (
			<div>
				<form className="new-task-form" onSubmit={this.handleSubmit}>
					<input type="text" ref="newItem" className="form-control" placeholder="New Item"   onChange={this.handleItemChange} value={this.state.task}/>
					<select ref="itemPriority" name="priority" className="form-control" onChange={this.handlePriorityChange}>
						{allPriorities}
					</select> 
					<input type="submit" name="submit" value="Enter New Task" className="btn btn-block btn-success" />
				</form>
			</div>
			)
	}
});

module.exports = TaskAdd;



