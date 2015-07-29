import { Map as map } from 'immutable';

import { todoAdded } from '../actions/TodoActions';

import { INSERT_TODO_API_CALL } from '../constants/Effects';

const buildEffectHandler = (handlers) => {
  return (dispatcher, effect) => {
    map(handlers)
      .filter((handler, effectType) => effectType === effect.type)
      .forEach(handler => handler(effect.payload, dispatcher));
  };
};

const mockApiCall = (request) => {
  return new Promise((res) => {
    setTimeout(() => res(request + '-server-modified'), 500);
  });
};

export default buildEffectHandler({

  [INSERT_TODO_API_CALL]: (todo, dispatcher) => {
    mockApiCall(todo).then((response) => {
      dispatcher.dispatch(todoAdded(response));
    });
  }

});
