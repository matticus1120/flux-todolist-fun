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
  handleCompleteItem: function(index, complete, e){
    console.log(index);
    console.log(complete);
    console.log(e);
    todoActions.completeItem(index, complete);
  },
  handleSelectItem : function(index) {
    todoActions.selectItem(index);
  },
  _onChange: function(){
    this.setState({
      list: todoStore.getList(),
      selectedItemId : todoStore.getSlectedItemId()
    })
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="col-sm-12">
            <h3 className="text-center"> Todo List </h3>
            <AddItem add={this.handleAddItem}/>
            <List items={this.state.list} remove={this.handleRemoveItem} complete={this.handleCompleteItem} select={this.handleSelectItem}/>
          </div>
        </div>
        <div className="col-sm-4">
          <TodoDetails item={this.state.list[this.state.selectedItemId]}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;