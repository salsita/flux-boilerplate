import React from 'react'
import { removeTodo } from '../actions/TodoActions.js'
import PureControllerView from './PureControllerView'

export default class TodoItem extends PureControllerView {

  render() {
    return (
      <li onClick={this.onClick.bind(this)}>{this.props.todo.get('todo')}</li>
    );
  }

  onClick() {
    if (confirm('Do you really want to remove the item?')) {
      this.dispatchAction(removeTodo(this.props.index));
    }
  }

}
