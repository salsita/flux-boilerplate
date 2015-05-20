import React from 'react';
import InsertTodoForm from './InsertTodoForm';
import TodoItemsList from './TodoItemsList';
import {appState, CHANGE} from '../AppState';

export default class TodoList extends React.Component {

  constructor() {
    super();
    this.state = appState.getState();
  }

  componentDidMount() {
    appState.on(CHANGE, () => {
      this.setState(appState.getState());
    });
  }

  render() {
    return (
      <div>
        <InsertTodoForm />
        <TodoItemsList {...this.state} />
      </div>
    );
  }

}
