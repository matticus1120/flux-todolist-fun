var React = require('react');

var AddItem = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var newItemObj = {};
    
    newItemObj.task = this.refs.newItem.getDOMNode().value; //  set newItem task
    newItemObj.priority = this.refs.itemPriority.getDOMNode().value;  // set newItem priority
    newItemObj.complete = false;
    var newItem = newItemObj;

    this.refs.newItem.getDOMNode().value = '';
    this.props.add(newItem);

  },
  render: function(){
    return (
      <div>
        <form className="new-task-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="newItem" className="form-control" placeholder="New Item"   />
          <select ref="itemPriority" name="priority" className="form-control">
            <option value="">Select Priority</option>
            <option value="Who cares?">Who cares?</option>
            <option value="Pretty Low">Pretty Low</option>
            <option value="Med. - Low">Med. - Low</option>
            <option value="Medes">Medes</option>
            <option value="High shit">High Shit</option>
            <option value="Oh god!!">Oh God!!</option>
          </select> 
          <input type="submit" name="submit" value="Enter New Task" className="btn btn-block btn-success" />
        </form>
      </div>
    )
  }
});

module.exports = AddItem;