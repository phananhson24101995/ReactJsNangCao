import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { TaskInput } from '../TaskkInput'
import { TaskList } from '../TaskList'
import styles from './todoList.module.scss'

// interface HandeNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandeNewTodos = (todos: Todo[]) => Todo[]

const synReactToLocal = (handleNewTodos: HandeNewTodos) => {
  const todosStr = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosStr || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosStr = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosStr || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const handler = (todosObj: Todo[]) => [...todosObj, todo]
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos(handler)
    synReactToLocal(handler)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    setTodos(handler)
    synReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === currentTodo?.id) return currentTodo
        return todo
      })
    }
    setTodos(handler)
    synReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) setCurrentTodo(null)
    const handler = (todosObj: Todo[]) => {
      const findIndexTodo = todos.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...todosObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todosObj
    }
    setTodos(handler)
    synReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          doneTaskList={false}
          todos={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
