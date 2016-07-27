var React = require('react');

/*components*/
var CommentAdd = require('./CommentAdd');
var CommentList = require('./CommentList');

/*actions*/
var commentActions = require('../actions/commentActions');

/*stores*/
var TaskStore = require('../stores/TaskStore');
var CommentStore = require('../stores/commentStore');

var CommentsContainer = React.createClass({
	getInitialState: function(){
		return {
			comments: CommentStore.getCommenstForTask(this.props.taskId)
		}
	},
	componentDidMount: function(){
		CommentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		CommentStore.removeChangeListener(this._onChange);
	},
	handleAddTaskComment : function(newComment) {
		var data = {comment : newComment, taskId : this.props.taskId};
		commentActions.addTaskComment(data);
	},
	_onChange: function(){
		comments = CommentStore.getCommenstForTask(this.props.taskId);
		console.log('yo yo yo');
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