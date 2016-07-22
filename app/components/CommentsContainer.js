var React = require('react');

/*components*/
var CommentAdd = require('./CommentAdd');
var CommentList = require('./CommentList');

/*actions*/
var commentActions = require('../actions/commentActions');

/*stores*/
var taskStore = require('../stores/taskStore');

var CommentsContainer = React.createClass({
	getInitialState: function(){
		return {
			comments: taskStore.getTodoCommentsForComment()
		}
	},
	componentDidMount: function(){
		taskStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		taskStore.removeChangeListener(this._onChange);
	},
	handleAddTodoComment : function(newComment) {
		commentActions.addTodoComment(newComment);
	},
	_onChange: function(){
		this.setState({
			comments: taskStore.getTodoCommentsForComment()
		})
	},
	render : function() {
		return (

			<div className="todo-comments">
				<hr />
				<h4>Comments</h4>
				<hr />
				<CommentAdd itemIndex={this.props.itemIndex} add={this.handleAddTodoComment} />
				<CommentList comments={this.state.comments}/>
			</div>
			
		);
	}

});

module.exports = CommentsContainer;