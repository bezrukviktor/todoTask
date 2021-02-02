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
  removeCompletedItems
} from './apiHandlers/handlers'
import { config } from './config'

const uri = config.DB_URL
const server = new Koa();
const router = new Router();

server.use(cors());
server.use(bodyParser());

(async () => {
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
  const db = client.db(process.env.MONGO_DB_NAME);
  const todosCollection = db.collection(process.env.MONGO_DB_COLLECTION);

  router.get(ENDPOINTS.home, getList(todosCollection))
  router.post(ENDPOINTS.addItem, addItem(todosCollection))
  router.post(ENDPOINTS.editItem, editItem(todosCollection))
  router.post(ENDPOINTS.removeItem, removeItem(todosCollection))
  router.post(ENDPOINTS.toggleItem, toggleItem(todosCollection))
  router.post(ENDPOINTS.toggleAllItems, toggleAllItems(todosCollection))
  router.post(ENDPOINTS.removeCompletedItems, removeCompletedItems(todosCollection))
})()

server.use(router.routes()).listen(process.env.DB_PORT)
