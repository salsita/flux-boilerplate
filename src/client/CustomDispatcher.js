import { Dispatcher } from 'flux'

export default class CustomDispatcher extends Dispatcher {

  constructor(appState) {
    super();
    this.appState = appState;
  }

  registerReducer(reducer) {
    return this.register((action) => {
      const actionType = action.type;

      if (reducer[actionType]) {
        reducer[actionType](this.appState, action.payload);
      }
    });
  }
}
