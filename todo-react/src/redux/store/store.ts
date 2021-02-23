import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/index'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from '../epics/rootEpics'

const epicMiddleware = createEpicMiddleware()
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
  rootReducer,
  composeEnhancers
  ? composeWithDevTools(applyMiddleware(logger, epicMiddleware)) 
  : compose(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)


export default store