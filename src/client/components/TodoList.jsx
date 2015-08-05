import React from 'react';
import { Dispatcher } from 'flux';
import { Record as record, fromJS, List } from 'immutable';

import todoListReducer from '../reducers/TodoListReducer';

import apiCallEffectHandler from '../effects-handlers/ApiCallEffectHandler';

import InsertTodoForm from './InsertTodoForm';
import TodoItemsList from './TodoItemsList';

/**
 * Reduction record represents the reduction schema returned from Reducers.
 * It contains map which represents to our single application state Atom
 * and it also contains list of effects. Effect is just message and message
 * is pair of type and payload.
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

    // This is actually top level store, composing reducers and applying effect handlers
    dispatcher.register((action) => {
      let reduction = this.state.reduction;

      // let's store all actions so that we can replay them
      const actionLog = this.state.actionLog.push(action);

      // we want to purge list of effects before every action
      reduction = reduction.set('effects', List.of());

      // all reducers are being executed here
      reduction = todoListReducer(reduction, action);

      // all effect handlers are being handled here
      reduction.get('effects').forEach(apiCallEffectHandler.bind(null, dispatcher));

      // let's set the reduction back to the Component's state,
      // this will result in re-render of those pure views, whose
      // props have changed.
      this.setState({reduction, actionLog});
    });

    // we will keep dispatcher, reduction and action log in the root component's state,
    // the portion of the state is being passed down the component hierarchy to corresponding
    // components
    this.state = {
      dispatcher: dispatcher,
      reduction: new Reduction(),
      actionLog: List.of() // This is only for debugging, we can perform replay of actions
    };

    // If there is hot-reloading available
    // We want to perform a replay after the code has been refreshed
    if (module.hot) {
      module.hot.addStatusHandler(() => setTimeout(() => window.replay()));
    }
  }

  componentDidUpdate() {

    // The method is here only for hot-reloading
    window.replay = () => {

      // We will take the action log, reduce it in reducers and pass an them initial empty reduction
      // strip down the effects so that we are not replaying them.
      const reduction = this.state
        .actionLog
        .reduce(todoListReducer, new Reduction())
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
