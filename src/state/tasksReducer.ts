import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodoListActionType } from "./todolistreducer";
export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    tasksId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type : 'CHANGE-TASK-STATUS',
    taskId: string, 
    isDone : boolean, 
    todolistId: string

}

export type ChangeTaskTitleActionType = {
    type : 'CHANGE-TASK-TITLE',
    taskId: string, 
    title : string, 
    todolistId: string
}
export type ActionsTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const fileredTasks = tasks.filter(t => t.id !== action.tasksId)
            stateCopy[action.todolistId] = fileredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todolistId]
            const newTask = {id : v1(), title : action.title, isDone : false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS' : {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find((t) => t.id === action.taskId)
            console.log(task);
            if (task) {
              task.isDone = action.isDone
        
            }
            return stateCopy
            
        }

        case 'CHANGE-TASK-TITLE' : {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find((t) => t.id === action.taskId)
            console.log(task);
            if (task) {
              task.title = action.title
        
            }
            return stateCopy
            
        }
        case "ADD-TODOLIST" : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST" : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            //throw new Error('I dont understadne this action type')
            return state
    }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId, tasksId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone : boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId }
}

export const changeTaskTitleAC = (taskId: string, title : string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId }
}