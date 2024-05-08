import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TaskType } from './TodoList';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = "all" | 'completed' | 'active';

export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
function App() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  
  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "what to learn", filter: 'all' },
    { id: todolistId2, title: "what to bye", filter: 'all' },
  ])
  let [tasksObj, setTasks] = useState<TasksStateType>({
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
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter((task) => task.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title, isDone: false }
    let tasks = tasksObj[todolistId]

    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todolist = todolists.find((tl) => tl.id === todoListId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    console.log(task);
    if (task) {
      task.isDone = isDone

    }
    setTasks({ ...tasksObj })

  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    console.log(task);
    if (task) {
      task.title = title

    }
    setTasks({ ...tasksObj })

  }
  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter((t) => t.id !== todolistId)
    setTodolists(filteredTodoList)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }


  function changeTodoListTitle(id: string, newValue: string) {
    let todolist = todolists.find((tl) => tl.id === id)
    if (todolist) {
      todolist.title = newValue
      setTodolists([...todolists])
    }
  }

  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
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

export default App;
