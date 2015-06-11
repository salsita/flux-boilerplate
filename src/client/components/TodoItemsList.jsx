import React from 'react'
import PureControllerView from './PureControllerView'
import TodoItem from './TodoItem'

export default class TodoItemsList extends PureControllerView {

  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) => {
          return <TodoItem todo={todo} index={index} key={index} />;
        }).toArray()}
      </ul>
    );
  }

}
