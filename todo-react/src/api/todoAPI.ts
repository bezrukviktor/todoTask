import { BASE_URL, ENDPOINTS } from '../constants/apiConstants'
import { IAction } from '../interfaces/actionTypes'
const postParam = (data: IAction) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
}

export const addItem = async (data: IAction) => {
  const res = await fetch(BASE_URL + ENDPOINTS.addItem, postParam(data))
  return await res.json()
}

export const removeItem = async (data: IAction) => {
  const res = await fetch(BASE_URL + ENDPOINTS.removeItem, postParam(data))
  return await res.json()
}

export const toggleAllItems = async (data: IAction) => {
  const res = await fetch(BASE_URL + ENDPOINTS.toggleAllItems, postParam(data))
  return await res.json()
}

export const toggleItem = async (data: IAction) => {
  const res = await fetch(BASE_URL + ENDPOINTS.toggleItem, postParam(data))
  return await res.json()
}

export const editItem = async (data: IAction) => {
  const res = await fetch(BASE_URL + ENDPOINTS.editItem, postParam(data))
  return await res.json()
}

export const removeCompletedItems = async () => {
  const res = await fetch(BASE_URL + ENDPOINTS.removeCompletedItems, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  return await res.json()
}

export const getTodos = async () => {
  const res = await fetch(BASE_URL + ENDPOINTS.home)
  return await res.json();
}