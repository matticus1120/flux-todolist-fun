var React = require('react');

/*components*/
var AddItem = require('./AddItem');
var List = require('./List');
var TodoDetails = require('./TodoDetails');

/*stores*/
var todoStore = require('../stores/todoStore');

/*actions*/
var todoActions = require('../actions/todoActions');

var ListContainer = React.createClass({
	getInitialState: function(){
		return {
			list: todoStore.getList(),
			selectedItemId: null
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
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		todoActions.completeItem(index, complete);
	},
	handleSelectItem : function( id ) {
		todoActions.selectItem( id );
	},
	_onChange: function(){
		var thing = todoStore.getSlectedItemId();
		this.setState({
			list: todoStore.getList(),
			selectedItemId : todoStore.getSlectedItemId()
		});
	},
	getItemObject: function() {
		var selectedItemId = this.state.selectedItemId;
		var object = this.state.list.filter( function(task) { return task.id == selectedItemId } );
		return object[0];
	},
	render: function(){
		return (
			<div className="row">
				<div className="col-sm-7">
						<h3 className="text-center"> Todo List </h3>
						<AddItem add={this.handleAddItem}/>
						<List items={this.state.list} remove={this.handleRemoveItem} complete={this.handleCompleteItem} select={this.handleSelectItem} activeTask={this.state.selectedItemId}/>
				</div>
				<div className="col-sm-5">
					<TodoDetails item={this.getItemObject()} itemIndex={this.state.selectedItemId}/>
				</div>
			</div>
			)
	}
});

module.exports = ListContainer;