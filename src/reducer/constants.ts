export type IncreaseType_Age = { type: 'INCREASE_AGE' }
export type DecreaseType_Age = { type: 'DECREASE_AGE' }
export type IncreaseType_XAge = { type: 'INCREASE_XAGE', payload: number }
export type ActionType = IncreaseType_Age | DecreaseType_Age | IncreaseType_XAge