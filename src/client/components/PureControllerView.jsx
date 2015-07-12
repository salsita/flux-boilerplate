import React from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'

/**
 * Implements shouldComponentUpdate
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
    this.props.dispatcher.dispatch(action);
  }
}