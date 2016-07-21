var React = require('react');

var TodoCommentList = React.createClass({
	render : function() {
		var allComments = this.props.comments.map(function(comment, index){
			return (
				<li className="list-group-item" key={comment.id}>
					<p>{comment.comment}</p>
					<p><small>{ comment.time}</small></p>
				</li>
			);
		});
		return (
			<div>
				<ul className="list-group">
					{allComments}
				</ul>
			</div>
		);
	}
});

module.exports = TodoCommentList;