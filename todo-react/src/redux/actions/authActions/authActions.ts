import {
  LOGIN,
  SIGN_UP
} from '../actionTypes'

//==========Sign Up===========

export const signUpRequest = (username: string, pass: string) => {
  return {
    type: SIGN_UP.REQUEST,
    payload: {
      username,
      pass
    }
  }
}
export const signUpSuccess = () => {
  return {
    type: SIGN_UP.SUCCESS,
  }
}
export const signUpFailed = () => {
  return {
    type: SIGN_UP.FAILED
  }
}

//==========Login===========

export const loginRequest = (username: string, pass: string) => {
  return {
    type: LOGIN.REQUEST,
    payload: {
      username,
      pass
    }
  }
}
export const loginSuccess = () => {
  return {
    type: LOGIN.SUCCESS,
  }
}
export const loginFailed = (err: any) => {
  return {
    type: LOGIN.FAILED,
    payload: {
      err
    }
  }
}

