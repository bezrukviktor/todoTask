import { ITokens } from '../../interfaces/actionTypes'
import {
  LOGIN,
  SIGN_UP,
  LOGOUT,
  REFRESH_TOKEN
} from './actionTypes'

//==========Sign Up===========

export const signUpRequest = (username: string, pass: string, history: any) => {
  return {
    type: SIGN_UP.REQUEST,
    payload: {
      username,
      pass,
      history
    }
  }
}
export const signUpSuccess = () => {
  return {
    type: SIGN_UP.SUCCESS,
  }
}
export const signUpFailed = (errorMessage: string) => {
  return {
    type: SIGN_UP.FAILED,
    payload: {
      errorMessage
    }
  }
}

//==========Login===========

export const loginRequest = (username: string, pass: string, history: any) => {
  return {
    type: LOGIN.REQUEST,
    payload: {
      username,
      pass,
      history
    }
  }
}
export const loginSuccess = (tokens: ITokens, username: string) => {
  return {
    type: LOGIN.SUCCESS,
    payload: {
      tokens,
      username
    }
  }
}
export const loginFailed = (errorMessage: string) => {
  return {
    type: LOGIN.FAILED,
    payload: {
      errorMessage
    }
  }
}

export const logOutAction = () => {
  return {
    type: LOGOUT
  }
}

//=============Refresh Token================


export const refreshTokenRequest = () => {
  return {
    type: REFRESH_TOKEN.REQUEST,
  }
}
export const refreshTokenSuccess = (tokens: ITokens) => {
  return {
    type: REFRESH_TOKEN.SUCCESS,
    payload: {
      tokens,
    }
  }
}
export const refreshTokenFailed = () => {
  return {
    type: REFRESH_TOKEN.FAILED,
  }
}