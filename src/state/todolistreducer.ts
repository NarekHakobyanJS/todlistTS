import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { RemoveTaskActionType } from "./tasksReducer";


export type RemoveTodoListActionType = {
    type : 'REMOVE-TODOLIST',
    id : string
}

export type AddTodolistActionType = {
    type : "ADD-TODOLIST",
    title : string
    todolistId : string
}
export type ChangeTodolistTitleActionType = {
    type : 'CHANGE-TODOLIST-TITLE',
    id : string,
    title : string
}
export type ChangeTodolistFilterActionType = {
    type : "CHANGE-TODOLIST-FILTER",
    id : string,
    filter : FilterValuesType
}

export type ActionsTypes = RemoveTodoListActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | RemoveTaskActionType

export const todolistReducer = (state : Array<TodoListType>, action : ActionsTypes) :Array<TodoListType> => {
    switch(action.type){
        case 'REMOVE-TODOLIST' : {
            return state.filter((t) => t.id !== action.id)
        }
        case "ADD-TODOLIST" : {
            return [...state, {
                id : action.todolistId,
                title : action.title,
                filter : 'all'
            }]
        }
        case  "CHANGE-TODOLIST-TITLE" : {
            let todolist = state.find((tl) => tl.id === action.id)
            
            if (todolist) {
              todolist.title = action.title
            }
            return [
                ...state
            ]
        }
        case  "CHANGE-TODOLIST-FILTER" : {
            let todolist = state.find((tl) => tl.id === action.id)
            
            if (todolist) {
              todolist.filter = action.filter
            }
            return [
                ...state
            ]
        }
        default :
            throw new Error('I dont understadne this action type')
             return state
    }
}

export const removeTodolistAC = (todolistId : string) : RemoveTodoListActionType => {
    return {type : "REMOVE-TODOLIST", id : todolistId}
}

export const addTodolistAC = (title : string) : AddTodolistActionType => {
    return {type : 'ADD-TODOLIST', title : title, todolistId : v1()}
}

export const changeTodolistTitleAC = (id : string, title : string) : ChangeTodolistTitleActionType => {
    return {type : 'CHANGE-TODOLIST-TITLE', id : id, title : title}
}

export const changeTodolistFilterAC = (id : string, filter : FilterValuesType) : ChangeTodolistFilterActionType => {
    return {type : 'CHANGE-TODOLIST-FILTER', id : id, filter : filter}
}