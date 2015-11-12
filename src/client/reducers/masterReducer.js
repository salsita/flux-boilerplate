import * as Actions from '../constants/actions';
import * as TestingReducer from './testingReducer';

const sequence = (...reducers) => initialReduction => reducers.reduce((state, reducer) => reducer(state), initialReduction);

export default (reduction, action) => {
  const { type, payload } = action;

  switch (type) {
  case Actions.APPLICATION_MOUNTING:
    return sequence(TestingReducer.applicationMounting())(reduction);
  case Actions.ROUTER_BOOTSTRAPPED:
    return sequence(TestingReducer.routerBootstrapped(payload))(reduction);
  case Actions.FOO_CLICKED:
    return sequence(TestingReducer.fooClicked())(reduction);
  case Actions.BAR_CLICKED:
    return sequence(TestingReducer.barClicked())(reduction);
  default:
    console.warn(`Unhandled action ${type}`);
    return reduction;
  }
};
