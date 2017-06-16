import { combineReducers } from 'redux'
import items from './items'
import visibilityFilter from './visibilityFilter'
import count from './count'

const itemsApp = combineReducers({
  items,
  visibilityFilter,
  count
})

export default itemsApp;
