import { LOGIN, SIGN_UP } from "../actions/actionTypes";
import { ofType } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import CryptoJS from 'crypto-js'
import { signUp, login } from '../../api/authAPI'
import { saveTokens } from "../../_helpers/token";
import { loginFailed, loginSuccess, signUpFailed, signUpSuccess } from "../actions/authActions";
import { IAction } from "../../interfaces/actionTypes";

export const sighUpEpic = (action$: any) => action$.pipe(
  ofType(SIGN_UP.REQUEST),
  mergeMap(async ({ payload }: IAction) => {
    const { history, pass, username } = payload
    payload = {
      username,
      pass: CryptoJS.AES.encrypt(pass, process.env.REACT_APP_CRYPTO_SECRET_KEY!).toString()
    }
    try {
      await signUp(payload)
      history.push('/login')
      return signUpSuccess()
    } catch (err) {
      return signUpFailed(err.message)
    }
  })
)

export const loginEpic = (action$: any) => action$.pipe(
  ofType(LOGIN.REQUEST),
  mergeMap(async ({ payload }: IAction): Promise<any> => {
    const { history, pass, username } = payload
    payload = {
      username,
      pass: CryptoJS.AES.encrypt(pass, process.env.REACT_APP_CRYPTO_SECRET_KEY!).toString()
    }
    try {
      const res = await login(payload)
      saveTokens(JSON.stringify(res.tokens))
      history.push('/')
      return loginSuccess(res.tokens, res.username)
    } catch (err) {
      return loginFailed(err.message)
    }
  })
)

