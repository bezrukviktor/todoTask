import { combineEpics } from "redux-observable";
import { loginEpic, sighUpEpic } from "./authEpics";
import { addItemEpic, editItemEpic, loadTodosEpic, refreshTokenEpic, removeItemEpic, removeItemsEpic, selectAllEpic, toggleItemEpic } from "./todoEpics";


export const rootEpic = combineEpics(
  loginEpic,
  sighUpEpic,
  loadTodosEpic,
  refreshTokenEpic,
  addItemEpic,
  selectAllEpic,
  toggleItemEpic,
  removeItemEpic,
  editItemEpic,
  removeItemsEpic
)