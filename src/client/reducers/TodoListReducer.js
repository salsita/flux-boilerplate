import { Map as map } from 'immutable';

import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';
import { INSERT_TODO_API_CALL } from '../constants/Effects';

import buildMessage from '../MessageBuilder';

/*
 * This is actually a helper method which returns pure function. It's basically the classic Flux "switch" substitution.
 * We definitely want our Reducers to be just functions.
 * The reason why this is so important is that we can easily compose functions.
 * Let's say:
 *
 * const reducerA = (reduction, action) {
 *   // something happens here
 * }
 *
 * const reducerB = (reduction, action) {
 *   // something happens here
 * }
 *
 * const composingReducerC = (reduction, action) {
 *   reducerA(reduction, action);
 *   reducerB(reduction, action);
 * }
 *
 * With this approach, you can specify the order of executed reducers - no need for waitFor method.
 *
 * What this method basically does is:
 * 
 * const buildReducer = (handlers) => {
 *   return (reduction, action) => {
 *     return handlers[action.type](reduction, action.payload);
 *   }
 * }
 */
const buildReducer = handlers => {
  return (reduction, action) => {
    return map(handlers)
      .filter((handler, actionType) => actionType === action.type)
      .reduce((partialReduction, handler) => handler(partialReduction, action.payload), reduction);
  };
};

// This is the place where all magic belongs
export default buildReducer({

  /**
   * When user submits the form, they would expect to
   * see the loading spinner, so that they know something is going on
   * in the background.
   *
   * There are two reactions to this action:
   * 1) Set the loading flag -> we can display loading spinner in the UI
   * 2) Emit effect which results in API call (storing the Todo),
   *    this effect is however not executed in the reducer
   *    instead it's being reduced to reduction as some "message".
   *    The message is basically pair of type and payload
   *
   * The reducer does not take dispatcher as the parameter, so it's not possible to
   * do the action chaining anyway.
   */
  [TODO_ADDING_REQUESTED]: (reduction, todo) => {
    return reduction
      .setIn(['appState', 'loading'], true)
      .set('effects', reduction
          .get('effects')
          .push(buildMessage(INSERT_TODO_API_CALL, todo))
      );
  },

  /**
   * When something (effect handler) that "executes" the effect which
   * results in side-effect obtains the response from the server it dispatches
   * a new action TODO_ADDED.
   *
   * We would like to 
   * 1) Reset the loading flag -> hide loading spinner beacuse API call has just finished
   * 2) Push the todo (the todo might have been modified on the server) in the list of todos.
   *
   * Be aware, that this is just an illustrative example. Ideally, you don't need to modify inserting
   * Todo on server and therefore you can put the todo in the list before the API call.
   */
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
