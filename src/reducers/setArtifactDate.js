const setArtifactDate = (state = [], action) => {
  //console.log('in setArtifactDate reducer', state, action);
  switch (action.type) {
    case 'ARTIFACT_DATE':
      return action.str
    default:
      return state
  }
}

export default setArtifactDate
