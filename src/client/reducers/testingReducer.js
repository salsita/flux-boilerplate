import * as Effects from '../constants/effects';
import buildMessage from '../buildMessage';

export const applicationMounting = () => reduction => reduction.update('effects', effects => effects.push(buildMessage(Effects.BOOTSTRAP_ROUTING)));

export const routerBootstrapped = history => reduction => reduction.setIn(['appState', 'history'], history);

export const fooClicked = () => reduction => reduction.update('effects', effects => effects.push(buildMessage(Effects.ROUTER_CHANGE_ROUTE, '/foo')));

export const barClicked = () => reduction => reduction.update('effects', effects => effects.push(buildMessage(Effects.ROUTER_CHANGE_ROUTE, '/bar')));

