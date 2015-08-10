import { Map as map } from 'immutable';

import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';
import { INSERT_TODO_API_CALL } from '../constants/Effects';

import buildMessage from '../MessageBuilder';

/*
 * This is actually a helper method which returns a pure function.
 * It is a more functional variant on the classic Flux "switch" statement.
 * We definitely want our Reducers to be just functions.
 * The reason why this is so important is so that we can easily compose Reducers.
 *
 * For example:
 *
 * const reducerA = (reduction, action) {
 *   // something happens here
 * }
 *
 * const reducerB = (reduction, action) {
 *   // something happens here
 * }
 *
 * const composedReducerC = (reduction, action) {
 *   reducerA(reduction, action);
 *   reducerB(reduction, action);
 * }
 *
 * With this approach, you can specify the order of executed reducers: no need for the `waitFor` method!
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

// This is the place where all magic happens.
export default buildReducer({

  /**
   * When the user submits the form, they would expect to
   * see the loading spinner so that they know something is going on
   * in the background.
   *
   * There are two reactions to this action:
   * 1) Set the loading flag -> we can display loading spinner in the UI.
   * 2) Emit an effect which results in an API call (storing the Todo).
   *    This effect is however not executed in the Reducer,
   *    instead it reduced into the reduction's effect list as a "message".
   *    The message is just a pair of type and payload.
   *
   * The Reducer does not take the dispatcher as a parameter, so action
   * chaining is not possible.
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
   * The effect handler "executes" the effect, resulting in a side effect.
   * When the side-effect obtains the response from the server it dispatches
   * a new TODO_ADDED action.
   *
   * We would like to
   * 1) Reset the loading flag -> hide loading spinner beacuse API call has completed.
   * 2) Push the todo (it might have been modified on the server) into the list of todos.
   *
   * Be aware that this is just an illustrative example. Ideally, you don't need to modify
   * the Todo being added on the server, and therefore you can put it in the list before the API call.
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
