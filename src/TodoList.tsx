import { ChangeEvent, memo, useCallback } from "react"
import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./AppWithRedux"
import EditableSpan from "./EditableSpan"
import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "./state/store"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasksReducer"
import Task from "./Task"

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
  removeTodoList: (todolistId: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = memo((props: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id])

  console.log('todo list rednder');

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }

  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }, [])


  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id)
  }, [dispatch])

  const changeTodoListTitle = useCallback((newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle)
  }, [dispatch])

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(title, props.id))
  }, [dispatch])



  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [])
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [])


  let tasksForTodolist = tasks

  if (props.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true)
  }

  if (props.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false)
  }

  return (
    <>
      <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} /> <button onClick={removeTodoList}>X</button> </h3>
      <AddItemForm addItem={addTask} />
      {
        tasksForTodolist.map((t) => <Task
          key={t.id}
          task={t}
          todolistId={props.id}
          changeTaskTitle={changeTaskTitle}
          chnageTaskStatus={changeStatus}
          removeTask={removeTodoList}
        />
        )
      }
       <div>
        <Button variant={props.filter === 'all' ? "contained" : 'text'} className={props.filter === 'all' ? "active-filter" : ''} onClick={onAllClickHandler}>All</Button>
        <Button color='primary' variant={props.filter === 'active' ? "contained" : 'text'} onClick={onActiveClickHandler}>Active</Button>
        <Button color='secondary' variant={props.filter === 'completed' ? "contained" : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </>
  )
})




