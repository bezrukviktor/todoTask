import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { MongoClient } from 'mongodb'
import { ENDPOINTS } from './constants/endpoints'
import { HANDLERS } from './apiHandlers/handlers'
import { config } from './config'

const uri = config.DB_URL
const server = new Koa();
const router = new Router();

server.use(cors());
server.use(bodyParser());

(async () => {
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
  const db = client.db('todoDB');
  const todosCollection = db.collection('todos');

  router.get(ENDPOINTS.home, HANDLERS.getList(todosCollection))
  router.post(ENDPOINTS.addItem, HANDLERS.addItem(todosCollection))
  router.post(ENDPOINTS.editItem, HANDLERS.editItem(todosCollection))
  router.post(ENDPOINTS.removeItem, HANDLERS.removeItem(todosCollection))
  router.post(ENDPOINTS.toggleItem, HANDLERS.toggleItem(todosCollection))
  router.post(ENDPOINTS.toggleAllItems, HANDLERS.toggleAllItems(todosCollection))
  router.post(ENDPOINTS.removeCompletedItems, HANDLERS.removeCompletedItems(todosCollection))
})()

server.use(router.routes()).listen(3001)
