export const getTodoList = (todosArr:any) => {
  return todosArr.map((item:any) => {
    return {
      _id: item._id,
      task: item.task,
      isActive: item.isActive
    }
  })
}