import buildMessage from '../MessageBuilder';
import { TODO_ADDING_REQUESTED, TODO_ADDED, TODO_REMOVED } from '../constants/Actions';

export function addTodo(todo) {
  return buildMessage(TODO_ADDING_REQUESTED, todo);
}

export function todoAdded(todo) {
  return buildMessage(TODO_ADDED, todo);
}

export function removeTodo(index) {
  return buildMessage(TODO_REMOVED, index);
}
