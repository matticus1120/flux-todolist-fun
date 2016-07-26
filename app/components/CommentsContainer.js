var React = require('react');

/*components*/
var CommentAdd = require('./CommentAdd');
var CommentList = require('./CommentList');

/*actions*/
var commentActions = require('../actions/commentActions');

/*stores*/
var taskStore = require('../stores/taskStore');
var CommentStore = require('../stores/commentStore');

var CommentsContainer = React.createClass({
	getInitialState: function(){
		return {
			comments: CommentStore.getCommenstForTask(this.props.taskId)
		}
	},
	componentDidMount: function(){
		commentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		commentStore.removeChangeListener(this._onChange);
	},
	handleAddTaskComment : function(newComment) {
		var data = {comment : newComment, taskId : this.props.taskId};
		commentActions.addTaskComment(data);
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
				<CommentAdd taskId={this.props.taskId} add={this.handleAddTaskComment} />
				<CommentList comments={this.state.comments}/>
			</div>
			
		);
	}

});

module.exports = CommentsContainer;