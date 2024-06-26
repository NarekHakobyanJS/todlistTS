import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../AppWithRedux";
import { RemoveTaskActionType } from "./tasksReducer";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}

export type ActionsTypes = RemoveTodoListActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | RemoveTaskActionType

export let todolistId1 = v1()
export let todolistId2 = v1()


const initialState :  Array<TodoListType> = [
    // { id: todolistId1, title: "what to learn", filter: 'all' },
    // { id: todolistId2, title: "what to bye", filter: 'all' },
]
export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((t) => t.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            },
            ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todolist = state.find((tl) => tl.id === action.id)

            if (todolist) {
                todolist.title = action.title
            }
            return [
                ...state
            ]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find((tl) => tl.id === action.id)

            if (todolist) {
                todolist.filter = action.filter
            }
            return [
                ...state
            ]
        }
        default:
            //throw new Error('I dont understadne this action type')
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

///  FilterValuesType
export const changeTodolistFilterAC = (filter: any, id: string,): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id, }
}