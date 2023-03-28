import { Todo } from '../@Types/todo.type'
import { ActionType } from './constants'

export const initalState = {
  todos: [],
  currentTodo: null
} as {
  todos: Todo[]
  currentTodo: Todo | null
}

export const init = (initState: typeof initalState) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  return {
    ...initState,
    todos: [...todosObj]
  }
}

const reducer = (state: typeof initalState, action: ActionType) => {
  const { type, payload } = action
  const todoObj = [...state.todos]
  switch (type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, payload]
      }
    case 'SELECT_TODO_DONE': {
      const newTodos = todoObj.map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            status: payload.status
          }
        }
        return todo
      })
      return {
        ...state,
        todos: newTodos
      }
    }

    case 'START_EDIT_TODO': {
      const findTodoId = todoObj.find((todo) => todo.id === payload.id)
      return {
        ...state,
        currentTodo: findTodoId
      }
    }

    default:
      throw Error('Invalid action', type)
  }
}

export default reducer
