import React from 'react';

import PureControllerView from './PureControllerView';
import { addTodo } from '../actions/todoActions';

export default class InsertTodoForm extends PureControllerView {

  onSubmit(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    this.dispatchAction(addTodo(this.refs.input.getDOMNode().value));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" ref="input" />
      </form>
    );
  }
}
