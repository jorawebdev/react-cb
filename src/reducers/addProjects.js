const addProjects = (state = [], action) => {
  //console.log('in addProjects reducer', state, action);
  switch (action.type) {
    case 'PROJECT_LIST':
      return action.list
    default:
      return state
  }
}

export default addProjects
