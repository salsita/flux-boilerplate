// Master reducer idea inspired by http://www.code-experience.com/problems-with-flux/
// We have to handle the action only in single top level reducer.

import * as Actions from '../constants/actions';
import * as TodoListReducer from './todoListReducer';

export default (reduction, action) => {
  const payload = action.payload;
  const type = action.type;

  console.debug('Handling action', type);

  return reduction.withMutations(mutableReduction => {
    switch (type) {
      case Actions.TODO_ADDING_REQUESTED:
        mutableReduction.update(r => TodoListReducer.todoAddingRequested(r, payload));
      break;
      case Actions.TODO_ADDED:
        mutableReduction.update(r => TodoListReducer.todoAdded(r, payload));
      break;
      case Actions.TODO_REMOVED:
        mutableReduction.update(r => TodoListReducer.todoRemoved(r, payload));
      break;
      default:
        console.debug(`Unhandled action ${type}`);
    }
  });
};
