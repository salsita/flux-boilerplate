import {Dispatcher} from 'flux';

class CustomDispatcher extends Dispatcher {

  dispatchAction(actionType, payload) {
    this.dispatch({
      actionType: actionType,
      payload: payload
    });
  }

  handleAction(actionType, handler) {
    this.register((action) => {
      if (action.actionType === actionType) {
        console.log(`Dispatching ${actionType.toString()}`, action.payload);

        handler(action.payload);
      }
    });
  }
}

export const dispatcher = new CustomDispatcher();
