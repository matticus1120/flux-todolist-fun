var React = require('react');

var CommentAdd = React.createClass({

	getInitialState : function() {
		return { itemIndex : false, comment : '' };
	},
	handleCommentChange : function(e) {
		this.setState({comment : e.target.value});
	},
	handleSubmit : function(e) {
		e.preventDefault();
		
		var newItem = {};
		
		newItem.itemIndex = this.props.itemIndex;
		newItem.comment = this.state.comment;
		this.props.add(newItem);

		this.setState({ itemIndex : false, comment : '' });
		
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