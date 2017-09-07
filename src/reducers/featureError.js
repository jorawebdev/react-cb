const featureError = (state = [], action) => {
  //console.log('in featureError reducer', state, action);
  switch (action.type) {
    case 'FEATURE_ERROR':
      return {error: action.error}
    default:
      return state
  }
}

export default featureError
