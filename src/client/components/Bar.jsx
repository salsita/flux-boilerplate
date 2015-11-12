import React from 'react';
import { connect } from 'react-redux';

import * as TestingActions from '../actions/testingActions';

export default connect()(props => (
  <div>
    <h1>Bar</h1>
    <button onClick={() => props.dispatch(TestingActions.fooClicked())}>Go Foo</button>
  </div>
));
