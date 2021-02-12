import { takeEvery, put, call, all, select, race, take } from 'redux-saga/effects'
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
  removeItemsFailed,
  getListRequest
} from '../actions/todoActions'
import {
  GET_LIST,
  ADD_ITEM,
  SELECT_ALL,
  TOGGLE_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REMOVE_ITEMS,
  REFRESH_TOKEN
} from '../actions/actionTypes'
import {
  getTodos,
  addItem,
  toggleAllItems,
  toggleItem,
  removeItem,
  editItem,
  removeCompletedItems
} from '../../api/todoAPI'
import { IResponse } from '../../interfaces/stateTypes'
import { IAction } from '../../interfaces/actionTypes'
import { logOutAction, refreshTokenRequest, refreshTokenSuccess } from '../actions/authActions'
import { clearStorage, saveTokens } from '../../_helpers/token'
import { getAccessToken, getRefreshToken } from '../../selectors/todos'
import { refreshTokens } from '../../api/authAPI'


function* workerLoadData() {
  const accessToken = yield select(getAccessToken) // get access token from redux store
  try {
    const data: IResponse = yield call(getTodos, accessToken) // get data from backend
    yield put(getListSuccess(data.list)) // dispatch data to redux store
  } catch (err) {
    err.status === 401 ? // if access token is expired I get 401
    yield put(refreshTokenRequest()) : // refresh tokens | (there is worker for this req below)
    yield put(getListFailed()) // show error page
  }
}

function* workerRefreshToken() { //  <--------- refreshTokenRequest 
  const accessToken = yield select(getAccessToken) // get access token from redux store
  const refreshToken = {
    refresh_token: yield select(getRefreshToken)
  } // get refresh token from redux store
  try {
    const res = yield call(refreshTokens, refreshToken, accessToken) // get new pairs of tokens
    saveTokens(JSON.stringify(res.tokens)) // save new tokens to local store
    yield put(refreshTokenSuccess(res.tokens)) // save new tokens to redux store
    // how i can repeat previous request ? 
  } catch (err) {
    clearStorage()
    yield put(logOutAction())
  }
}

function* workerAddItem({ payload }: IAction) {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(addItem, payload, accessToken)
    yield put(addItemSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(addItemFailed())
    }
  }
}

function* workerSelectAll({ payload }: IAction) {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(toggleAllItems, payload, accessToken)
    yield put(selectAllSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(selectAllFailed())
    }
  }
}

function* workerToggleItem({ payload: id }: IAction) {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(toggleItem, id, accessToken)
    yield put(toggleItemSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(toggleItemFailed())
    }
  }
}

function* workerRemoveItem({ payload: id }: IAction) {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(removeItem, id, accessToken)
    yield put(removeItemSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(removeItemFailed())
    }
  }
}

function* workerEditItem({ payload }: IAction) {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(editItem, payload, accessToken)
    yield put(editItemSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(editItemFailed())
    }
  }
}

function* workerRemoveItems() {
  const accessToken = yield select(getAccessToken)
  try {
    const data: IResponse = yield call(removeCompletedItems, accessToken)
    yield put(removeItemsSuccess(data.list))
  } catch (err) {
    if (err.status === 401) {
      clearStorage()
      yield put(logOutAction())
    } else {
      yield put(removeItemsFailed())
    }
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
    takeEvery(REFRESH_TOKEN.REQUEST, workerRefreshToken),
  ])
}
