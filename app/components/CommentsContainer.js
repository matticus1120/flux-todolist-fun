var React = require('react');

/*components*/
var CommentAdd = require('./CommentAdd');
var CommentList = require('./CommentList');

/*actions*/
var commentActions = require('../actions/commentActions');

/*stores*/
var taskStore = require('../stores/taskStore');
var commentStore = require('../stores/commentStore');

var CommentsContainer = React.createClass({
	getInitialState: function(){
		return {
			comments: commentStore.getCommenstForTask(this.props.taskId)
		}
	},
	componentDidMount: function(){
		commentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		commentStore.removeChangeListener(this._onChange);
	},
	handleAddTodoComment : function(newComment) {
		var data = {comment : newComment, taskId : this.props.taskId};
		commentActions.addTodoComment(data);
	},
	_onChange: function(){
		comments = commentStore.getCommenstForTask(this.props.taskId);
		this.setState({
			comments: comments
		});
	},
	render : function() {
		return (

			<div className="todo-comments">
				<hr />
				<h4>Comments</h4>
				<CommentAdd taskId={this.props.taskId} add={this.handleAddTodoComment} />
				<CommentList comments={this.state.comments}/>
			</div>
			
		);
	}

});

module.exports = CommentsContainer;