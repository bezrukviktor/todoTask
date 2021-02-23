import { ofType } from "redux-observable"
import { mergeMap, switchMap, catchError } from "rxjs/operators"
import { addItem, editItem, getTodos, removeCompletedItems, removeItem, toggleAllItems, toggleItem } from "../../api/todoAPI"
import { ADD_ITEM, EDIT_ITEM, GET_LIST, REFRESH_TOKEN, REMOVE_ITEM, REMOVE_ITEMS, SELECT_ALL, TOGGLE_ITEM } from "../actions/actionTypes"
import { addItemFailed, addItemSuccess, editItemFailed, editItemSuccess, getListFailed, getListRequest, getListSuccess, removeItemFailed, removeItemsFailed, removeItemsSuccess, removeItemSuccess, selectAllFailed, selectAllSuccess, toggleItemFailed, toggleItemSuccess } from "../actions/todoActions"
import { logOutAction, refreshTokenRequest, refreshTokenSuccess } from "../actions/authActions"
import { refreshTokens } from "../../api/authAPI"
import { clearStorage, saveTokens } from "../../_helpers/token"
import { from, of } from "rxjs"
import { IResponse } from "../../interfaces/stateTypes"

export const refreshTokenEpic = (action$: any, state$: any) => {
  return action$.pipe(
    ofType(REFRESH_TOKEN.REQUEST),
    switchMap(() => {
      const { accessToken, refreshToken } = state$.value.authState
      return from(refreshTokens({ refresh_token: refreshToken }, accessToken)).pipe(
        mergeMap((response): any => {
          saveTokens(JSON.stringify(response.tokens))
          return of(
            refreshTokenSuccess(response.tokens),
            getListRequest()
          )
        }),
        catchError(async err => {
          clearStorage()
          return of(logOutAction())
        })
      )
    })
  )
}

export const loadTodosEpic = (action$: any, state$: any) => action$.pipe(
  ofType(GET_LIST.REQUEST),
  mergeMap(async () => {
    const accessToken = state$.value.authState.accessToken
    try {
      const todoList = await getTodos(accessToken)
      return getListSuccess(todoList.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return getListFailed()
      }
    }
  })
)

export const addItemEpic = (action$: any, state$: any) => action$.pipe(
  ofType(ADD_ITEM.REQUEST),
  mergeMap(async ({ payload }) => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await addItem(payload, accessToken)
      return addItemSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return addItemFailed()
      }
    }
  })
)

export const selectAllEpic = (action$: any, state$: any) => action$.pipe(
  ofType(SELECT_ALL.REQUEST),
  mergeMap(async ({ payload }) => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await toggleAllItems(payload, accessToken)
      return selectAllSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return selectAllFailed()
      }
    }
  })
)

export const toggleItemEpic = (action$: any, state$: any) => action$.pipe(
  ofType(TOGGLE_ITEM.REQUEST),
  mergeMap(async ({ payload: id }) => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await toggleItem(id, accessToken)
      return toggleItemSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return toggleItemFailed()
      }
    }
  })
)

export const removeItemEpic = (action$: any, state$: any) => action$.pipe(
  ofType(REMOVE_ITEM.REQUEST),
  mergeMap(async ({ payload: id }) => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await removeItem(id, accessToken)
      return removeItemSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return removeItemFailed()
      }
    }
  })
)

export const editItemEpic = (action$: any, state$: any) => action$.pipe(
  ofType(EDIT_ITEM.REQUEST),
  mergeMap(async ({ payload }) => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await editItem(payload, accessToken)
      return editItemSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return editItemFailed()
      }
    }
  })
)

export const removeItemsEpic = (action$: any, state$: any) => action$.pipe(
  ofType(REMOVE_ITEMS.REQUEST),
  mergeMap(async () => {
    const accessToken = state$.value.authState.accessToken
    try {
      const data: IResponse = await removeCompletedItems(accessToken)
      return removeItemsSuccess(data.list)
    } catch (err) {
      if (err.status === 401) {
        return refreshTokenRequest()
      } else {
        return removeItemsFailed()
      }
    }
  })
)

