const count = (state = {}, action) => {
  //console.log('in count reducer', state, action);
  switch (action.type) {
    case 'COUNT':
      return {
        id: action.id,
        val: action.val,
        completed: false
      }

    default:
      return state
  }
}

export default count
