var React = require('react');

var CommentAdd = React.createClass({

	getInitialState : function() {
		return { comment : '', taskId : null };
	},
	handleCommentChange : function(e) {
		this.setState({comment : e.target.value});
	},
	componentWillReceiveProps : function(nextProps) {
		if( nextProps.taskId !== this.state.taskId ) {
			this.setState({ taskId: nextProps.taskId, comment : null });	
		}
	},
	handleSubmit : function(e) {
		e.preventDefault();
		var comment = this.state.comment;
		this.props.add(comment);
		this.setState({ comment : '' });
	},
	render : function() {
		return (

			<div className="todo-add-comment">
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="item-comment" 
						className="item-comment form-control" 
						onChange={this.handleCommentChange} 
						value={this.state.comment}
						placeholder="Add Comment"
					/>
				</form>
			</div>
			
		);
	}

});

module.exports = CommentAdd;