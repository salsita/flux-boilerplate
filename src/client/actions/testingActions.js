import invariant from 'invariant';

import * as Actions from '../constants/actions';
import buildMessage from '../buildMessage';

export const applicationMounting = () => buildMessage(Actions.APPLICATION_MOUNTING);

export const routerBootstrapped = history => {
  invariant(history, 'History object is mandatory');

  return buildMessage(Actions.ROUTER_BOOTSTRAPPED, history);
};

export const fooClicked = () => buildMessage(Actions.FOO_CLICKED);

export const barClicked = () => buildMessage(Actions.BAR_CLICKED);
