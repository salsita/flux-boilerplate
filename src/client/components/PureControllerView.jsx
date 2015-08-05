import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Implements shouldComponentUpdate
 */
export default class PureControllerView extends React.Component {

  // So yeah, we are using only immutable data structures,
  // so it's totally ok to just compare props and state 
  // to observe change
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }

  dispatchAction(action) {
    this.props.dispatcher.dispatch(action);
  }

}
