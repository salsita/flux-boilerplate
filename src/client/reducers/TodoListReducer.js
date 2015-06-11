import { Record } from 'immutable'
import { TODO_REMOVED, TODO_ADDED } from '../constants/Actions.js'

const TodoRecord = Record({
  todo: null
});

export default {

  [TODO_ADDED]: (appState, todo) => {
    let state = appState.state;
    state = state.set('todos', state.get('todos').push(new TodoRecord({
      todo: todo
    })));

    appState.updateState(state);
  },

  [TODO_REMOVED]: (appState, index) => {
    appState.updateState(appState.state.deleteIn(['todos', index]));
  }
};
