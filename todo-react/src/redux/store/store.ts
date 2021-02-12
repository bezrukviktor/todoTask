import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/index'
import { watchAll } from '../sagas/todoSagas'
import { watchAuth } from '../sagas/authSagas'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(
  rootReducer,
  composeEnhancers
  ? composeWithDevTools(applyMiddleware(logger, sagaMiddleware)) 
  : compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAll)
sagaMiddleware.run(watchAuth)

export default store