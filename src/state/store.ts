import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistReducer } from "./todolistreducer";

export const rootReducer = combineReducers({
    todolist : todolistReducer,
    tasks : tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store

