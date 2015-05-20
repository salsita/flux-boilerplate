import {Record} from 'immutable';
import * as Actions from '../constants/Actions';
import {dispatcher} from '../CustomDispatcher';
import {appState} from '../AppState';

const TodoRecord = Record({
  editing: false,
  todo: null,
  done: false
});

dispatcher.handleAction(Actions.TODO_ADDED, (todo) => {
  let state = appState.state;
  state = state.set('todos', state.get('todos').push(new TodoRecord({
    todo: todo
  })));

  appState.updateState(state);
});

dispatcher.handleAction(Actions.TODO_REMOVED, (index) => {
  appState.updateState(appState.state.deleteIn(['todos', index]));
});
