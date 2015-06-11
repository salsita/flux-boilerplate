import React from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'
import CustomDispatcher from '../CustomDispatcher.js'

export default class PureControllerView extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  dispatchFutureAction(promise) {
    promise.then(this.dispatchAction);
  }

  dispatchAction(action) {
    this.getDispatcher().dispatch(action);
  }

  getChildContext() {
    return {
      dispatcher: this.getDispatcher()
    };
  }

  getDispatcher() {
    if (this.props.dispatcher) {
      return this.props.dispatcher;
    } else {
      return this.context.dispatcher;
    }
  }
}

const contextType = {
  dispatcher: React.PropTypes.instanceOf(CustomDispatcher)
};

PureControllerView.contextTypes = contextType;
PureControllerView.childContextTypes = contextType;
