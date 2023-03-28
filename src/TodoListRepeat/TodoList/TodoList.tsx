import { useEffect, useState, useReducer } from 'react'
import { Todo } from '../@Types/todo.type'
import { addTodoAction, selectTodoDoneAction, startEditTodoAction } from '../reducer/actions'
import reducer, { init, initalState } from '../reducer/reducer'
import { TaskInput } from '../TaskInput'
import { TaskLisk } from '../TaskList'
import styles from './todoList.module.scss'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const synReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  // const [todos, setTodos] = useState<Todo[]>([])
  // const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const [state, dispatch] = useReducer(reducer, initalState, init)
  const { todos, currentTodo } = state as any
  const doneTodo = todos.filter((todo: any) => todo.status)
  const notDoneTodo = todos.filter((todo: any) => !todo.status)

  // useEffect(() => {
  //   const todosString = localStorage.getItem('todos')
  //   const todosObj: Todo[] = JSON.parse(todosString || '[]')
  //   setTodos(todosObj)
  // }, [])

  const selectTodoDone = (id: string, status: boolean) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status
          }
        }
        return todo
      })
    }
    // setTodos(handler)
    dispatch(selectTodoDoneAction({ id, status }))
    synReactToLocal(handler)
  }

  const addTodo = (name: string) => {
    const handler = (todoObj: Todo[]) => [...todoObj, todo]
    const todo = {
      id: new Date().toISOString(),
      name,
      status: false
    }
    dispatch(addTodoAction(todo))
    // setTodos(handler)
    synReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    dispatch(startEditTodoAction({ id }))
    // const findTodoId = todos.find((todo) => todo.id === id)
    // setCurrentTodo(findTodoId!!)
  }

  const editTodo = (name: string) => {
    // setCurrentTodo((prev) => {
    //   return {
    //     ...prev!!,
    //     name
    //   }
    // })
  }

  const finishedEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTodo?.id) return currentTodo
        return todo
      })
    }

    // setTodos(handler)
    synReactToLocal(handler)
    // setCurrentTodo(null)
  }

  const deleteTodo = (id: string) => {
    const handler = (todoObj: Todo[]) => {
      const idx = todoObj.findIndex((todo) => todo.id === id)
      const rs = [...todoObj]
      if (idx > -1) rs.splice(idx, 1)
      return rs
    }
    // setTodos(handler)
    synReactToLocal(handler)
    // setCurrentTodo(null)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          finishedEditTodo={finishedEditTodo}
        />
        <TaskLisk
          todos={notDoneTodo}
          isTitleStatusDoneTodo={false}
          selectTodoDone={selectTodoDone}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskLisk
          todos={doneTodo}
          isTitleStatusDoneTodo
          selectTodoDone={selectTodoDone}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
