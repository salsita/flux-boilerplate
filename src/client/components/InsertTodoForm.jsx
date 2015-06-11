import React from 'react'
import { addTodo } from '../actions/TodoActions'
import PureControllerView from './PureControllerView'

export default class InsertTodoForm extends PureControllerView {

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" ref="input" />
      </form>
    );
  }

  onSubmit(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    this.dispatchAction(
      addTodo(this.refs.input.getDOMNode().value)
    );
  }
}
