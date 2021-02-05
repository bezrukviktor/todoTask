import { BASE_URL, ENDPOINTS } from '../constants/apiConstants'
const postParam = (data: any) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }
}

export const signUp = async (data:any) => {
  const res = await fetch(BASE_URL + ENDPOINTS.signUp, postParam(data))
  return await res.json()
}

export const login = async (data:any) => {
  const res = await fetch(BASE_URL + ENDPOINTS.login, postParam(data))  
  return await res.json()
}
