import { Map as map } from 'immutable';

import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';
import { INSERT_TODO_API_CALL } from '../constants/Effects';

import buildMessage from '../MessageBuilder';

const buildReducer = (handlers) => {
  return (reduction, action) => {
    return map(handlers)
      .filter((handler, actionType) => actionType === action.type)
      .reduce((partialReduction, handler) => handler(partialReduction, action.payload), reduction);
  };
};

// This is the place where all magic belongs
export default buildReducer({

  [TODO_ADDING_REQUESTED]: (reduction, todo) => {
    return reduction
      .setIn(['appState', 'loading'], true)
      .set('effects', reduction
          .get('effects')
          .push(buildMessage(INSERT_TODO_API_CALL, todo))
      );
  },

  [TODO_ADDED]: (reduction, todo) => {
    return reduction
      .setIn(['appState', 'loading'], false)
      .setIn(['appState', 'todos'], reduction.getIn(['appState', 'todos']).push(todo));
  },

  [TODO_REMOVED]: (reduction, index) => {
    return reduction
      .deleteIn(['appState', 'todos', index]);
  }

});
