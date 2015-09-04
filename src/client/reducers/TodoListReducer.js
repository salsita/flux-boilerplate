import * as Effects from '../constants/effects';
import buildMessage from '../messageBuilder';

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
 * chaining is not possible
 */
export const todoAddingRequested = (reduction, todo) => reduction
  .setIn(['appState', 'loading'], true)
  .set('effects', reduction
      .get('effects')
      .push(buildMessage(Effects.INSERT_TODO_API_CALL, todo))
  );

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
export const todoAdded = (reduction, todo) => reduction
  .setIn(['appState', 'loading'], false)
  .setIn(['appState', 'todos'], reduction.getIn(['appState', 'todos']).push(todo));

export const todoRemoved = (reduction, index) => reduction.deleteIn(['appState', 'todos', index]);
