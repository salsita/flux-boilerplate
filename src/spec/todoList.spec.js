import { fromJS } from 'immutable';

import { addTodo } from '../client/actions/TodoActions';
import todoListReducer from '../client/reducers/TodoListReducer';

const expect = require('expect');

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

  it('should toggle loader and fire API call to store todo after adding todo', () => {
    const addTodoAction = addTodo('test');
    reduction = todoListReducer(reduction, addTodoAction);

    expect(reduction.getIn(['appState', 'loading'])).toBe(true);
    expect(reduction.getIn(['effects']).count()).toBe(1); // This should be more sophisticated.
  });
});
