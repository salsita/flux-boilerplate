import { Map as map } from 'immutable';

import { todoAdded } from '../actions/todoActions';
import * as Effects from '../constants/effects';

/**
 * Just a helper method (functional way) to return a function which
 * calls the appropriate handler.
 */
const buildEffectHandler = handlers => {
  return (dispatcher, effect) => {
    map(handlers) // Wrap it in an immutable map so that we can use fancy methods like `filter`.
      .filter((handler, effectType) => effectType === effect.type)
      .forEach(handler => handler(effect.payload, dispatcher));
  };
};

// Let's simulate the server
const mockApiCall = (request) => new Promise(res => setTimeout(() => res(request + '-server-modified'), 500));

export default buildEffectHandler({

  /**
   * This method  takes an effect which has some payload (a todo in this case)
   * and results in some side effect (in this case an API call).
   * Once the call is finished, we dispatch another action with the response as its payload.
   *
   * There are only two parameters: payload of the effect and the dispatcher,
   * therefore you can't directly modify the state but can only dispatch an action instead.
   */
  [Effects.INSERT_TODO_API_CALL]: (todo, dispatcher) => {
    mockApiCall(todo).then(response => dispatcher.dispatch(todoAdded(response)));
  }

});
