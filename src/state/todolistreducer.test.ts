import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolistreducer";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../AppWithRedux";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState : Array<TodoListType> = [
        {id : todolistId1, title : "What to learn", filter : 'all'},
        {id : todolistId2, title : "What to bye", filter : 'all'},
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist'

    const startState : Array<TodoListType> = [
        {id : todolistId1, title : "What to learn", filter : 'all'},
        {id : todolistId2, title : "What to bye", filter : 'all'},
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist'

    const startState : Array<TodoListType> = [
        {id : todolistId1, title : "What to learn", filter : 'all'},
        {id : todolistId2, title : "What to bye", filter : 'all'},
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter : FilterValuesType = 'all'
    const startState : Array<TodoListType> = [
        {id : todolistId1, title : "What to learn", filter : 'all'},
        {id : todolistId2, title : "What to bye", filter : 'all'},
    ]

    const action = changeTodolistFilterAC(todolistId2,  newFilter)

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})


