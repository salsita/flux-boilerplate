import React from 'react';
import PureComponent from './PureComponent';
import * as TodoActions from '../actions/TodoActions';

export default class InsertTodoForm extends PureComponent {

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

    TodoActions.todoAdded(this.refs.input.getDOMNode().value);
  }
}
