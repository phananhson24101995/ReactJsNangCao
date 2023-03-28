import { useReducer } from 'react'
import * as actions from '../../reducer/actions'
import reducer, { initalState, init, loger } from '../../reducer/reducer'
function Couter() {
  // const [state, setState] = useState<{ age: number }>({ age: 28 })

  const [state, dispatch] = useReducer(loger(), initalState, init)

  const { decreaseAgeAction, increaseAgeAction, increaseXAgeAction } = actions
  const increaseAge = () => {
    dispatch(increaseAgeAction())
    // const nextState = reducer(state, increaseAgeAction())
    // console.log(nextState)
  }

  const decreaseAge = () => {
    dispatch(decreaseAgeAction())
  }

  const increaseXAge = (value: number) => {
    dispatch(increaseXAgeAction(value))
  }

  return (
    <div>
      <button onClick={decreaseAge}>Decrease age</button>
      <p>Hello! You are {state.age}.</p>
      <button onClick={increaseAge}>Increment age</button>

      <button onClick={() => increaseXAge(5)}>Increment Xage</button>
    </div>
  )
}

export default Couter
