const selectProject = (state = [], action) => {
  //console.log('in selectProject reducer', state, action);
  switch (action.type) {
    case 'SELECT_PROJECT':
      return action.project
    default:
      return state
  }
}

export default selectProject
