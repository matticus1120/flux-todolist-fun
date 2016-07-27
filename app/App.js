var React = require('react');
var TaskApp = require('./components/TaskApp');
require('./styles/main.scss');

var App = React.createClass({
	render: function(){
		return (
			
			<div className="container-fluid">
				<div className="row">
					<TaskApp />
				</div>
			</div>
		)
	}
});

React.render(
	<App />,
	document.getElementById('app')
)