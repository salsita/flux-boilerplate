import createBrowserHistory from 'history/lib/createBrowserHistory';

import * as TestingActions from '../actions/testingActions';
import * as Effects from '../constants/effects';

const history = createBrowserHistory();

export default (effect, dispatch) => {
  const { type, payload } = effect;

  switch (type) {
  case Effects.BOOTSTRAP_ROUTING:
    dispatch(TestingActions.routerBootstrapped(history));
    break;
  case Effects.ROUTER_CHANGE_ROUTE:
    history.pushState({}, payload);
    break;
  }
};
