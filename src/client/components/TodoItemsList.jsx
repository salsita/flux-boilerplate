import React from 'react';
import PureComponent from './PureComponent';
import TodoItem from './TodoItem';

export default class TodoItemsList extends PureComponent {

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
