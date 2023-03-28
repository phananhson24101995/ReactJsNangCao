import { Todo } from '../@Types/todo.type'

export type AddTodoType = { type: 'ADD_TODO', payload: Todo }
export type SelectTodoDoneType = {
  type: 'SELECT_TODO_DONE',
  payload: { id: string, status: boolean }
}

export type StartEditTodoType = { type: 'START_EDIT_TODO', payload: { id: string } }

export type ActionType = AddTodoType | SelectTodoDoneType | StartEditTodoType