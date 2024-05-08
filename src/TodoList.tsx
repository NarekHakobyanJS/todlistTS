import { ChangeEvent } from "react"
import AddItemForm from "./AddItemForm"
import { FilterValuesType } from "./App"
import EditableSpan from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  filter: FilterValuesType
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  removeTodoList: (todolistId: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

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
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} /> <button onClick={removeTodoList}>X</button> </h3>
      <AddItemForm addItem={addTask} />
      <>
        {
          props.tasks.map((t) => {
            const onRemoveHandler = () => props.removeTask(t.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id)
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