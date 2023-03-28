import { ChangeEvent, useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'
import { TodoPropType1 } from '../../Proptypes/todo.proptype'
import connect, { InjectedType } from '../../HOC/connect'

interface TaskListProps extends InjectedType {
  doneTaskList: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  const handleTaskInput = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    handleDoneTodo(id, checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              checked={todo.done}
              className={styles.taskCheckbox}
              onChange={handleTaskInput(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                🖋️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool.isRequired,
  handleDoneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(TodoPropType1).isRequired
}

export default connect({ user: 'Son' })(TaskList)
