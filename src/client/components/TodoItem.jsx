import React from 'react';
import PureComponent from './PureComponent';
import *  as TodoActions from '../actions/TodoActions';

export default class TodoItem extends PureComponent {

  render() {
    return (
      <li onClick={this.onClick.bind(this)}>{this.props.todo.get('todo')}</li>
    );
  }

  onClick() {
    if (confirm('Do you really want to remove the item?')) {
      TodoActions.todoRemoved(this.props.index);
    }
  }

}
