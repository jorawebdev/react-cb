let nextTodoId = 0
export const addItem = (text) => ({
  type: 'ADD_ITEM',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const countVal = (val) => ({
  type: 'COUNT',
  id: nextTodoId++,
  val
})
