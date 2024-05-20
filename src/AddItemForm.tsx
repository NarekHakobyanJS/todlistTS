import { ControlPoint } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import React, { useState, ChangeEvent, KeyboardEvent, memo } from 'react'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

const AddItemForm = memo((props: AddItemFormPropsType) => {
  console.log('AddITemForm render');
  
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      if (title.trim()) {
        props.addItem(title)
        setTitle('')
      } else {
        setError('Filed is requred')
      }
    }
  }
  const addTask = () => {
    if (title.trim()) {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Filed is requred')
    }
  }

  return (
    <div>
      <TextField
        label={"Type Value"} variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={'primary'}>
        <ControlPoint />
      </IconButton>

    </div>
  )
})


export default AddItemForm