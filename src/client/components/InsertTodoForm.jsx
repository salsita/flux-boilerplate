import React from 'react'
import { addTodoAsync } from '../actions/TodoActions'
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

    this.dispatchFutureAction(
      addTodoAsync(this.refs.input.getDOMNode().value)
    );
  }
}
