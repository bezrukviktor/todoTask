import { BASE_URL, ENDPOINTS } from '../constants/apiConstants'
import { IAction } from '../interfaces/actionTypes'

const postParams = (data: IAction, accessToken: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  }
}

export const addItem = async (data: IAction, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.addItem, postParams(data, accessToken))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const removeItem = async (data: IAction, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.removeItem, postParams(data, accessToken))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const toggleAllItems = async (data: IAction, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.toggleAllItems, postParams(data, accessToken))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const toggleItem = async (data: IAction, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.toggleItem, postParams(data, accessToken))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const editItem = async (data: IAction, accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.editItem, postParams(data, accessToken))
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const removeCompletedItems = async (accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.removeCompletedItems, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      { status: res.status }
    )
  }
}

export const getTodos = async (accessToken: string) => {
  const res = await fetch(BASE_URL + ENDPOINTS.home, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else {
    throw Object.assign(
      new Error('Something went wrong'),
      {
        status: res.status
      },
    )
  }
}
