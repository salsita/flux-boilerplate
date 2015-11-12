import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { List } from 'immutable';

import routerEffectHandler from './effect-handlers/routerEffectHandler';
import masterReducer from './reducers/masterReducer';
import initialReduction from './initialReduction';

import Application from './components/Application';

const effectsHandlingMiddleware = store => next => action => {
  const result = next(action);
  store.getState().get('effects').forEach(effect => routerEffectHandler(effect, store.dispatch));

  return result;
};

const createStoreWithMiddleware = applyMiddleware(effectsHandlingMiddleware)(createStore);

const effectsCapableStore = (reduction = initialReduction, action) => reduction
  .set('effects', List.of())
  .update(r => masterReducer(r, action));

const store = createStoreWithMiddleware(effectsCapableStore);

render(<Application store={store} />, document.getElementById('app'));
