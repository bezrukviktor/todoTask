import { IAction } from "../../interfaces/actionTypes"
import { LOGIN, SIGN_UP } from "../actions/actionTypes"

const initialState = {
  isSignUp: false,
  isUserExist: false,
  isLogin: false,
  loginErr: false,
  passErr: false
}

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SIGN_UP.SUCCESS:
      return {
        ...state,
        isSignUp: true
      }
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLogin: true
      }
    case SIGN_UP.FAILED:
      return {
        ...state,
        isUserExist: true
      }
    case LOGIN.FAILED:
      console.log(action);
      
      return {
        ...state,
        loginErr: true
      }
    default:
      return state
  }
}

export default authReducer