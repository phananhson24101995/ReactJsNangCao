import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { TodoPropType1 } from '../../Proptypes/todo.proptype'
import connect, { ExtraInfoType } from '../../HOC/connect'
import { debug, log } from '../../constants'
import { Title } from '../Title'

interface TaskInputProps extends ExtraInfoType {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const address = useMemo(() => {
    return {
      street: 'Hà Nội'
    }
  }, [currentTodo])

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
    } else {
      addTodo(name)
    }
    if (name) setName('')
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  const handleClickTitle = useCallback((value: any) => {
    console.log('handleClickTitle')
  }, [])

  return (
    <div className='mb-2'>
      <Title address={address} handleClickTitle={handleClickTitle} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoPropType1, PropTypes.oneOf([null])])
}

export default connect({ debug: debug, log: log })(TaskInput)
