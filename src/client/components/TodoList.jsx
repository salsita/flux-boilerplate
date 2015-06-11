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

  getChildContext() {
    return {
      dispatcher: this.props.dispatcher
    };
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

TodoList.childContextTypes = {
  dispatcher: React.PropTypes.instanceOf(CustomDispatcher)
};
