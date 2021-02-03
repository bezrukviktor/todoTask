import { ObjectId } from 'mongodb'
import Koa from 'koa'

interface ITodoItem {
  _id: string
  task: string
  isActive: boolean
}
interface INewItem {
  task: string,
  isActive: boolean
}

export const getList = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const addItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const body = ctx.request.body;
    const newItem: INewItem = {
      task: body.task,
      isActive: true,
    };
    await collection.insertOne(newItem);
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const removeItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const id = new ObjectId(ctx.request.body.id);
    await collection.deleteOne({
      _id: id
    })
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const toggleAllItems = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const isActive: boolean = ctx.request.body.isActive;
    await collection.updateMany({}, {
      $set: {
        isActive
      }
    })
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const toggleItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const id = new ObjectId(ctx.request.body.id);
    const currentItem: ITodoItem = await collection.findOne({ _id: id });
    await collection.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        isActive: !currentItem.isActive
      }
    })
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const editItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const id = new ObjectId(ctx.request.body.id);
    const content: string = ctx.request.body.task;
    if (content.trim().length) {
      await collection.findOneAndUpdate({
        _id: id
      }, {
        $set: {
          task: content.trim()
        }
      })
    } else {
      await collection.deleteOne({
        _id: id
      })
    }
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}

export const removeCompletedItems = (collection: any) => {
  return async (ctx: Koa.Context) => {
    await collection.deleteMany({
      isActive: false
    })
    const todoList: Array<ITodoItem> = await collection.find().toArray();
    ctx.body = { list: todoList }
  }
}
