import { takeEvery, put, call, all } from 'redux-saga/effects'
import {
  getListSuccess,
  getListFailed,
  addItemSuccess,
  addItemFailed,
  selectAllSuccess,
  selectAllFailed,
  toggleItemSuccess,
  toggleItemFailed,
  removeItemSuccess,
  removeItemFailed,
  editItemSuccess,
  editItemFailed,
  removeItemsSuccess,
  removeItemsFailed
} from '../actions/index'
import {
  GET_LIST,
  ADD_ITEM,
  SELECT_ALL,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REMOVE_ITEMS
} from '../actions/actionTypes'
import {
  getTodos,
  addItem,
  toggleAllItems,
  toggleItem,
  removeItem,
  editItem,
  removeCompletedItems
} from '../service/todoService'

function* workerLoadData() {
  try {
    const data = yield call(getTodos)
    yield put(getListSuccess(data.list))
  } catch (err) {
    yield put(getListFailed())
  }
}

function* workerAddItem({ payload }:any) {
  try {
    const { task } = payload;
    const data = yield call(addItem, task)
    yield put(addItemSuccess(data.list))
  } catch (err) {
    console.error(err);
    yield put(addItemFailed())
  }
}

function* workerSelectAll({ payload }:any) {
  try {
    const { isActive } = payload;
    const data = yield call(toggleAllItems, isActive)
    yield put(selectAllSuccess(data.list))
  } catch (err) {
    yield put(selectAllFailed())
  }
}

function* workerToggleItem({ payload }:any) {
  try {
    const { id } = payload;
    const data = yield call(toggleItem, id)
    yield put(toggleItemSuccess(data.list))
  } catch (err) {
    yield put(toggleItemFailed())
  }
}

function* workerRemoveItem({ payload }:any) {
  try {
    const { id } = payload;
    const data = yield call(removeItem, id)
    yield put(removeItemSuccess(data.list))
  } catch (err) {
    yield put(removeItemFailed())
  }
}

function* workerEditItem({ payload }:any) {
  try {
    const data = yield call(editItem, payload)
    yield put(editItemSuccess(data.list))
  } catch (err) {
    yield put(editItemFailed())
  }
}

function* workerRemoveItems() {
  try {
    const data = yield call(removeCompletedItems)
    yield put(removeItemsSuccess(data.list))
  } catch (err) {
    yield put(removeItemsFailed())
  }
}

export function* watchAll() {
  yield all([
    takeEvery(GET_LIST.REQUEST, workerLoadData),
    takeEvery(ADD_ITEM.REQUEST, workerAddItem),
    takeEvery(SELECT_ALL.REQUEST, workerSelectAll),
    takeEvery(TOGGLE_ITEM.REQUEST, workerToggleItem),
    takeEvery(REMOVE_ITEM.REQUEST, workerRemoveItem),
    takeEvery(EDIT_ITEM.REQUEST, workerEditItem),
    takeEvery(REMOVE_ITEMS.REQUEST, workerRemoveItems),
  ])
}
