var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var TodoDetails = require('./TodoDetails');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: todoStore.getList()
    }
  },
  componentDidMount: function(){
    todoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    todoActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  handleCompleteItem: function(index, complete){
    todoActions.completeItem(index, complete);
  },
  _onChange: function(){
    this.setState({
      list: todoStore.getList()
    })
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="col-sm-12">
            <h3 className="text-center"> Todo List </h3>
            <AddItem add={this.handleAddItem}/>
            <List items={this.state.list} remove={this.handleRemoveItem} complete={this.handleCompleteItem} />
          </div>
        </div>
        <div className="col-sm-4">
          <TodoDetails />
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;