import React from 'react';
import { Dispatcher } from 'flux';
import { Record as record, fromJS, List } from 'immutable';

import masterReducer from '../reducers/masterReducer';
import apiCallEffectHandler from '../effects-handlers/apiCallEffectHandler';

import InsertTodoForm from './InsertTodoForm';
import TodoItemsList from './TodoItemsList';

/**
 * This Reduction record describes the reduction schema returned by Reducers.
 * It contains a map that represents our single application state Atom
 * and it also contains list of effects. An Effect is just a message.
 * A message is a pair of type and payload.
 */
const Reduction = record({
  appState: fromJS({
    todos: [],
    loading: false
  }),
  effects: List.of()
});

export default class TodoList extends React.Component {

  constructor() {
    super();

    const dispatcher = new Dispatcher();

    // This is actually the top-level store, composing Reducers and applying effect handlers.
    dispatcher.register((action) => {
      let reduction = this.state.reduction;

      // Let's store all actions so that we can replay them.
      const actionLog = this.state.actionLog.push(action);

      // We want to purge the list of effects before every action.
      reduction = reduction.set('effects', List.of());

      // Only master reducer is executed here
      reduction = masterReducer(reduction, action);

      // All effect handlers are handled here.
      reduction.get('effects').forEach(apiCallEffectHandler.bind(null, dispatcher));

      // Let's set the reduction back to the Component's state,
      // This will result in re-render of any pure views whose
      // props have changed.
      this.setState({reduction, actionLog});
    });

    // We will keep the dispatcher, reduction and action log in the root component's state.
    // A portion of this state is passed down the component hierarchy to the corresponding
    // components.
    this.state = {
      dispatcher: dispatcher,
      reduction: new Reduction(),
      actionLog: List.of() // This is only for debugging, so we replay actions
    };

    // If there is hot-reloading available:
    // We want to replay all actions after the code has been refreshed
    if (module.hot) {
      module.hot.addStatusHandler(() => setTimeout(() => window.replay()));
    }
  }

  componentDidUpdate() {
    // The method is here only for hot-reloading.
    window.replay = () => {
      // We take the action log and reduce it in the master reducer,
      // passing it an initial empty reduction.
      // We empty the effect list so that we don't replay them.
      const reduction = this.state
        .actionLog
        .reduce(masterReducer, new Reduction())
        .set('effects', List.of());

      this.setState({reduction});
    };
  }

  render() {
    if (this.state.reduction.getIn(['appState', 'loading'])) {
      return <div>API call in progress</div>;
    }

    return (
      <div>
        <InsertTodoForm dispatcher={this.state.dispatcher} />
        <TodoItemsList todos={this.state.reduction.getIn(['appState', 'todos'])} dispatcher={this.state.dispatcher} />
      </div>
    );
  }

}
