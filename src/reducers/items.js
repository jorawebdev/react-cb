const item = (state = {}, action) => {
  //console.log('in todo reducer', state, action);
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const items = (state = [], action) => {
  //console.log('in items reducer', state, action);
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        item(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        item(t, action)
      )
    default:
      return state
  }
}

export default items
