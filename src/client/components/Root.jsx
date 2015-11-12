import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Foo from './Foo';
import Bar from './Bar';

const mapReductionToProps = reduction => {
  return {
    history: reduction.getIn(['appState', 'history'])
  };
};

export default connect(mapReductionToProps)(props => {
  if (props.history) {
    return (
      <Router history={props.history}>
        <Route path="/">
          <IndexRoute component={Foo} />
          <Route path="foo" component={Foo} />
          <Route path="bar" component={Bar} />
        </Route>
      </Router>
    );
  } else {
    return <div>Initializing...</div>;
  }
});
