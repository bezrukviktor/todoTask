import jwt_decode from "jwt-decode";
import { IAccessToken } from '../types/interfaces'

export const getUserId = (token: string): string => {
  const decoded: IAccessToken = jwt_decode(token)
  return decoded._id
}