var React = require('react');

var TodoAddComment = React.createClass({

	getInitialState : function() {
		return { itemIndex : false, comment : null };
	},
	handleCommentChange : function(e) {
		this.setState({comment : e.target.value});
		console.log(this.state);
	},
	handleSubmit : function(e) {
		e.preventDefault();
		var itemIndex = this.props.itemIndex;
		this.setState({comment : ''});
	},
	render : function() {
		return (

			<div className="todo-add-comment">
				<form onSubmit={this.handleSubmit}>
					<h5>Hello this is a comment add section</h5>
					<input type="text" name="item-comment" className="item-comment" onChange={this.handleCommentChange} value={this.state.comment}/>
					<button className="btn-todo-add-comment btn btn-primary">Add Comment</button>
				</form>
			</div>
			
		);
	}

});

module.exports = TodoAddComment;