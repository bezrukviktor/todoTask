import Koa from 'koa'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { IUserData } from '../types/interfaces'
import cryptoRandomString from 'crypto-random-string'
import { getUserId } from '../_helpers/tokenHelper'
import { ObjectId } from "mongodb"

export const authVerify = async (ctx: Koa.Context, next: any) => {
  if (!ctx.header.authorization) ctx.throw(403, 'No token.')
  const token: string = ctx.header.authorization.split(' ')[1]
  try {
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      message: 'Something went wrong',
    }
  }
  await next()
}

export const refreshToken = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const refresh_token = ctx.request.body.refresh_token
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    const { _id, username } = user
    if (user.refresh_token === refresh_token) {
      const access_token = jwt.sign({ _id, username }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: 60*30,
      })
      const refresh_token = cryptoRandomString({ length: 20, type: 'base64' })
      await collection.findOneAndUpdate({
        _id
      }, {
        $set: {
          refresh_token
        }
      })
      ctx.status = 201;
      ctx.body = {
        tokens: {
          access_token,
          refresh_token
        }
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: 'Oops' }
    }
  }
}

export const signUp = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const body: IUserData = ctx.request.body
    const { username } = body
    const isUserExist: number = await collection.find({ username }).count()
    if (isUserExist === 0) {
      await collection.insertOne(body);
      ctx.status = 201;
      ctx.body = { message: 'User has been created' }
    } else {
      ctx.status = 401;
      ctx.body = { message: 'Username already exists' }
    }
  }
}

export const login = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const body: IUserData = ctx.request.body;
    const { username, pass } = body
    const isUserExist: number = await collection.find({ username }).count()
    if (isUserExist) {
      const user = await collection.findOne({ username })
      const inputEncriptPass: string = CryptoJS.AES.decrypt(pass, process.env.CRYPTO_SECRET_KEY!).toString(CryptoJS.enc.Utf8)
      const encriptPass: string = CryptoJS.AES.decrypt(user.pass, process.env.CRYPTO_SECRET_KEY!).toString(CryptoJS.enc.Utf8)
      const correctPass: boolean = inputEncriptPass === encriptPass;
      if (correctPass) {
        const { _id, username } = user
        const access_token = jwt.sign({ _id, username }, process.env.ACCESS_TOKEN_SECRET!, {
          expiresIn: 60*30,
        })
        const refresh_token = cryptoRandomString({ length: 20, type: 'base64' })
        await collection.findOneAndUpdate({
          _id
        }, {
          $set: {
            refresh_token
          }
        })
        ctx.status = 201;
        ctx.body = {
          username: user.username,
          tokens: {
            access_token,
            refresh_token
          }
        }
      } else {
        ctx.status = 401;
        ctx.body = { message: 'The username or password is incorrect' }
      }
    } else {
      ctx.status = 401;
      ctx.body = { message: "The username or password is incorrect" }
    }
  }
}