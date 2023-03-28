import { Todo } from '../@Types/todo.type'
import { AddTodoType, SelectTodoDoneType, StartEditTodoType } from './constants'

export const addTodoAction = (payload: Todo) => {
  return { type: 'ADD_TODO', payload } as AddTodoType
}

export const selectTodoDoneAction = (payload: { id: string, status: boolean }) => {
  return { type: 'SELECT_TODO_DONE', payload } as SelectTodoDoneType
}

export const startEditTodoAction = (payload: { id: string }) => {
  return { type: 'START_EDIT_TODO', payload } as StartEditTodoType
}
