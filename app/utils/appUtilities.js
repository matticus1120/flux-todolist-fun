module.exports = {

	getCurrentTime: function() {
		var d = new Date();
		var theTime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ', ' + d.getHours() + ':' + d.getMinutes();
		return theTime;
	},

	convertRawComment: function(commentObj) {
		
		var newComment = {};
		var timestamp = Date.now();

		newComment.time = this.getCurrentTime();
		newComment.timestamp = timestamp;
		newComment.comment = commentObj.comment;
		newComment.taskId = commentObj.taskId;
		newComment.author = 'Matty Mick-C';
		newComment.id = 'comment_' + timestamp;

		return newComment;

	},

	convertRawTask: function(item) {
		var timestamp = Date.now();
		item.time = this.getCurrentTime();
		item.author = 'Matty Mick-C';
		item.timestamp = timestamp;
		item.id = 'task_' + timestamp;
		return item;
	}

};
