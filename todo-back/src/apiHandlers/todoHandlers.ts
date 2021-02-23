import { ObjectId } from 'mongodb'
import Koa from 'koa'
import { ITodoItem, INewItem } from '../types/interfaces'
import { getUserId } from '../_helpers/tokenHelper'
import { getTodoList } from '../_helpers/todoListHelper'

export const getList = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray()
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const addItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const body = ctx.request.body;
    const newItem: INewItem = {
      task: body.task,
      isActive: true,
      userId: userId
    };
    await collection.insertOne(newItem);
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const removeItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const id = new ObjectId(ctx.request.body.id);
    await collection.deleteOne({
      _id: id
    })
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const toggleAllItems = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const isActive: boolean = ctx.request.body.isActive;
    await collection.updateMany({ userId }, {
      $set: {
        isActive
      }
    })
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const toggleItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    const id = new ObjectId(ctx.request.body.id);
    const currentItem: ITodoItem = await collection.findOne({ _id: id });
    await collection.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        isActive: !currentItem.isActive
      }
    })
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const editItem = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
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
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}

export const removeCompletedItems = (collection: any) => {
  return async (ctx: Koa.Context) => {
    const userId: string = getUserId(ctx.header.authorization.split(' ')[1])
    await collection.deleteMany({
      isActive: false
    })
    const todoList: Array<ITodoItem> = await collection.find({ userId }).toArray();
    ctx.body = { list: getTodoList(todoList) }
  }
}
