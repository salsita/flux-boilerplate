# Flux boilerplate with stateless stores and reduced side effects

This is a very simple repository demonstrating how can stateless stores (Reducers) help us to build
more manageable Flux applications. It also utilizes Effect handlers to "reduce" side-effects from the
Reducers (see below). It is fully hot-reloadable (reducers, actions, components).

More details are available on the [JavaScripting Blog](https://blog.javascripting.com):

- [Flux: No More Stores Meet Reducer](https://blog.javascripting.com/2015/06/19/flux-no-more-stores-meet-reducer/)
- [Flux: Reduce Your Side Effects](TODO)

## Architectural overview:

There is a main store (which is not a Reducer because it's not reducing anything) in the top-level component.
The store is registered in the dispatcher in the component's constructor function. The dispatcher is
passed down the component hierarchy so that it's possible to dispatch an action from within any component.

```javascript
  constructor() {
    const Reduction = record({
      appState: fromJS({
        todos: [],
        loading: false
      }),
      effects: List.of()
    });

    const dispatcher = new Dispatcher();

    // This is actually the top-level store, composing Reducers and applying effect handlers.
    dispatcher.register((action) => {
      let reduction = this.state.reduction;

      // Let's store all actions so that we can replay them.
      const actionLog = this.state.actionLog.push(action);

      // We want to purge the list of effects before every action.
      reduction = reduction.set('effects', List.of());

      // All Reducers are executed here.
      reduction = todoListReducer(reduction, action);

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
  }
```

The action is passed to the Reducer, The Reducer reduces both the list of effects and the new application state:
```javascript

  /**
   * When the user submits the form, they would expect to
   * see the loading spinner so that they know something is going on
   * in the background.
   *
   * There are two reactions to this action:
   * 1) Set the loading flag -> we can display loading spinner in the UI.
   * 2) Emit an effect which results in an API call (storing the Todo).
   *    This effect is however not executed in the Reducer,
   *    instead it reduced into the reduction's effect list as a "message".
   *    The message is just a pair of type and payload.
   *
   * The Reducer does not take the dispatcher as a parameter, so action
   * chaining is not possible.
   */
  const todoListReducer = (reduction, action) {
    switch (action.type) {
      case 'TODO_ADDING_REQUESTED':
        return reduction
          .setIn(['appState', 'loading'], true)
          .set('effects', reduction
              .get('effects')
              .push(buildMessage('INSERT_TODO_API_CALL', action.payload)) // action.payload contains the actual TODO
          );
      break;
    }
  }
```

The list of effects is passed to the effect handler (this all happens in the top-level store).
The handler handles the effect and results in some side effect:
```javascript

  const apiCallEffectHandler = (effect, dispatcher) {
    switch (effect.type) {
      case 'INSERT_TODO_API_CALL':
        mockApiCall(effect.payload).then(response => dispatcher.dispatch(todoAdded(response)));
      break;
    }
  }
```


## Usage
```
git clone git@github.com:tomkis1/flux-boilerplate.git
cd flux-boilerplate
npm install
npm start
```

## Development
```
node src/server/devServer.js
```

## Tests
```
npm test
```
Navigate your browser to http://localhost:9876/.
