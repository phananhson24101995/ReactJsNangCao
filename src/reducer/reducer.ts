import { ActionType } from './constants'

export const initalState = { age: 28 }

export const init = (initState: typeof initalState) => ({ ...initState, age: initState.age + 5 })

const reducer = (state: typeof initalState, action: ActionType) => {
  const { type } = action
  switch (type) {
    case 'INCREASE_AGE':
      return { ...state, age: state.age + 1 }
    case 'DECREASE_AGE':
      return { ...state, age: state.age - 1 }
    case 'INCREASE_XAGE':
      return { ...state, age: state.age + action.payload }
    default:
      throw Error('Invalid action', type)
  }
}

export const loger = () => {
  console.log('loger')
  return (state: typeof initalState, action: ActionType) => {
    console.group(action.type)
    console.log('Previos State', state)
    const nextState = reducer(state, action)
    console.log('Next State', nextState)
    console.groupEnd()
    return nextState
  }
}

export default reducer