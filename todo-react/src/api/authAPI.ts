import { BASE_URL, ENDPOINTS } from '../constants/apiConstants'

const postParam = (data: any) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  }
}

export const signUp = async (data: any) => {
  const res = await fetch(BASE_URL + ENDPOINTS.signUp, postParam(data))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw await res.json()
  }
}

export const login = async (data: any) => {
  const res = await fetch(BASE_URL + ENDPOINTS.login, postParam(data))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw await res.json()
  }
}

export const refreshTokens = async (data: any, accessToken: string) => {
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
