import { LOGIN, SIGN_UP } from "../actions/actionTypes";
import { combineEpics, ofType } from 'redux-observable'
import { mergeMap,map, mapTo } from 'rxjs/operators'
import CryptoJS from 'crypto-js'
import { signUp, login } from '../../api/authAPI'
import { saveTokens } from "../../_helpers/token";
import { loginFailed, loginSuccess } from "../actions/authActions";
import { IAction } from "../../interfaces/actionTypes";
import { loadTodosEpic, refreshTokenEpic } from "./todoEpics";

export const loginEpic = (action$ :any) => action$.pipe( 
  ofType(LOGIN.REQUEST),
  mergeMap(async ({ payload }:IAction):Promise<any> => {
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

export const rootEpic = combineEpics(loginEpic, loadTodosEpic, refreshTokenEpic)