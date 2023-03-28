import { IncreaseType_Age, DecreaseType_Age, IncreaseType_XAge } from './constants'

export const increaseAgeAction = (): IncreaseType_Age => ({ type: 'INCREASE_AGE' })
export const decreaseAgeAction = (): DecreaseType_Age => ({ type: 'DECREASE_AGE' })
export const increaseXAgeAction = (payload: number): IncreaseType_XAge => ({ type: 'INCREASE_XAGE', payload })