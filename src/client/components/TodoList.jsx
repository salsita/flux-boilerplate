import React from 'react'
import { CHANGE } from '../AppState'
import CustomDispatcher from '../CustomDispatcher.js'
import InsertTodoForm from './InsertTodoForm'
import TodoItemsList from './TodoItemsList'

export default class TodoList extends React.Component {

  constructor(props) {
    super();
    this.state = props.appState.getState();
  }

  componentDidMount() {
    this.props.appState.on(CHANGE, () => {
      this.setState(this.props.appState.getState());
    });
  }

  render() {
    return (
      <div>
        <InsertTodoForm dispatcher={this.props.dispatcher} />
        <TodoItemsList {...this.state} dispatcher={this.props.dispatcher} />
      </div>
    );
  }

}