import { setTodos } from '../actions'
import { takeEvery, put, call, all } from 'redux-saga/effects'
import { GET_LIST, ADD_ITEM, SELECT_ALL, TOGGLE_ITEM, REMOVE_ITEM, EDIT_ITEM, REMOVE_ITEMS } from '../actions/actionTypes'
import { getTodos, addItem, toggleAllItems, toggleItem, removeItem, editItem, removeCompletedItems } from '../service/todoService'

function* workerLoadData() {
  try {
    const data = yield call(getTodos)
    yield put(setTodos(data.list))
  } catch(err) {
    
    console.log('err');
  }
}

function* workerAddItem({ payload }) {
  const newItem = payload.task;
  const data = yield call(addItem, newItem)

  // SUCCESS

  yield put(setTodos(data.list))
}

function* workerSelectAll({ payload }) {
  const isActive = payload.isActive;
  const data = yield call(toggleAllItems, isActive)
  yield put(setTodos(data.list))
}

function* workerToggleItem({ payload }) {
  const id = payload.id;
  const data = yield call(toggleItem, id)
  yield put(setTodos(data.list))
}

function* workerRemoveItem({ payload }) {
  const id = payload.id;
  const data = yield call(removeItem, id)
  yield put(setTodos(data.list))
}

function* workerEditItem({ payload }) {
  const editableData = payload;
  const data = yield call(editItem, editableData)
  yield put(setTodos(data.list))
}

function* workerRemoveItems() {
  const data = yield call(removeCompletedItems)
  yield put(setTodos(data.list))
}

export function* watchAll() {
  yield all([
    takeEvery(GET_LIST.REQUEST, workerLoadData),
    takeEvery(ADD_ITEM, workerAddItem), //ADD_ITEM.REQUEST
    takeEvery(SELECT_ALL, workerSelectAll),
    takeEvery(TOGGLE_ITEM, workerToggleItem),
    takeEvery(REMOVE_ITEM, workerRemoveItem),
    takeEvery(EDIT_ITEM, workerEditItem),
    takeEvery(REMOVE_ITEMS, workerRemoveItems),
  ])
}
