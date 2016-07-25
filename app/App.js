var React = require('react');
var TaskApp = require('./components/TaskApp');


var App = React.createClass({
  render: function(){
    return (
      <div className="container">
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