import { all, call, put, takeEvery } from "redux-saga/effects";
import { IAction } from "../../interfaces/actionTypes";
import { LOGIN, SIGN_UP } from "../actions/actionTypes";
import { signUp, login } from '../../api/authAPI'
import { loginFailed, loginSuccess, signUpFailed, signUpSuccess } from "../actions/authActions/authActions";

function* workerSighUp({ payload }: IAction) {
  try {
    yield call(signUp, payload)
    yield put(signUpSuccess())
  } catch (err) {
    yield put(signUpFailed())
  }
}

function* workerLogin({ payload }: IAction) {
  try {
    yield call(login, payload)
    yield put(loginSuccess())
  } catch (err) {
    yield put(loginFailed(err))
  }
}

export function* watchAuth() {
  yield all([
    takeEvery(SIGN_UP.REQUEST, workerSighUp),
    takeEvery(LOGIN.REQUEST, workerLogin),
  ])
}