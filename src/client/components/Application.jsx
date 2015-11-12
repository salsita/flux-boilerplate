import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

import * as TestingActions from '../actions/testingActions';
import Root from './Root';

export default class Application extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.store.dispatch(TestingActions.applicationMounting());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Root />
      </Provider>
    );
  }
}
