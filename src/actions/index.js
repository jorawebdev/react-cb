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

export const addProjects = (val) => ({
  type: 'PROJECT_LIST',
  id: nextTodoId++,
  list: val
})

export const loadProjects = (obj) => ({
  type: 'PROJECTS_LIST',
  id: nextTodoId++,
  projects: obj
})

export const selectProject = (obj) => ({
  type: 'SELECT_PROJECT',
  //id: obj.id,
  project: obj
})

export const selectProjPackage = (obj) => ({
  type: 'SELECT_PROJECT_PACKAGE',
  //id: obj.id,
  package: obj
})

export const setArtifactDate = (val) => ({
  type: 'ARTIFACT_DATE',
  //id: obj.id,
  str: val
})

export const featureError = (obj) => ({
  type: 'FEATURE_ERROR',
  error: obj
})
