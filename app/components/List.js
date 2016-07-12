var React = require('react');
var classNames = require('classnames');

var List = React.createClass({
  render: function(){
    var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      listGroup: {
        margin: '5px 0',
        borderRadius: 5
      },
      removeItem: {
        fontSize: 20,
        float: "left",
        position: "relative",
        top: 0,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
      todoItem: {
        paddingLeft: 20,
        fontSize: 17
      }
    };
    var listItems = this.props.items.map(function(item, index){
      var complete = item.complete ? 'Completed' : 'Complete';
      var activeClass = classNames({
        'table-item' : true,
        'is-complete' : item.complete,
        'not-complete' : !item.complete
      });
      return (
        <tr key={index} className={activeClass} >
          <td>
            <span
              className="glyphicon glyphicon-remove"
              style={styles.removeItem}
              onClick={this.props.remove.bind(null, index)} >
            </span>
          </td>
          <td>
             <span>{item.task}</span>
          </td>
          <td>
            <span><em><b>{item.priority}</b></em></span>
          </td>
          <td>
            <span className="complete-button" onClick={this.props.complete.bind(this, index, item.complete)}>{ complete }</span>
          </td>
        </tr>
      )
    }.bind(this));
    return (
      
      <table style={styles.uList} className="table table-striped">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </table>
    )
  }
});

module.exports = List;