import Proptypes from 'prop-types'

export const TodoPropType = Proptypes.shape({
  id: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  status: Proptypes.bool.isRequired
}).isRequired

export const TodoPropType1 = Proptypes.shape({
  id: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  done: Proptypes.bool.isRequired
}).isRequired