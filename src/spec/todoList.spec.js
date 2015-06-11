import AppState from '../client/AppState.js'
import { addTodo, removeTodo } from '../client/actions/TodoActions.js'
import { TODO_ADDED } from '../client/constants/Actions.js'
import TodoListReducer from '../client/reducers/TodoListReducer.js'

const expect = require('expect');

describe('Todo list', () => {
  let appState;

  beforeEach(() => {
    appState = new AppState();
  });

  it('can add new todo', () => {
    const addTodoAction = addTodo('test');
    TodoListReducer[addTodoAction.type](appState, addTodoAction.payload);

    expect(appState.getState().todos.count()).toBe(1);
  });

  it('can remove todo', () => {
    const addTodoAction = addTodo('test');
    TodoListReducer[addTodoAction.type](appState, addTodoAction.payload);

    expect(appState.getState().todos.count()).toBe(1);

    const removeTodoAction = removeTodo(0);
    TodoListReducer[removeTodoAction.type](appState, removeTodoAction.payload);

    expect(appState.getState().todos.count()).toBe(0);
  });
});
