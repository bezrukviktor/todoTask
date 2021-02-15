import { BASE_URL, ENDPOINTS } from '../constants/apiConstants'
import { IAuth, IRefreshToken } from '../interfaces/stateTypes';

const postParam = (data: IAuth) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  }
}

export const signUp = async (data: IAuth) => {
  const res = await fetch(BASE_URL + ENDPOINTS.signUp, postParam(data))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw await res.json()
  }
}

export const login = async (data: IAuth) => {
  const res = await fetch(BASE_URL + ENDPOINTS.login, postParam(data))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw await res.json()
  }
}

export const refreshTokens = async (data: IRefreshToken, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.refresh_token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  })
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw await res.json()
  }
}
