import React from 'react';
import { Dispatcher } from 'flux';
import { Record as record, fromJS, List } from 'immutable';

import todoListReducer from '../reducers/TodoListReducer';

import apiCallEffectHandler from '../effects-handlers/ApiCallEffectHandler';

import InsertTodoForm from './InsertTodoForm';
import TodoItemsList from './TodoItemsList';

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

    // This is actually top level store?, composing reducers and effect handlers
    dispatcher.register((action) => {
      let reduction = this.state.reduction;

      // let's store all actions so that we can replay them
      const actionStore = this.state.actionStore.push(action);

      // we want to purge list of effects before every action
      reduction = reduction.set('effects', List.of());

      // all reducers
      reduction = todoListReducer(reduction, action);

      // all effect handlers
      reduction.get('effects').forEach(apiCallEffectHandler.bind(null, dispatcher));

      this.setState({reduction, actionStore});
    });

    this.state = {
      dispatcher: dispatcher,
      reduction: new Reduction(),
      actionStore: List.of()
    };

    if (module.hot) {
      module.hot.addStatusHandler(() => setTimeout(() => window.replay()));
    }
  }

  componentDidUpdate() {
    window.replay = () => {
      const reduction = this.state
        .actionStore
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
