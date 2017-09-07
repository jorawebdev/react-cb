import { combineReducers } from 'redux'
//import items from './items'
//import visibilityFilter from './visibilityFilter'
//import count from './count'
import loadProjects from './loadProjects'
import selectProject from './selectProject'
import selectProjPackage from './selectProjPackage'
import setArtifactDate from './setArtifactDate'
//import featureError from './featureError'

const itemsApp = combineReducers({
  //items,
  //visibilityFilter,
  //count,
  //addProjects,
  loadProjects,
  selectProject,
  selectProjPackage,
  setArtifactDate
  //featureError
})

export default itemsApp;
