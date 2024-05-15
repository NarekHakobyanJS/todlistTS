import React, { useReducer, useState } from 'react';
import { TodoList } from './TodoList';
import { TaskType } from './TodoList';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from './state/todolistreducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasksReducer';

export type FilterValuesType = "all" | 'completed' | 'active';

export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
function AppWithReducers() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  
  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    { id: todolistId1, title: "what to learn", filter: 'all' },
    { id: todolistId2, title: "what to bye", filter: 'all' },
  ])
  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer , {
    [todolistId1]: [
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: true },
    ],
  })


  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId)
    dispatchToTasksReducer(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId)
    dispatchToTasksReducer(action)
  }

  function changeFilter(filter: FilterValuesType, todoListId: string) {
    const action = changeTodolistFilterAC(filter, todoListId )
    dispatchToTodolistsReducer(action)
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId)
    dispatchToTasksReducer(action)
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, title, todolistId)
    dispatchToTasksReducer(action)
  }

  let removeTodoList = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
  }


  function changeTodoListTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title)
    dispatchToTodolistsReducer(action)
  }

  function addTodoList(title: string) {
    const action =  addTodolistAC(title)
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
  }


  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant='h6'>
            News
          </Typography>
          <Button color='inherit'>login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding : '25px'}}>
          <AddItemForm addItem={addTodoList} />
          </Grid>
        <Grid container spacing={3}>
        {
          todolists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id]

            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true)
            }

            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false)
            }

            return <Grid item>
              <Paper style={{padding : "10px"}}>
               <TodoList
              changeTodoListTitle={changeTodoListTitle}
              changeTaskTitle={changeTaskTitle}
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodoList={removeTodoList}
            />
            </Paper>
            </Grid>
          })
        }
       
        </Grid>
      </Container>



    </div>
  );
}

export default AppWithReducers;
