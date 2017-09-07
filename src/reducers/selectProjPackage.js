const selectProject = (state = [], action) => {
  //console.log('in selectProject reducer', state, action);
  switch (action.type) {
    case 'SELECT_PROJECT_PACKAGE':
      return {package: action.package}
    default:
      return state
  }
}

export default selectProject
