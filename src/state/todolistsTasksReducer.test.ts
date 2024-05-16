import { TasksStateType, TodoListType } from "../AppWithRedux"
import { tasksReducer } from "./tasksReducer"
import { addTodolistAC, todolistReducer } from "./todolistreducer"

test('ids should ne equals', () => {
    const startTasksState : TasksStateType = {}
    const startTodolistState : Array<TodoListType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId)
})