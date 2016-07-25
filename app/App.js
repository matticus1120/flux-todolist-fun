var React = require('react');
var TasksContainer = require('./components/TasksContainer');


var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <TasksContainer />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)