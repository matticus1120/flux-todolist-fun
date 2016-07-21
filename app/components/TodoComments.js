var React = require('react');

/*components*/
var TodoAddComment = require('./TodoAddComment');
var TodoCommentList = require('./TodoCommentList');

/*actions*/
var todoCommentActions = require('../actions/todoCommentActions');

/*stores*/
var todoStore = require('../stores/todoStore');

var TodoComments = React.createClass({
	getInitialState: function(){
		return {
			comments: todoStore.getTodoCommentsForComment()
		}
	},
	componentDidMount: function(){
		todoStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		todoStore.removeChangeListener(this._onChange);
	},
	handleAddTodoComment : function(newComment) {
		todoCommentActions.addTodoComment(newComment);
	},
	_onChange: function(){
		this.setState({
			comments: todoStore.getTodoCommentsForComment()
		})
	},
	render : function() {
		return (

			<div className="todo-comments">
				<hr />
				<h4>Comments</h4>
				<hr />
				<TodoAddComment itemIndex={this.props.itemIndex} add={this.handleAddTodoComment} />
				<TodoCommentList comments={this.state.comments}/>
			</div>
			
		);
	}

});

module.exports = TodoComments;