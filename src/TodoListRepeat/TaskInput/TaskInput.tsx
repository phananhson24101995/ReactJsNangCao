import { ChangeEvent, useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../@Types/todo.type'
import styles from './taskInput.module.scss'
import { TodoPropType } from '../../Proptypes/todo.proptype'
import connect from '../HOC/connect'
import { debug, log } from '../constants'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishedEditTodo: () => void
}

function TaskInput(props: TaskInputProps & typeof injectedProps) {
  const { addTodo, currentTodo, editTodo, finishedEditTodo, log } = props
  // log(123)
  const [name, setName] = useState<string>('')
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    currentTodo ? editTodo(value) : setName(value)
  }

  const handleOnSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    currentTodo ? finishedEditTodo() : addTodo(name)
    if (name) setName('')
  }
  return (
    <div className='mb-2'>
      <h1 className={`mb-2 ${styles.title}`}>Todo list typescript</h1>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          type='text'
          placeholder='caption goes here...'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishedEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoPropType, PropTypes.oneOf([null])])
}

const injectedProps = { debug: debug, log: log }

export default connect(injectedProps)(TaskInput)
