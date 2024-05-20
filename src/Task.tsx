import React, { ChangeEvent, memo, useCallback } from 'react'
import { TaskType } from './TodoList'
import { Button, Checkbox, IconButton } from "@mui/material"
import EditableSpan from './EditableSpan'
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    chnageTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType,
    todolistId: string
}



const Task = memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback( () => {
        props.removeTask(props.task.id, props.todolistId)
        //dispatch(removeTaskAC(props.t.id, props.t.id))
    }, [])
    const onChangeStatusHandler =  useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.target.checked
        props.chnageTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
        //dispatch(changeTaskStatusAC(props.t.id, props.t.isDone, props.t.id))
    }, [])

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
        //dispatch(changeTaskTitleAC(props.t.id, newValue, props.id))
    }, [])

    return (
        <>
            <div className={props.task.isDone ? 'is-done' : ''} key={props.todolistId}>
                <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} />
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={onRemoveHandler} color='error'>
                    <DeleteIcon />
                </IconButton>
            </div>
        </>
    )
})

export default Task