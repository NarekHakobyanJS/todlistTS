import AddItemForm from './AddItemForm';
import { TodoList } from './TodoList';
import { TaskType } from './TodoList';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolistreducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import './App.css';
export type FilterValuesType = "all" | 'completed' | 'active';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolist)
    
    const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId)) 
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
     }

     function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }

    function changeFilter(filter: FilterValuesType, todoListId: string) {
       dispatch(changeTodolistFilterAC(filter, todoListId)) 
    }


    let removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    function changeTodoListTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }

    function addTodoList(title: string) {
        dispatch(addTodolistAC(title)) 
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
                <Grid container style={{ padding: '25px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true)
                            }

                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{ padding: "10px" }}>
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

export default AppWithRedux;
