import { Map as map } from 'immutable';

import { todoAdded } from '../actions/TodoActions';

import { INSERT_TODO_API_CALL } from '../constants/Effects';

/**
 * Again, just a helper method to return a function which
 * calls the specific handler. Pretty similiar to buildReducer.
 * buildReducer however accumulates the returning value,
 * which we want to ignore here, because handler should just result in
 * some side effect and should not return any value.
 */
const buildEffectHandler = handlers => {
  return (dispatcher, effect) => {
    map(handlers) // just wrap it in immutable map, we would like to use the fance methods like the filter
      .filter((handler, effectType) => effectType === effect.type)
      .forEach(handler => handler(effect.payload, dispatcher));
  };
};

// Let's simulate the server
const mockApiCall = (request) => {
  return new Promise(res => setTimeout(() => res(request + '-server-modified'), 500));
};

export default buildEffectHandler({

  /**
   * So this method basically takes the the effect which has some payload (actual todo in this case)
   * and results in some side effect which is the API call,
   * Once the call is finished we can dispatch another action with the response.
   *
   * There are only two parameters: payload of the effect and dispatcher,
   * therefore you can't directly modify the state but you have to dispatch an action instead.
   */
  [INSERT_TODO_API_CALL]: (todo, dispatcher) => {
    mockApiCall(todo).then(response => dispatcher.dispatch(todoAdded(response)));
  }

});
