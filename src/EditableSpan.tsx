import { TextField } from "@mui/material"
import { ChangeEvent, memo, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan');

    let [editeMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState('')
    const activeEditeMode = () => {
        setEditeMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditeMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    return (
        <>
            {
                editeMode
                    ?
                    <TextField onBlur={activeViewMode}
                        value={title}
                        onChange={onChangeHandler}
                        autoFocus
                    />
                    :
                    <span onDoubleClick={activeEditeMode}>{props.title}</span>
            }
        </>
    )
})

export default EditableSpan