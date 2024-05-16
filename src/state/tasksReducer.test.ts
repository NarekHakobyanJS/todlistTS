import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasksReducer";
import { TasksStateType } from "../AppWithRedux";
import { addTodolistAC, removeTodolistAC } from "./todolistreducer";

test('correct task sholud be deleted from correct array', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : "1", title : 'CSS', isDone : false},
            {id : "2", title : 'JS', isDone : true},
            {id : "3", title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : "1", title : 'bread', isDone : false},
            {id : "2", title : 'milk', isDone : true},
            {id : "3", title : 'tea', isDone : false},
        ],

    }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be addes to aorrect array', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : '1', title : 'CSS', isDone : false},
            {id : '2', title : 'JS', isDone : true},
            {id : '3', title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : '1', title : 'bread', isDone : false},
            {id : '2', title : 'milk', isDone : true},
            {id : '3', title : 'tea', isDone : false},
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)


})


test('status of specified task, should, be changed', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : '1', title : 'CSS', isDone : false},
            {id : '2', title : 'JS', isDone : true},
            {id : '3', title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : '1', title : 'bread', isDone : false},
            {id : '2', title : 'milk', isDone : true},
            {id : '3', title : 'tea', isDone : false},
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBeFalsy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()
})


test('title of specified task, should, be changed', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : '1', title : 'CSS', isDone : false},
            {id : '2', title : 'JS', isDone : true},
            {id : '3', title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : '1', title : 'bread', isDone : false},
            {id : '2', title : 'milk', isDone : true},
            {id : '3', title : 'tea', isDone : false},
        ]
    }

    const action = changeTaskTitleAC('2', 'Milkiway', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkiway')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new prop with Array sholud be added when new todolist is added', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : '1', title : 'CSS', isDone : false},
            {id : '2', title : 'JS', isDone : true},
            {id : '3', title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : '1', title : 'bread', isDone : false},
            {id : '2', title : 'milk', isDone : true},
            {id : '3', title : 'tea', isDone : false},
        ]
    }

    const action = addTodolistAC('new todoList');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistid1' && k != 'todolistId2')
    if(!newKey) {
        throw Error ('new key sholud be added')
    }

    expect(keys.length).toBe(3)
    // expect(endState[newKey]).toStrictEqual([])
})

test('prop with todolistId should be deleted', () => {
    const startState : TasksStateType = {
        'todolistId1' : [
            {id : '1', title : 'CSS', isDone : false},
            {id : '2', title : 'JS', isDone : true},
            {id : '3', title : 'React', isDone : false},
        ],
        'todolistId2' : [
            {id : '1', title : 'bread', isDone : false},
            {id : '2', title : 'milk', isDone : true},
            {id : '3', title : 'tea', isDone : false},
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
})

