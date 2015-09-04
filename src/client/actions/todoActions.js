import buildMessage from '../messageBuilder';
import * as Actions from '../constants/actions';

/**
 * Action creators are totally pure. They don't make any API calls or implement business logic.
 */
export const addTodo = todo => buildMessage(Actions.TODO_ADDING_REQUESTED, todo);
export const todoAdded = todo => buildMessage(Actions.TODO_ADDED, todo);
export const removeTodo = index => buildMessage(Actions.TODO_REMOVED, index);
