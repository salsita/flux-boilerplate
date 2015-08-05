# Flux boilerplate with stateless stores and reduced side-effects

This is a very simple repository demonstrating how can stateless stores (Reducers) help us to build
more manageable Flux application. It also utilizes Effect handlers to reduce side-effects from the
Reducers. It's fully hot-reloadable (reducers, actions, components).

Supplementary example for article published on https://blog.javascripting.com

- [Flux: No More Stores Meet Reducer](https://blog.javascripting.com/2015/06/19/flux-no-more-stores-meet-reducer/)

## Architecture overview:

There is a main store (it's not reducer because it's not reducing anything) in the top level component.
The store is registered to dispatcher in the component's constructor function. The dispatcher is being
passed down the component hierarchy so that it's possible to dispatch an action within any component.
```javascript
    constructor() {
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

      const dispatcher = new Dispatcher();

      // This is actually top level store, composing reducers and applying effect handlers
      dispatcher.register((action) => {
        let reduction = this.state.reduction;

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

      this.state = {
        dispatcher: dispatcher,
        reduction: new Reduction()
      };
    }
```

The action is being dispatched to reducer, The reducer reduces a list of effects and reduces new application state:
```javascript

  /**
   * When user submits the form, they would expect to
   * see the loading spinner, so that they know something is going on
   * in the background.
   *
   * There are two reactions to this action:
   * 1) Set the loading flag -> we can display loading spinner in the UI
   * 2) Emit effect which results in API call (storing the Todo),
   *    this effect is however not executed in the reducer
   *    instead it's being reduced to reduction as some "message".
   *    The message is basically pair of type and payload
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

List of effect is being passed to the effect handler (this all happens in the top-level store).
The handler handles the effect and results in some side-effect:
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
Navigate your browser to http://localhost:9876/
