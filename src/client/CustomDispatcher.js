import { Dispatcher } from 'flux'

/**
 * Custom dispatcher implementation extending original Facebook's dispacher.
 * It only adds support for registering reducers
 */
export default class CustomDispatcher extends Dispatcher {

  constructor(appState) {
    super();
    this.appState = appState;
  }

  /**
   * Registers reducer's handlers to corresponding actions
   */
  registerReducer(reducer) {
    return this.register((action) => {
      const actionType = action.type;

      if (reducer[actionType]) {
        reducer[actionType](this.appState, action.payload);
      }
    });
  }
}
