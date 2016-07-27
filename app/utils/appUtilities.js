var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

module.exports = {

	getCurrentTime: function() {
		
		var d = new Date();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var theTime = month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' ' + hours + ':' + d.getMinutes() + ' ' + ampm;

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
