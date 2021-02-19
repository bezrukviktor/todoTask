export {}
// import { all, call, put, takeEvery } from "redux-saga/effects";
// import { IAction } from "../../interfaces/actionTypes";
// import { LOGIN, SIGN_UP } from "../actions/actionTypes";
// import { signUp, login } from '../../api/authAPI'
// import CryptoJS from 'crypto-js'
// import { loginFailed, loginSuccess, signUpFailed, signUpSuccess } from "../actions/authActions"
// import { saveTokens } from "../../_helpers/token";

// function* workerSighUp({ payload }: IAction) {
//   const { history, pass, username } = payload
//   payload = {
//     username,
//     pass: CryptoJS.AES.encrypt(pass, process.env.REACT_APP_CRYPTO_SECRET_KEY!).toString()
//   }
//   try {
//     yield call(signUp, payload)
//     yield put(signUpSuccess())
//     history.push('/login')
//   } catch (err) {
//     yield put(signUpFailed(err.message))
//   }
// }

// function* workerLogin({ payload }: IAction) {
//   const { history, pass, username } = payload
//   payload = {
//     username,
//     pass: CryptoJS.AES.encrypt(pass, process.env.REACT_APP_CRYPTO_SECRET_KEY!).toString()
//   }
//   try {
//     const res = yield call(login, payload)
//     saveTokens(JSON.stringify(res.tokens)) // set tokens to LS
//     yield put(loginSuccess(res.tokens, res.username)) // set tokens to store
//     history.push('/') // go to rootpage
//   } catch (err) {
//     yield put(loginFailed(err.message)) // show error message
//   }
// }

// export function* watchAuth() {
//   yield all([
//     takeEvery(SIGN_UP.REQUEST, workerSighUp),
//     takeEvery(LOGIN.REQUEST, workerLogin),
//   ])
// }