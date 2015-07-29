import React, { PropTypes } from 'react';

import PureControllerView from './PureControllerView';
import { removeTodo } from '../actions/TodoActions';

export default class TodoItem extends PureControllerView {

  static propTypes = {
    todo: PropTypes.string,
    index: PropTypes.number
  };

  onClick() {
    if (confirm('Do you really want to remove the item?')) {
      this.dispatchAction(removeTodo(this.props.index));
    }
  }

  render() {
    return (
      <li onClick={this.onClick.bind(this)}>{this.props.todo}</li>
    );
  }

}
