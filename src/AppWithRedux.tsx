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
import { useCallback } from 'react';
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
    console.log('AppWithRedux render');

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolist)

    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(filter, todoListId))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])


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

                            return <Grid item key={tl.id}>
                                <Paper style={{ padding: "10px" }}>
                                    <TodoList
                                        changeTodoListTitle={changeTodoListTitle}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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
