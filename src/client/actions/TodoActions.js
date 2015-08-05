import buildMessage from '../MessageBuilder';
import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';

/**
 * Action creators are totally pure, they don't send any API calls and don't do any logic.
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
