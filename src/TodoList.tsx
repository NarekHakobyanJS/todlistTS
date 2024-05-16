import { ChangeEvent } from "react"
import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./AppWithRedux"
import EditableSpan from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { AppRootState } from "./state/store"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasksReducer"

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  id: string,
  title: string,
  filter: FilterValuesType
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  // changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  removeTodoList: (todolistId: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id])


  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
   }

   function changeTaskTitle(taskId: string, title: string, todolistId: string) {
      dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }
  
  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle)
  }

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, props.id)) 
    // props.addTask(title, props.id)
  }

  let tasksForTodolist = tasks

            if (props.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true)
            }

            if (props.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false)
            }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} /> <button onClick={removeTodoList}>X</button> </h3>
      <AddItemForm addItem={(title) => {
        dispatch(addTaskAC(title, props.id))
      }} />
      <>
        {
          tasksForTodolist.map((t) => {
            const onRemoveHandler = () => {
              dispatch(removeTaskAC(t.id, props.id))
              //props.removeTask(t.id, props.id)
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC(t.id, t.isDone, props.id))
            }
            const onChangeTitleHandler = (newValue: string) => {
              dispatch(changeTaskTitleAC(t.id, newValue, props.id))
            }

            return (
              <div className={t.isDone ? 'is-done' : ''} key={t.id}>
                <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={onRemoveHandler} color='error'>
                  <DeleteIcon />
                </IconButton>
              </div>
            )
          })
        }

      </>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : 'text'} className={props.filter === 'all' ? "active-filter" : ''} onClick={onAllClickHandler}>All</Button>
        <Button color='primary' variant={props.filter === 'active' ? "contained" : 'text'} onClick={onActiveClickHandler}>Active</Button>
        <Button color='secondary' variant={props.filter === 'completed' ? "contained" : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
  )
}