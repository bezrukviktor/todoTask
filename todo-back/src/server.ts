import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { MongoClient } from 'mongodb'
import { ENDPOINTS } from './constants/endpoints'
import {
  getList,
  addItem,
  removeItem,
  toggleAllItems,
  toggleItem,
  editItem,
  removeCompletedItems,
} from './apiHandlers/todoHandlers'
import {
  login,
  authVerify,
  signUp,
  refreshToken,
} from './apiHandlers/authHandlers'
import { config } from './config'

const uri = config.DB_URL
const server = new Koa();
const router = new Router();

server.use(cors());
server.use(bodyParser());

(async () => {
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  const db = client.db(process.env.MONGO_DB_NAME)
  const todosCollection = db.collection(process.env.TODOS_COLLECTION!)
  const usersCollection = db.collection(process.env.USERS_COLLECTION!)

  router.get(ENDPOINTS.home, authVerify, getList(todosCollection))
  router.post(ENDPOINTS.addItem, authVerify, addItem(todosCollection))
  router.post(ENDPOINTS.editItem, authVerify, editItem(todosCollection))
  router.post(ENDPOINTS.removeItem, authVerify, removeItem(todosCollection))
  router.post(ENDPOINTS.toggleItem, authVerify, toggleItem(todosCollection))
  router.post(ENDPOINTS.toggleAllItems, authVerify, toggleAllItems(todosCollection))
  router.post(ENDPOINTS.removeCompletedItems, authVerify, removeCompletedItems(todosCollection))

  router.post(ENDPOINTS.signUp, signUp(usersCollection))
  router.post(ENDPOINTS.login, login(usersCollection))
  router.post(ENDPOINTS.refresh_token, refreshToken(usersCollection))
})()

server.use(router.routes()).listen(process.env.DB_PORT)
