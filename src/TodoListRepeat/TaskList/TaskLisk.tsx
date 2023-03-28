import React from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../@Types/todo.type'
import styles from './taskList.module.scss'
import { TodoPropType } from '../../Proptypes/todo.proptype'
import connect from '../HOC/connect'

interface TaskListProps {
  todos: Todo[]
  isTitleStatusDoneTodo: boolean
  selectTodoDone: (id: string, status: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

function TaskLisk(props: TaskListProps & typeof injectedProps) {
  const { todos, isTitleStatusDoneTodo, selectTodoDone, startEditTodo, deleteTodo, user } = props

  console.log('todos', todos)

  const handleChangeTask = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    selectTodoDone(id, checked)
  }
  return (
    <div className='mb-2'>
      {todos.length > 0 && (
        <h2 className={`mb-2 ${styles.title}`}>{!isTitleStatusDoneTodo ? 'Chưa hoàn thành' : 'Hoàn thành'}</h2>
      )}
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.status}
              onChange={handleChangeTask(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.status ? styles.taskNameDone : ''}`}>{todo.name}</span>
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

TaskLisk.propTypes = {
  todos: PropTypes.arrayOf(TodoPropType).isRequired,
  isTitleStatusDoneTodo: PropTypes.bool.isRequired,
  selectTodoDone: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

const injectedProps = {
  user: { name: 'Son' }
}

export default connect(injectedProps)(TaskLisk)
