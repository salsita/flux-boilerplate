import EventEmitter from 'eventemitter3'
import { fromJS } from 'immutable'

export const CHANGE = Symbol();
export const SNAPSHOTS_KEY = 'snapshots';

export default class AppState extends EventEmitter {

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

  removeSnapshot(key) {
    let snapshots = this.getSnapshots();
    delete snapshots[key];
    this.persistSnapshots(snapshots);
  }

  getPossibleSnapshots() {
    return Object.keys(this.getSnapshots());
  }

  createSnapshot(key) {
    if (!key)  {
      throw new Error('Key is mandatory');
    }

    let snapshots = this.getSnapshots();
    if (snapshots[key]) {
      throw new Error(`Snapshot with key ${key} already exists`);
    } else {
      snapshots[key] = this.state.toJS();
    }

    this.persistSnapshots(snapshots);
  }

  applySnapshot(key) {
    this.updateState(fromJS(this.getSnapshot(key)));
  }

  getSnapshot(key) {
    const snapshots = this.getSnapshots();

    if (snapshots[key]) {
      return snapshots[key];
    } else {
      throw new Error(`Unexisting snapshot with key ${key}`);
    }
  }

  persistSnapshots(snapshots) {
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
  }

  getSnapshots() {
    return JSON.parse(localStorage.getItem(SNAPSHOTS_KEY) || '{}');
  }
}
