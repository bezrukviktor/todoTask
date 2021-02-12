import { IAction } from "../../interfaces/actionTypes"
import { LOGIN, LOGOUT, REFRESH_TOKEN, SIGN_UP } from "../actions/actionTypes"
import { accessToken, refreshToken, getUsername } from '../../_helpers/token'

const initialState = {
  accessToken,
  refreshToken,
  username: getUsername(),
  errorMessage: ''
}

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        accessToken: action.payload.tokens.access_token,
        refreshToken: action.payload.tokens.refresh_token,
        username: action.payload.username,
      }
    case REFRESH_TOKEN.SUCCESS:
      return {
        ...state,
        accessToken: action.payload.tokens.access_token,
        refreshToken: action.payload.tokens.refresh_token,
      }
    case SIGN_UP.FAILED:
    case LOGIN.FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case LOGOUT:
      return {
        ...state,
        accessToken: '',
        username: ''
      }
    default:
      return state
  }
}

export default authReducer