import React from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'
import CustomDispatcher from '../CustomDispatcher.js'

/**
 * Implements shouldComponentUpdate and passes dispatcher through context,
 * down the component hierarchy
 */
export default class PureControllerView extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  dispatchFutureAction(promise) {
    promise.then(this.dispatchAction.bind(this));
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
    return this.props.dispatcher ? this.props.dispatcher : this.context.dispatcher;
  }
}

const contextType = {
  dispatcher: React.PropTypes.instanceOf(CustomDispatcher)
};

PureControllerView.contextTypes = contextType;
PureControllerView.childContextTypes = contextType;
