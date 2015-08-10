import buildMessage from '../MessageBuilder';
import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';

/**
 * Action creators are totally pure. They don't make any API calls or implement business logic.
 */

export function addTodo(todo) {
  return buildMessage(TODO_ADDING_REQUESTED, todo);
}

export function todoAdded(todo) {
  return buildMessage(TODO_ADDED, todo);
}

export function removeTodo(index) {
  return buildMessage(TODO_REMOVED, index);
}
