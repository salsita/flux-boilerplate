import { fromJS } from 'immutable';
import expect from 'expect';

import * as TodoActions from '../client/actions/TodoActions';
import * as TodoListReducer from '../client/reducers/todoListReducer';
import masterReducer from '../client/reducers/masterReducer';

const TESTING_TODO = 'test';

// It's pretty easy to write either integration or unit tests.
// Because we have master reducer we can simply do the integration test by calling it.
// All other reducer's functions can be tested in isolation as the unit test.
describe('Todo list', () => {
  let reduction;

  beforeEach(() => {
    reduction = fromJS({
      appState: {
        todos: [],
        loading: false
      },
      effects: []
    });
  });

  // This is obviously an integration test beacuse it's testing entire masterReducer which may call multiple reducers functions.
  it('should toggle loader and fire API call to store todo after adding todo - integration test', () => {
    const addTodoAction = TodoActions.addTodo(TESTING_TODO);
    reduction = masterReducer(reduction, addTodoAction);

    expect(reduction.getIn(['appState', 'loading'])).toBe(true);
    expect(reduction.getIn(['effects']).count()).toBe(1); // This should be more sophisticated.
  });

  // This is unit test as it's testing just the single pure todoAdded function.
  it('should reset loader and contain new todo - unit test', () => {
    const todoAddedAction = TodoActions.todoAdded(TESTING_TODO);
    reduction = TodoListReducer.todoAdded(reduction, todoAddedAction.payload);

    expect(reduction.getIn(['appState', 'loading'])).toBe(false);
    expect(reduction.getIn(['appState', 'todos', 0])).toBe(TESTING_TODO);
  });
});
