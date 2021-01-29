import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import { watchAll } from '../sagas/sagas'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? composeWithDevTools(applyMiddleware(logger ,sagaMiddleware)) 
  : compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAll)

export default store