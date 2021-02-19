import { ofType } from "redux-observable"
import { concatMap, map, mergeMap, switchMap } from "rxjs/operators"
import { getTodos } from "../../api/todoAPI"
import { GET_LIST, REFRESH_TOKEN } from "../actions/actionTypes"
import { addItemSuccess, getListFailed, getListRequest } from "../actions/todoActions"
import { logOutAction, refreshTokenRequest, refreshTokenSuccess } from "../actions/authActions"
import { refreshTokens } from "../../api/authAPI"
import { clearStorage, saveTokens } from "../../_helpers/token"
import { concat, of } from "rxjs"

export const refreshTokenEpic = (action$: any, state$: any) => {
  return action$.pipe(
    ofType(REFRESH_TOKEN.REQUEST),
    switchMap(async () => {
      const { accessToken, refreshToken } = state$.value.authState
      try {
        const res = await refreshTokens({ refresh_token: refreshToken }, accessToken)
        saveTokens(JSON.stringify(res.tokens))
        return getListRequest()
      } catch (err) {
        clearStorage()
        return logOutAction()
      }
    })
  )
}

export const loadTodosEpic = (action$: any, state$: any) => action$.pipe(
  ofType(GET_LIST.REQUEST),
  mergeMap(async () => {
    const accessToken = state$.value.authState.accessToken
    try {
      const todoList = await getTodos(accessToken)
      return addItemSuccess(todoList.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return getListFailed()
      }
    }
  })
)