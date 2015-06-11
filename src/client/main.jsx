import React from 'react'
import AppState from './AppState'
import CustomDispatcher from './CustomDispatcher.js'
import TodoList from './components/TodoList'
import TodoListReducer from './reducers/TodoListReducer.js'

const appState = new AppState();
const dispatcher = new CustomDispatcher(appState);
dispatcher.registerReducer(TodoListReducer);

React.render(<TodoList dispatcher={dispatcher} appState={appState} />, document.getElementById('app'));
