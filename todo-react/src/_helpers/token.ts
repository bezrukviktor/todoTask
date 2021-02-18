import jwt_decode from "jwt-decode";

interface IAccessToken {
  name: string
  exp: number
  id: string
  username: string
}

export const saveTokens = (tokens: string) => {
  localStorage.setItem('tokens', tokens)
}

const tokens = localStorage.getItem('tokens')
const tokensObj = JSON.parse(tokens!)
export const accessToken = tokensObj ? tokensObj.access_token : ''
export const refreshToken = tokensObj ? tokensObj.refresh_token : ''

export const getUsername = () => {
  if (accessToken) {
    const decoded: IAccessToken = jwt_decode(accessToken)
    return decoded.username
  }
  return ''
}

export const clearStorage = () => {
  localStorage.removeItem('tokens')
}