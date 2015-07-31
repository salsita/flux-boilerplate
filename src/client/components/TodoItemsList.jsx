import React, { PropTypes } from 'react';
import { Dispatcher } from 'flux';
import { List } from 'immutable';

import PureControllerView from './PureControllerView';
import TodoItem from './TodoItem';

export default class TodoItemsList extends PureControllerView {

  static propTypes = {
    todos: PropTypes.instanceOf(List),
    dispatcher: PropTypes.instanceOf(Dispatcher)
  };

  render() {
    const {todos, dispatcher} = this.props;

    return (
      <ul>
        {todos.map((todo, index) => {
          return <TodoItem todo={todo} index={index} key={index} dispatcher={dispatcher} />;
        }).toArray()}
      </ul>
    );
  }

}
