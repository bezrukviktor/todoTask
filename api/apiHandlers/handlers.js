import {ObjectId} from 'mongodb'

export const HANDLERS = {

  getList: function (collection) {
    return async ctx => {
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  addItem: function (collection) {
    return async ctx => {
      const body = ctx.request.body;
      const newItem = {
        task: body.task,
        isActive: true,
      };
      await collection.insertOne(newItem);
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  removeItem: function (collection) {
    return async ctx => {
      const id = ObjectId(ctx.request.body.id);
      await collection.deleteOne({
        _id: id
      })
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  toggleAllItems: function (collection) {
    return async ctx => {
      const isActive = ctx.request.body.isActive;
      await collection.updateMany({}, {
        $set: {
          isActive
        }
      })
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  toggleItem: function (collection) {
    return async ctx => {
      const id = ObjectId(ctx.request.body.id);
      const currentItem = await collection.findOne({ _id: id });
      await collection.findOneAndUpdate({
        _id: id
      }, {
        $set: {
          isActive: !currentItem.isActive
        }
      })
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  editItem: function (collection) {
    return async ctx => {
      const id = ObjectId(ctx.request.body.id);
      const content = ctx.request.body.task;
      if (content.trim().length) {
        await collection.findOneAndUpdate({
          _id: id
        }, {
          $set: {
            task: content
          }
        })
      } else {
        await collection.deleteOne({
          _id: id 
        })
      }
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

  removeCompletedItems: function (collection) {
    return async ctx => {
      await collection.deleteMany({
        isActive: false
      })
      const todoList = await collection.find().toArray();
      ctx.body = { list: todoList }
    }
  },

}

