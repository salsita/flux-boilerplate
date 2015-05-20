import EventEmitter from 'eventemitter3';
import {fromJS} from 'immutable';

export const CHANGE = Symbol();

class AppState extends EventEmitter {

  constructor() {
    super();

    this.state = fromJS({
      todos: []
    });
  }

  getState() {
    return {
      todos: this.state.get('todos')
    };
  }

  updateState(state) {
    this.state = state;
    this.emitChange();
  }

  emitChange() {
    this.emit(CHANGE);
  }
}

export const appState = new AppState();
