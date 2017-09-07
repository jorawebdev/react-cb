const loadProjects = (state = [], action) => {
  //console.log('in loadProjects reducer', state, action);
  switch (action.type) {
    case 'PROJECTS_LIST':
      return action.projects
    default:
      return state
  }
}

export default loadProjects
