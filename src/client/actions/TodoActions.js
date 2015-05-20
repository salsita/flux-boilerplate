import * as Actions from '../constants/Actions';
import {dispatcher} from '../CustomDispatcher';

export function todoAdded(todo) {
  dispatcher.dispatchAction(Actions.TODO_ADDED, todo);
}

export function todoRemoved(index) {
  dispatcher.dispatchAction(Actions.TODO_REMOVED, index);
}
