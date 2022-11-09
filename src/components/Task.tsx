import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from './EditableSpan'
import { Delete } from '@material-ui/icons'
import { TaskType } from './Todolist'
import { useSelector } from 'react-redux'

type TaskPropsType = {
    task: TaskType
    _id: string
    todolistId: string
    title: string
    isDone: boolean
    changeTaskStatus: (todolistId: string, _id: string, title: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, _id: string, newTitle: string, isDone: boolean) => void
    removeTask: (todolistId: string, _id: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
const state = useSelector(state => state);
console.log(state);

    const onClickHandler = useCallback(() =>
        props.removeTask(props.task.todolistId, props._id),
        [props.task.todolistId, props._id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.todolistId,  props._id, props.title, e.currentTarget.checked)
    }, [props.task.todolistId, props._id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.todolistId, props._id, newValue, props.isDone )
    }, [props.task.todolistId, props._id]);

    return <div key={props.task.todolistId} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
