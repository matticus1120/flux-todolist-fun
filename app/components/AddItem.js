var React = require('react');

var AddItem = React.createClass({

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
		return (
			<div>
				<form className="new-task-form" onSubmit={this.handleSubmit}>
					<input type="text" ref="newItem" className="form-control" placeholder="New Item"   onChange={this.handleItemChange} value={this.state.task}/>
					<select ref="itemPriority" name="priority" className="form-control" onChange={this.handlePriorityChange}>
						<option value="">Select Priority</option>
						<option value="Who cares?">Who cares?</option>
						<option value="Pretty Low">Pretty Low</option>
						<option value="Med. - Low">Med. - Low</option>
						<option value="Medes">Medes</option>
						<option value="High shit">High Shit</option>
						<option value="Oh god!!">Oh God!!</option>
					</select> 
					<input type="submit" name="submit" value="Enter New Task" className="btn btn-block btn-success" />
				</form>
			</div>
			)
	}
});

module.exports = AddItem;